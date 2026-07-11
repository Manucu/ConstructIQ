import { Pencil, Trash2 } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import EntityToolbar from "@/components/common/EntityToolbar";
import EntitySelectDialog from "@/components/common/dialogs/EntitySelectDialog";
import SectionCard from "@/components/common/SectionCard";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import {
  materials,
  type CompanyMaterial,
} from "@/features/company/data/materials";

import { useWorkingDayMaterials } from "../../hooks/useWorkingDayMaterials";
import type { WorkingDay } from "../../types/workingDay";

import MaterialQuantityDialog from "./MaterialQuantityDialog";

type WorkingDayMaterialsProps = {
  workingDay: WorkingDay;
};

function getMaterial(materialId: string) {
  return materials.find((material) => material.id === materialId);
}

export default function WorkingDayMaterials({
  workingDay,
}: WorkingDayMaterialsProps) {
  const {
    materialEntries,
    selectedMaterial,
    isSearchOpen,
    isQuantityOpen,
    openSearchDialog,
    closeSearchDialog,
    closeQuantityDialog,
    handleSelectMaterial,
    saveMaterial,
    deleteMaterial,
    editMaterial,
  } = useWorkingDayMaterials({ workingDay });

  const toolbar = (
    <EntityToolbar
      searchLabel="Search Material"
      addLabel="Add Material"
      onSearch={openSearchDialog}
      onAdd={openSearchDialog}
    />
  );

  return (
    <>
      <SectionCard title="Materials" icon="📦" actions={toolbar}>
        {materialEntries.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No materials added"
            description="Add the first material used during this working day."
          />
        ) : (
          materialEntries.map((entry) => {
            const material = getMaterial(entry.materialId);

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

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label="Edit material"
                      onClick={() => editMaterial(entry)}
                    >
                      <Pencil className="h-4 w-4" />
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label="Delete material"
                      onClick={() => deleteMaterial(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </AppButton>
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
        items={materials.filter(
          (material) => material.status === "ACTIVE"
        )}
        searchPlaceholder="Search materials..."
        emptyMessage="No matching materials found."
        getItemId={(material) => material.id}
        getItemLabel={(material) => material.name}
        getItemDescription={(material) =>
          `${material.category} • ${material.unit}`
        }
        onClose={closeSearchDialog}
        onSelect={handleSelectMaterial}
      />

      <MaterialQuantityDialog
        open={isQuantityOpen}
        material={selectedMaterial}
        onClose={closeQuantityDialog}
        onSave={saveMaterial}
      />
    </>
  );
}