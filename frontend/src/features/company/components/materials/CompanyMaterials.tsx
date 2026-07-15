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

import { useCompanyMaterials } from "../../hooks/useCompanyMaterials";

import MaterialFormDialog from "./MaterialFormDialog";

function formatEstimatedCost(
  value: number | undefined,
  unit: string
) {
  if (value === undefined) {
    return "No estimated cost";
  }

  return `€${value.toFixed(2)} / ${unit}`;
}

export default function CompanyMaterials() {
  const {
    filteredMaterials,
    searchValue,
    isMaterialDialogOpen,
    editingMaterial,

    setSearchValue,

    openAddMaterialDialog,
    openEditMaterialDialog,
    closeMaterialDialog,

    saveMaterial,
    toggleMaterialStatus,
    deleteMaterial,
  } = useCompanyMaterials();

  return (
    <>
      <SectionCard
        title="Materials"
        icon="📦"
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
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          label="Search materials"
          placeholder="Search by name, code, category, unit or status..."
        />

        {filteredMaterials.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No materials found"
            description={
              searchValue.trim()
                ? "No materials match the current search."
                : "Add the first material to the company catalog."
            }
            action={
              !searchValue.trim() ? (
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={openAddMaterialDialog}
                >
                  <PackagePlus className="mr-2 h-4 w-4" />
                  Add First Material
                </AppButton>
              ) : undefined
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredMaterials.map((material) => (
              <EntityRow
                key={material.id}
                title={material.name}
                subtitle={`${material.code} • ${material.category} • ${material.unit}`}
                description={
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {formatEstimatedCost(
                        material.estimatedUnitCost,
                        material.unit
                      )}
                    </Badge>

                    <Badge variant="secondary">
                      {material.fromTemplate
                        ? "Template"
                        : "Custom"}
                    </Badge>
                  </div>
                }
                actions={
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={material.status} />

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Edit ${material.name}`}
                      onClick={() => {
                        openEditMaterialDialog(material);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={
                        material.status === "ACTIVE"
                          ? `Deactivate ${material.name}`
                          : `Activate ${material.name}`
                      }
                      onClick={() => {
                        toggleMaterialStatus(material.id);
                      }}
                    >
                      {material.status === "ACTIVE" ? (
                        <PowerOff className="h-4 w-4" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Delete ${material.name}`}
                      onClick={() => {
                        deleteMaterial(material.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </AppButton>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </SectionCard>

      {isMaterialDialogOpen && (
        <MaterialFormDialog
          key={editingMaterial?.id ?? "new-material"}
          open={isMaterialDialogOpen}
          editingMaterial={editingMaterial}
          onClose={closeMaterialDialog}
          onSave={saveMaterial}
        />
      )}
    </>
  );
}