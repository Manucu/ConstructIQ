import { Badge } from "@/components/ui/badge";

import { materials } from "@/features/company/data/materials";
import type { WorkingDay } from "../../types/workingDay";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import EntityToolbar from "@/components/common/EntityToolbar";
import SectionCard from "@/components/common/SectionCard";

type WorkingDayMaterialsProps = {
  workingDay: WorkingDay;
};

function getMaterial(materialId: string) {
  return materials.find((material) => material.id === materialId);
}

export default function WorkingDayMaterials({
  workingDay,
}: WorkingDayMaterialsProps) {
  const toolbar = (
    <EntityToolbar
      searchLabel="Search Material"
      addLabel="Add Material"
      onSearch={() => {
        console.log("Search material");
      }}
      onAdd={() => {
        console.log("Add material");
      }}
    />
  );

  if (workingDay.materials.length === 0) {
    return (
      <SectionCard title="Materials" icon="📦" actions={toolbar}>
        <EmptyState
          icon="📦"
          title="No materials added"
          description="Add the first material used during this working day."
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Materials" icon="📦" actions={toolbar}>
      {workingDay.materials.map((entry) => {
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
              <Badge variant="outline">
                {entry.quantity} {entry.unit}
              </Badge>
            }
          />
        );
      })}
    </SectionCard>
  );
}