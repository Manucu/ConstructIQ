import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { workingDay } from "../data/workingDay";

import { workers } from "@/features/company/data/workers";
import { activityTemplates } from "@/features/templates/data/activityTemplates";
import { materials } from "@/features/company/data/materials";
import { equipment } from "@/features/company/data/equipment";

function getWorkerName(workerId: string) {
  const worker = workers.find((item) => item.id === workerId);

  if (!worker) {
    return "Unknown worker";
  }

  return `${worker.firstName} ${worker.lastName}`;
}

function getActivityName(activityTemplateId: string) {
  const activity = activityTemplates.find(
    (item) => item.id === activityTemplateId
  );

  return activity?.name ?? "Unknown activity";
}

function getMaterialName(materialId: string) {
  const material = materials.find((item) => item.id === materialId);

  return material?.name ?? "Unknown material";
}

function getMaterialUnit(materialId: string) {
  const material = materials.find((item) => item.id === materialId);

  return material?.unit ?? "";
}

function getEquipmentName(equipmentId: string) {
  const item = equipment.find((equipmentItem) => equipmentItem.id === equipmentId);

  return item?.name ?? "Unknown equipment";
}

export default function StageWorkingDay() {
  const totalHours = workingDay.workerEntries.reduce(
    (sum, entry) => sum + entry.hoursWorked,
    0
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>📅 Working Day</CardTitle>

          <Badge>{workingDay.status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Date</p>
            <p className="text-lg font-semibold">{workingDay.date}</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Stage</p>
            <p className="text-lg font-semibold">{workingDay.stage}</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Weather</p>
            <p className="text-lg font-semibold">{workingDay.weather}</p>
            <p className="text-sm text-muted-foreground">
              {workingDay.temperature}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Total Hours</p>
            <p className="text-lg font-semibold">{totalHours} h</p>
          </div>
        </div>

        <section>
          <h3 className="mb-3 font-semibold">👷 Workers</h3>

          <div className="space-y-3">
            {workingDay.workerEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{getWorkerName(entry.workerId)}</p>
                  <p className="text-sm text-muted-foreground">
                    {getActivityName(entry.activityTemplateId)}
                  </p>
                </div>

                <Badge variant="secondary">{entry.hoursWorked} h</Badge>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 font-semibold">📋 Activities</h3>

          <div className="space-y-3">
            {workingDay.activityEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">
                    {getActivityName(entry.activityTemplateId)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {entry.workersAssigned} workers • {entry.hoursWorked} h
                  </p>
                </div>

                <Badge>{entry.status}</Badge>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 font-semibold">📦 Materials</h3>

          <div className="space-y-3">
            {workingDay.materialEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <p className="font-medium">{getMaterialName(entry.materialId)}</p>

                <Badge variant="secondary">
                  {entry.quantity} {getMaterialUnit(entry.materialId)}
                </Badge>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 font-semibold">🚜 Equipment</h3>

          <div className="space-y-3">
            {workingDay.equipmentEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <p className="font-medium">
                  {getEquipmentName(entry.equipmentId)}
                </p>

                <Badge variant="secondary">{entry.hoursUsed} h</Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border p-4">
          <p className="mb-2 text-sm text-muted-foreground">Engineer Notes</p>
          <p>{workingDay.notes}</p>
        </section>
      </CardContent>
    </Card>
  );
}