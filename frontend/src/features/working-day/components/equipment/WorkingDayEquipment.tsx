import { Badge } from "@/components/ui/badge";

import { equipment } from "@/features/company/data/equipment";

import EntityRow from "../shared/EntityRow";
import EntityToolbar from "../shared/EntityToolbar";
import SectionCard from "../shared/SectionCard";

import type { WorkingDay } from "../../types/workingDay";

type WorkingDayEquipmentProps = {
  workingDay: WorkingDay;
};

function getEquipment(equipmentId: string) {
  return equipment.find((item) => item.id === equipmentId);
}

export default function WorkingDayEquipment({
  workingDay,
}: WorkingDayEquipmentProps) {
  return (
    <SectionCard
      title="Equipment"
      icon="🚜"
      actions={
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
      }
    >
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