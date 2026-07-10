import { Badge } from "@/components/ui/badge";

import { activityTemplates } from "@/features/company/data/activityTemplates";

import EntityRow from "../shared/EntityRow";
import EntityToolbar from "../shared/EntityToolbar";
import SectionCard from "../shared/SectionCard";
import StatusBadge from "../shared/StatusBadge";

import type { WorkingDay } from "../../types/workingDay";

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
  return (
    <SectionCard
      title="Activities"
      icon="📋"
      actions={
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
      }
    >
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