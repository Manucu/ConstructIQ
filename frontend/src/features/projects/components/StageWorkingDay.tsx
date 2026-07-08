import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { workingDay } from "../data/workingDay";

export default function StageWorkingDay() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>📅 Working Day</CardTitle>

          <Badge>{workingDay.status}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Date</p>

            <p className="text-lg font-semibold">
              {workingDay.date}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Stage</p>

            <p className="text-lg font-semibold">
              {workingDay.stage}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Weather</p>

            <p className="text-lg font-semibold">
              {workingDay.weather}
            </p>

            <p className="text-sm text-muted-foreground">
              {workingDay.temperature}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Workers</p>

            <p className="text-lg font-semibold">
              {workingDay.workersCount}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Hours Worked</p>

            <p className="text-lg font-semibold">
              {workingDay.totalHours} h
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Activities</p>

            <p className="text-lg font-semibold">
              {workingDay.activitiesCount}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Photos</p>

            <p className="text-lg font-semibold">
              {workingDay.photosCount}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Expenses</p>

            <p className="text-lg font-semibold">
              € {workingDay.expenses}
            </p>
          </div>

        </div>

        <div className="mt-6 rounded-lg border p-4">
          <p className="mb-2 text-sm text-muted-foreground">
            Engineer Notes
          </p>

          <p>{workingDay.notes}</p>
        </div>
      </CardContent>
    </Card>
  );
}