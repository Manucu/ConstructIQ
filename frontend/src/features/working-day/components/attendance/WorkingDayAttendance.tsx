import { Badge } from "@/components/ui/badge";

import EntityRow from "@/components/common/EntityRow";
import SectionCard from "@/components/common/SectionCard";

import { workers } from "@/features/company/data/workers";

import { useWorkingDayContext } from "../../context/useWorkingDayContext";

function getWorker(workerId: string) {
  return workers.find((worker) => worker.id === workerId);
}

export default function WorkingDayAttendance() {
  const { workerEntries } = useWorkingDayContext();

  return (
    <SectionCard title="Attendance" icon="👷">
      {workerEntries.map((entry) => {
        const worker = getWorker(entry.workerId);

        return (
          <EntityRow
            key={entry.id}
            title={
              worker
                ? `${worker.firstName} ${worker.lastName}`
                : "Unknown Worker"
            }
            subtitle={
              entry.present
                ? `${entry.startTime ?? "-"} - ${entry.endTime ?? "-"}`
                : "Absent"
            }
            actions={
              <div className="flex items-center gap-2">
                <Badge
                  variant={entry.present ? "default" : "secondary"}
                >
                  {entry.present ? "Present" : "Absent"}
                </Badge>

                <Badge variant="outline">
                  {entry.hoursWorked} h
                </Badge>

                {(entry.overtimeHours ?? 0) > 0 && (
                  <Badge variant="outline">
                    +{entry.overtimeHours} h overtime
                  </Badge>
                )}
              </div>
            }
          />
        );
      })}
    </SectionCard>
  );
}