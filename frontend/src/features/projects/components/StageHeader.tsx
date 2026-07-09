import { Badge } from "@/components/ui/badge";

type StageHeaderProps = {
  stage: {
    name: string;
    status: string;
    progress: number;
    plannedStartDate: string;
    plannedEndDate: string;
    actualStartDate: string;
    description: string;
  };
};

export function StageHeader({ stage }: StageHeaderProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold">{stage.name}</h1>
            <Badge>{stage.status}</Badge>
          </div>

          <p className="max-w-3xl text-muted-foreground">
            {stage.description}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">Progress</p>
          <p className="text-3xl font-bold">{stage.progress}%</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Planned Start</p>
          <p className="font-semibold">{stage.plannedStartDate}</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Planned End</p>
          <p className="font-semibold">{stage.plannedEndDate}</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Actual Start</p>
          <p className="font-semibold">{stage.actualStartDate}</p>
        </div>
      </div>
    </div>
  );
}