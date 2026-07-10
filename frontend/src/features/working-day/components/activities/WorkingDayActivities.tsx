import { Badge } from "@/components/ui/badge";

import { activityTemplates } from "@/features/company/data/activityTemplates";
import type { WorkingDay } from "../../types/workingDay";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import EntityToolbar from "@/components/common/EntityToolbar";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

type WorkingDayActivitiesProps = {
  workingDay: WorkingDay;
};

function getActivityName(activityTemplateId: string) {
  const activity = activityTemplates.find(
    (item) => item.id === activityTemplateId
  );

  return activity?.name ?? "Unknown Activity";
}

export default function WorkingDayActivities({
  workingDay,
}: WorkingDayActivitiesProps) {
  const toolbar = (
    <EntityToolbar
      searchLabel="Search Activity"
      addLabel="Add Activity"
      onSearch={() => {
        console.log("Search activity");
      }}
      onAdd={() => {
        console.log("Add activity");
      }}
    />
  );

  if (workingDay.activities.length === 0) {
    return (
      <SectionCard title="Activities" icon="📋" actions={toolbar}>
        <EmptyState
          icon="📋"
          title="No activities added"
          description="Add the first activity completed during this working day."
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Activities" icon="📋" actions={toolbar}>
      {workingDay.activities.map((activity) => (
        <EntityRow
          key={activity.id}
          title={getActivityName(activity.activityTemplateId)}
          subtitle={`${activity.workersAssigned} workers • ${activity.hoursWorked} h`}
          description={
            activity.notes ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {activity.notes}
              </p>
            ) : undefined
          }
          actions={
            <div className="flex items-center gap-2">
              {typeof activity.progressPercentage === "number" && (
                <Badge variant="outline">
                  {activity.progressPercentage}%
                </Badge>
              )}

              <StatusBadge status={activity.status} />
            </div>
          }
        />
      ))}
    </SectionCard>
  );
}