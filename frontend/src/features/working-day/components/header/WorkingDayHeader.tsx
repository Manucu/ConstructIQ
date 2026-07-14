import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { useWorkingDayContext } from "../../context/useWorkingDayContext";

export default function WorkingDayHeader() {
  const { workingDay, approvalStatus, isLocked } =
    useWorkingDayContext();

  return (
    <Card>
      <CardContent className="flex flex-col justify-between gap-5 py-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Working Day • {workingDay.date}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {workingDay.stageName}
          </p>

          <p className="text-sm text-muted-foreground">
            Engineer: {workingDay.engineerName}
          </p>

          <p className="text-sm text-muted-foreground">
            Weather: {workingDay.weather} •{" "}
            {workingDay.temperature}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">
            {workingDay.status}
          </Badge>

          <Badge
            variant={
              approvalStatus === "APPROVED"
                ? "default"
                : "secondary"
            }
          >
            {approvalStatus
              .toLowerCase()
              .split("_")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() +
                  word.slice(1)
              )
              .join(" ")}
          </Badge>

          {isLocked && (
            <Badge variant="outline">
              Locked
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}