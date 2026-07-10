import { Button } from "@/components/ui/button";

import SectionCard from "@/components/common/SectionCard";
import type { WorkingDay } from "../../types/workingDay";

type WorkingDayNotesProps = {
  workingDay: WorkingDay;
};

export default function WorkingDayNotes({ workingDay }: WorkingDayNotesProps) {
  return (
    <SectionCard
      title="Engineer Notes"
      icon="📝"
      actions={
        <Button variant="outline" size="sm">
          Edit Notes
        </Button>
      }
    >
      <div className="rounded-lg border p-4">
        <p className="text-sm leading-6 text-muted-foreground">
          {workingDay.notes || "No notes added for this working day."}
        </p>
      </div>
    </SectionCard>
  );
}