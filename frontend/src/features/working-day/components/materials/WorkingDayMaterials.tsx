import { Pencil, Trash2 } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import EntitySelectDialog from "@/components/common/dialogs/EntitySelectDialog";
import EntityToolbar from "@/components/common/EntityToolbar";
import SectionCard from "@/components/common/SectionCard";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import type { CompanyMaterial } from "@/features/company/data/materials";

import { useWorkingDayContext } from "../../context/useWorkingDayContext";
import { useWorkingDayMaterials } from "../../hooks/useWorkingDayMaterials";

import MaterialQuantityDialog from "./MaterialQuantityDialog";

function getMaterial(
  materials: CompanyMaterial[],
  materialId: string
) {
  return materials.find(
    (material) => material.id === materialId
  );
}

export default function WorkingDayMaterials() {
  const {
    materials,
    materialEntries,
    selectedMaterial,
    editingEntry,

    isSearchOpen,
    isQuantityOpen,

    openSearchDialog,
    closeSearchDialog,
    closeQuantityDialog,

    handleSelectMaterial,
    saveMaterial,
    deleteMaterial,
    editMaterial,
  } = useWorkingDayMaterials();

  const { isLocked } = useWorkingDayContext();

  const toolbar = isLocked ? undefined : (
    <EntityToolbar
      searchLabel="Search Material"
      addLabel="Add Material"
      onSearch={openSearchDialog}
      onAdd={openSearchDialog}
    />
  );

  const availableMaterials = materials.filter(
    (material) =>
      material.status === "ACTIVE" &&
      !materialEntries.some(
        (entry) => entry.materialId === material.id
      )
  );

  return (
    <>
      <SectionCard
        title="Materials"
        icon="📦"
        actions={toolbar}
      >
        {materialEntries.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No materials added"
            description="Add the first material used during this working day."
          />
        ) : (
          materialEntries.map((entry) => {
            const material = getMaterial(
              materials,
              entry.materialId
            );

            return (
              <EntityRow
                key={entry.id}
                title={material?.name ?? "Unknown Material"}
                subtitle={`Quantity: ${entry.quantity} ${entry.unit}`}
                description={
                  entry.notes ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {entry.notes}
                    </p>
                  ) : undefined
                }
                actions={
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {entry.quantity} {entry.unit}
                    </Badge>

                    {!isLocked && (
                      <>
                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={`Edit ${
                            material?.name ?? "material"
                          }`}
                          onClick={() => {
                            editMaterial(entry);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={`Delete ${
                            material?.name ?? "material"
                          }`}
                          onClick={() => {
                            deleteMaterial(entry.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </AppButton>
                      </>
                    )}
                  </div>
                }
              />
            );
          })
        )}
      </SectionCard>

      <EntitySelectDialog<CompanyMaterial>
        open={isSearchOpen}
        title="Select Material"
        description="Search and select a material from the company catalog."
        items={availableMaterials}
        searchPlaceholder="Search materials..."
        emptyMessage="No active materials are available."
        getItemId={(material) => material.id}
        getItemLabel={(material) => material.name}
        getItemDescription={(material) =>
          `${material.code} • ${material.category} • ${material.unit}`
        }
        onClose={closeSearchDialog}
        onSelect={handleSelectMaterial}
      />

      {isQuantityOpen && (
        <MaterialQuantityDialog
          key={
            editingEntry?.id ??
            selectedMaterial?.id ??
            "new-material-entry"
          }
          open={isQuantityOpen}
          material={selectedMaterial}
          editingEntry={editingEntry}
          onClose={closeQuantityDialog}
          onSave={saveMaterial}
        />
      )}
    </>
  );
}