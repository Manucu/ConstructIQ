import { Badge } from "@/components/ui/badge";

import { equipment } from "@/features/company/data/equipment";
import type { WorkingDay } from "../../types/workingDay";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import EntityToolbar from "@/components/common/EntityToolbar";
import SectionCard from "@/components/common/SectionCard";

type WorkingDayEquipmentProps = {
  workingDay: WorkingDay;
};

function getEquipment(equipmentId: string) {
  return equipment.find((item) => item.id === equipmentId);
}

export default function WorkingDayEquipment({
  workingDay,
}: WorkingDayEquipmentProps) {
  const toolbar = (
    <EntityToolbar
      searchLabel="Search Equipment"
      addLabel="Add Equipment"
      onSearch={() => {
        console.log("Search equipment");
      }}
      onAdd={() => {
        console.log("Add equipment");
      }}
    />
  );

  if (workingDay.equipment.length === 0) {
    return (
      <SectionCard title="Equipment" icon="🚜" actions={toolbar}>
        <EmptyState
          icon="🚜"
          title="No equipment added"
          description="Add the equipment used during this working day."
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Equipment" icon="🚜" actions={toolbar}>
      {workingDay.equipment.map((entry) => {
        const equipmentItem = getEquipment(entry.equipmentId);

        return (
          <EntityRow
            key={entry.id}
            title={equipmentItem?.name ?? "Unknown Equipment"}
            subtitle={`Hours used: ${entry.hoursUsed} h`}
            description={
              entry.notes ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  {entry.notes}
                </p>
              ) : undefined
            }
            actions={
              <Badge variant="outline">
                {entry.hoursUsed} h
              </Badge>
            }
          />
        );
      })}
    </SectionCard>
  );
}