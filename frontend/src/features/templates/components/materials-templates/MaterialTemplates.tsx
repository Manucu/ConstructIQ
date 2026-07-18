import {
  PackagePlus,
  Pencil,
  Power,
  PowerOff,
  Trash2,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import SearchInput from "@/components/common/SearchInput";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import type {
  MaterialTemplate,
} from "@/features/templates/data/materialTemplates";

import {
  useMaterialTemplates,
} from "@/features/templates/hooks/useMaterialTemplates";

import MaterialTemplateFormDialog from "./MaterialTemplateFormDialog";

function formatEstimatedUnitCost(
  value: number | undefined,
  unit: string
) {
  if (value === undefined) {
    return "Cost not estimated";
  }

  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value) + ` / ${unit}`;
}

export default function MaterialTemplates() {
  const {
    filteredMaterialTemplates,

    searchValue,
    setSearchValue,

    isMaterialTemplateDialogOpen,
    editingMaterialTemplate,

    openAddMaterialTemplateDialog,
    openEditMaterialTemplateDialog,
    closeMaterialTemplateDialog,

    isMaterialTemplateCodeAvailable,
    saveMaterialTemplate,
    toggleMaterialTemplateStatus,
    getMaterialTemplateUsageCount,
    deleteMaterialTemplate,
  } = useMaterialTemplates();

  function handleDeleteMaterialTemplate(
    materialTemplate: MaterialTemplate
  ) {
    const usageCount =
      getMaterialTemplateUsageCount(
        materialTemplate.id
      );

    if (usageCount > 0) {
      window.alert(
        [
          `The material template "${materialTemplate.name}" cannot be deleted.`,
          "",
          `It is used by ${usageCount} project template ${
            usageCount === 1
              ? "activity material"
              : "activity materials"
          }.`,
          "",
          "Deactivate it instead, or remove those references first.",
        ].join("\n")
      );

      return;
    }

    const confirmed = window.confirm(
      [
        `Delete the material template "${materialTemplate.name}"?`,
        "",
        "This action cannot be undone.",
      ].join("\n")
    );

    if (!confirmed) {
      return;
    }

    deleteMaterialTemplate(
      materialTemplate.id
    );
  }

  return (
    <>
      <SectionCard
        title="Material Templates"
        icon="🧱"
        actions={
          <AppButton
            type="button"
            onClick={
              openAddMaterialTemplateDialog
            }
          >
            <PackagePlus className="mr-2 h-4 w-4" />

            Add Material Template
          </AppButton>
        }
      >
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          label="Search material templates"
          placeholder="Search by name, code, category, unit or status..."
        />

        {filteredMaterialTemplates.length ===
        0 ? (
          <EmptyState
            icon="🧱"
            title="No material templates found"
            description={
              searchValue.trim()
                ? "No material templates match the current search."
                : "Create the first reusable material template."
            }
            action={
              !searchValue.trim() ? (
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={
                    openAddMaterialTemplateDialog
                  }
                >
                  <PackagePlus className="mr-2 h-4 w-4" />

                  Add First Material Template
                </AppButton>
              ) : undefined
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredMaterialTemplates.map(
              materialTemplate => {
                const usageCount =
                  getMaterialTemplateUsageCount(
                    materialTemplate.id
                  );

                return (
                  <EntityRow
                    key={materialTemplate.id}
                    title={materialTemplate.name}
                    subtitle={`${materialTemplate.code} · ${materialTemplate.category} · ${materialTemplate.unit}`}
                    description={
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline">
                          {formatEstimatedUnitCost(
                            materialTemplate
                              .defaultEstimatedUnitCost,
                            materialTemplate.unit
                          )}
                        </Badge>

                        <Badge variant="secondary">
                          {usageCount === 1
                            ? "Used once"
                            : `Used ${usageCount} times`}
                        </Badge>
                      </div>
                    }
                    actions={
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge
                          status={
                            materialTemplate.status
                          }
                        />

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          title="Edit material template"
                          aria-label={`Edit ${materialTemplate.name}`}
                          onClick={() =>
                            openEditMaterialTemplateDialog(
                              materialTemplate
                            )
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          title={
                            materialTemplate.status ===
                            "ACTIVE"
                              ? "Deactivate material template"
                              : "Activate material template"
                          }
                          aria-label={
                            materialTemplate.status ===
                            "ACTIVE"
                              ? `Deactivate ${materialTemplate.name}`
                              : `Activate ${materialTemplate.name}`
                          }
                          onClick={() =>
                            toggleMaterialTemplateStatus(
                              materialTemplate.id
                            )
                          }
                        >
                          {materialTemplate.status ===
                          "ACTIVE" ? (
                            <PowerOff className="h-4 w-4" />
                          ) : (
                            <Power className="h-4 w-4" />
                          )}
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          title="Delete material template"
                          aria-label={`Delete ${materialTemplate.name}`}
                          onClick={() =>
                            handleDeleteMaterialTemplate(
                              materialTemplate
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </AppButton>
                      </div>
                    }
                  />
                );
              }
            )}
          </div>
        )}
      </SectionCard>

      {isMaterialTemplateDialogOpen && (
        <MaterialTemplateFormDialog
          key={
            editingMaterialTemplate?.id ??
            "new-material-template"
          }
          open={
            isMaterialTemplateDialogOpen
          }
          editingMaterialTemplate={
            editingMaterialTemplate
          }
          onClose={
            closeMaterialTemplateDialog
          }
          onSave={saveMaterialTemplate}
          isCodeAvailable={
            isMaterialTemplateCodeAvailable
          }
        />
      )}
    </>
  );
}