import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { WorkingDay } from "../../types/workingDay";

type WorkingDayHeaderProps = {
  workingDay: WorkingDay;
};

export default function WorkingDayHeader({
  workingDay,
}: WorkingDayHeaderProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between py-6">
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
            Weather: {workingDay.weather} • {workingDay.temperature}
          </p>
        </div>

        <Badge>{workingDay.status}</Badge>
      </CardContent>
    </Card>
  );
}