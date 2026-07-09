import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { workers } from "@/features/company/data/workers";
import type { WorkingDay } from "../../types/workingDay";

type WorkingDayAttendanceProps = {
  workingDay: WorkingDay;
};

export default function WorkingDayAttendance({
  workingDay,
}: WorkingDayAttendanceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>👷 Attendance</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {workingDay.attendance.map((entry) => {
          const worker = workers.find((w) => w.id === entry.workerId);

          return (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-semibold">
                  {worker
                    ? `${worker.firstName} ${worker.lastName}`
                    : "Unknown Worker"}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {entry.startTime} - {entry.endTime}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={entry.present ? "default" : "secondary"}
                >
                  {entry.present ? "Present" : "Absent"}
                </Badge>

                <Badge variant="outline">
                  {entry.hoursWorked} h
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}