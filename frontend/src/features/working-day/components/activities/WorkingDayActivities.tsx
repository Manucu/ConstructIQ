import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { activityTemplates } from "@/features/company/data/activityTemplates";
import type { WorkingDay } from "../../types/workingDay";

type WorkingDayActivitiesProps = {
  workingDay: WorkingDay;
};

function getActivityName(activityTemplateId: string) {
  const activity = activityTemplates.find(
    (item) => item.id === activityTemplateId
  );

  return activity?.name ?? "Unknown activity";
}

function getStatusVariant(status: string) {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "IN_PROGRESS":
      return "secondary";
    case "PLANNED":
      return "outline";
    case "BLOCKED":
      return "destructive";
    default:
      return "outline";
  }
}

export default function WorkingDayActivities({
  workingDay,
}: WorkingDayActivitiesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📋 Activities</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {workingDay.activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h3 className="font-semibold">
                {getActivityName(activity.activityTemplateId)}
              </h3>

              <p className="text-sm text-muted-foreground">
                {activity.workersAssigned} workers • {activity.hoursWorked} h
              </p>

              {activity.notes && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {activity.notes}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {typeof activity.progressPercentage === "number" && (
                <Badge variant="outline">
                  {activity.progressPercentage}%
                </Badge>
              )}

              <Badge variant={getStatusVariant(activity.status)}>
                {activity.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}