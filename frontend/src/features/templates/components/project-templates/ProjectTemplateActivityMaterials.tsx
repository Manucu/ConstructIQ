import {
  PackagePlus,
  Pencil,
  Trash2,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import SectionCard from "@/components/common/SectionCard";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import type {
  ProjectTemplateActivity,
} from "../../data/projectTemplateActivities";

import {
  useProjectTemplateActivityMaterials,
} from "../../hooks/useProjectTemplateActivityMaterials";

import ProjectTemplateActivityMaterialFormDialog from "./ProjectTemplateActivityMaterialFormDialog";

type ProjectTemplateActivityMaterialsProps = {
  projectTemplateActivity:
    ProjectTemplateActivity;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ProjectTemplateActivityMaterials({
  projectTemplateActivity,
}: ProjectTemplateActivityMaterialsProps) {
  const {
    activityMaterials,
    allMaterialTemplates,
    availableMaterialTemplates,

    isMaterialDialogOpen,
    editingMaterial,

    openAddMaterialDialog,
    openEditMaterialDialog,
    closeMaterialDialog,

    saveMaterial,
    deleteMaterial,

    getMaterialTemplateById,
  } = useProjectTemplateActivityMaterials({
    projectTemplateActivityId:
      projectTemplateActivity.id,
  });

  const materialTemplatesForDialog =
    editingMaterial
      ? allMaterialTemplates
      : availableMaterialTemplates;

  const totalEstimatedCost =
    activityMaterials.reduce(
      (total, material) =>
        total +
        material.estimatedQuantity *
          (material.estimatedUnitCost ?? 0),
      0
    );

  return (
    <>
      <SectionCard
        title="Suggested Materials"
        icon="🧱"
        actions={
          <AppButton
            type="button"
            onClick={openAddMaterialDialog}
          >
            <PackagePlus className="mr-2 h-4 w-4" />
            Add Material
          </AppButton>
        }
      >
        {activityMaterials.length === 0 ? (
          <EmptyState
            icon="🧱"
            title="No suggested materials"
            description="Add the materials expected to be required by this activity."
          />
        ) : (
          <div className="space-y-3">
            {activityMaterials.map(material => {
              const materialTemplate =
                getMaterialTemplateById(
                  material.materialTemplateId
                );

              const estimatedCost =
                material.estimatedQuantity *
                (material.estimatedUnitCost ?? 0);

              return (
                <EntityRow
                  key={material.id}
                  title={
                    materialTemplate?.name ??
                    "Unknown Material Template"
                  }
                  subtitle={
                    materialTemplate
                      ? `${materialTemplate.code} · ${materialTemplate.category}`
                      : "Missing material template"
                  }
                  description={
                    <div className="mt-2 space-y-2">
                      {material.notes && (
                        <p className="text-sm text-muted-foreground">
                          {material.notes}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          {material.estimatedQuantity}{" "}
                          {materialTemplate?.unit ?? ""}
                        </Badge>

                        <Badge variant="outline">
                          Unit cost:{" "}
                          {formatCurrency(
                            material.estimatedUnitCost ??
                              0
                          )}
                        </Badge>

                        <Badge variant="outline">
                          Estimated:{" "}
                          {formatCurrency(
                            estimatedCost
                          )}
                        </Badge>
                      </div>
                    </div>
                  }
                  actions={
                    <div className="flex items-center gap-2">
                      <AppButton
                        type="button"
                        size="icon"
                        variant="ghost"
                        title="Edit material"
                        aria-label="Edit material"
                        onClick={() =>
                          openEditMaterialDialog(
                            material
                          )
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </AppButton>

                      <AppButton
                        type="button"
                        size="icon"
                        variant="ghost"
                        title="Delete material"
                        aria-label="Delete material"
                        onClick={() => {
                          const confirmed =
                            window.confirm(
                              `Delete ${
                                materialTemplate?.name ??
                                "this material"
                              }?`
                            );

                          if (!confirmed) {
                            return;
                          }

                          deleteMaterial(material.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </AppButton>
                    </div>
                  }
                />
              );
            })}

            <div className="rounded-xl border bg-slate-50 p-4 text-right">
              <p className="text-sm text-slate-500">
                Total estimated material cost
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {formatCurrency(
                  totalEstimatedCost
                )}
              </p>
            </div>
          </div>
        )}
      </SectionCard>

      {isMaterialDialogOpen && (
        <ProjectTemplateActivityMaterialFormDialog
          key={
            editingMaterial?.id ??
            "new-project-template-activity-material"
          }
          open={isMaterialDialogOpen}
          editingMaterial={editingMaterial}
          materialTemplates={
            materialTemplatesForDialog
          }
          onClose={closeMaterialDialog}
          onSave={saveMaterial}
        />
      )}
    </>
  );
}