import { Badge } from "@/components/ui/badge";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import EntityToolbar from "@/components/common/EntityToolbar";
import SectionCard from "@/components/common/SectionCard";

import { workers } from "@/features/company/data/workers";
import { activityTemplates } from "@/features/company/data/activityTemplates";

import type { WorkingDay } from "../../types/workingDay";

type WorkingDayWorkersProps = {
  workingDay: WorkingDay;
};

function getWorker(workerId: string) {
  return workers.find((worker) => worker.id === workerId);
}

function getActivityName(activityTemplateId?: string) {
  if (!activityTemplateId) {
    return "No activity assigned";
  }

  return (
    activityTemplates.find(
      (activity) => activity.id === activityTemplateId
    )?.name ?? "Unknown activity"
  );
}

export default function WorkingDayWorkers({
  workingDay,
}: WorkingDayWorkersProps) {
  const toolbar = (
    <EntityToolbar
      searchLabel="Search Worker"
      addLabel="Add Worker"
      onSearch={() => {
        console.log("Search worker");
      }}
      onAdd={() => {
        console.log("Add worker");
      }}
    />
  );

  if (workingDay.attendance.length === 0) {
    return (
      <SectionCard title="Workers" icon="👷" actions={toolbar}>
        <EmptyState
          icon="👷"
          title="No workers assigned"
          description="Add workers from the company workforce to this working day."
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Workers" icon="👷" actions={toolbar}>
      {workingDay.attendance.map((entry) => {
        const worker = getWorker(entry.workerId);

        const workerName = worker
          ? `${worker.firstName} ${worker.lastName}`
          : "Unknown Worker";

        return (
          <EntityRow
            key={entry.id}
            title={workerName}
            subtitle={`${worker?.role ?? "Unknown role"} • ${getActivityName(
              entry.activityTemplateId
            )}`}
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
                  {entry.hoursWorked} h
                </Badge>

                <Badge variant={entry.present ? "default" : "secondary"}>
                  {entry.present ? "Present" : "Absent"}
                </Badge>
              </div>
            }
          />
        );
      })}
    </SectionCard>
  );
}