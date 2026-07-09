import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { equipment } from "@/features/company/data/equipment";
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
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Search
          </Button>

          <Button size="sm">
            Add Equipment
          </Button>
        </div>
      }
    >
      {workingDay.equipment.map((entry) => {
        const equipmentItem = getEquipment(entry.equipmentId);

        return (
          <div
            key={entry.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h3 className="font-semibold">
                {equipmentItem?.name ?? "Unknown Equipment"}
              </h3>

              <p className="text-sm text-muted-foreground">
                Hours used: {entry.hoursUsed} 
              </p>

              {entry.notes && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {entry.notes}
                </p>
              )}
            </div>

            <Badge variant="outline">{entry.hoursUsed} h</Badge>
          </div>
        );
      })}
    </SectionCard>
  );
}