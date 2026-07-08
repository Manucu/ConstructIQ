import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { stageTasks } from "../data/stageTasks";

function getStatusVariant(status: string) {
  switch (status) {
    case "COMPLETED":
      return "default";

    case "IN_PROGRESS":
      return "secondary";

    case "PLANNED":
      return "outline";

    default:
      return "outline";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "COMPLETED":
      return "Completed";

    case "IN_PROGRESS":
      return "In Progress";

    case "PLANNED":
      return "Planned";

    default:
      return status;
  }
}

export default function StageDailyTasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📋 Daily Tasks</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {stageTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-semibold">{task.title}</h3>

                <p className="text-sm text-muted-foreground">
                  {task.workers} workers • {task.hours} hours
                </p>
              </div>

              <Badge variant={getStatusVariant(task.status)}>
                {getStatusLabel(task.status)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}