import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { projectWorkers } from "../data/projectWorkers";

export default function StageWorkers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>👷 Workers</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {projectWorkers.map((worker) => (
            <div
              key={worker.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-semibold">{worker.name}</h3>

                <p className="text-sm text-muted-foreground">
                  {worker.role}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="secondary">
                  {worker.hoursToday} h
                </Badge>

                <Badge>
                  {worker.currentStage}
                </Badge>

                <Badge
                  variant={
                    worker.status === "ACTIVE"
                      ? "default"
                      : "destructive"
                  }
                >
                  {worker.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}