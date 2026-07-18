import {
  CheckCircle2,
  Circle,
  Clock3,
  PauseCircle,
  Wallet,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  AppButton,
  AppCard,
} from "@/components/ui";

import {
  projectStages,
  type ProjectStageStatus,
} from "@/features/projects/data/projectStages";

function getStageStatusLabel(
  status: ProjectStageStatus
) {
  switch (status) {
    case "NOT_STARTED":
      return "Not Started";

    case "IN_PROGRESS":
      return "In Progress";

    case "COMPLETED":
      return "Completed";

    case "ON_HOLD":
      return "On Hold";

    default:
      return status;
  }
}

function getStageStatusClasses(
  status: ProjectStageStatus
) {
  switch (status) {
    case "COMPLETED":
      return "text-green-700";

    case "IN_PROGRESS":
      return "text-blue-700";

    case "ON_HOLD":
      return "text-amber-700";

    case "NOT_STARTED":
    default:
      return "text-slate-500";
  }
}

function getStageStatusIcon(
  status: ProjectStageStatus
) {
  switch (status) {
    case "COMPLETED":
      return (
        <CheckCircle2 className="h-6 w-6 text-green-600" />
      );

    case "IN_PROGRESS":
      return (
        <Clock3 className="h-6 w-6 text-blue-700" />
      );

    case "ON_HOLD":
      return (
        <PauseCircle className="h-6 w-6 text-amber-600" />
      );

    case "NOT_STARTED":
    default:
      return (
        <Circle className="h-6 w-6 text-slate-400" />
      );
  }
}

export function ProjectStages() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {projectStages.map(stage => {
        const plannedBudget =
          stage.plannedBudget ?? 0;

        const difference =
          plannedBudget - stage.spent;

        return (
          <AppCard
            key={stage.id}
            className="p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className={[
                    "text-sm font-semibold",
                    getStageStatusClasses(
                      stage.status
                    ),
                  ].join(" ")}
                >
                  {getStageStatusLabel(
                    stage.status
                  )}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-950">
                  {stage.name}
                </h3>

                {stage.description && (
                  <p className="mt-2 text-sm text-slate-500">
                    {stage.description}
                  </p>
                )}
              </div>

              {getStageStatusIcon(stage.status)}
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">
                  Progress
                </span>

                <span className="font-semibold">
                  {stage.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-blue-700 transition-all"
                  style={{
                    width: `${Math.min(
                      Math.max(stage.progress, 0),
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3 rounded-xl border border-slate-200 p-4">
                <Wallet className="h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-sm text-slate-500">
                    Planned
                  </p>

                  <p className="font-semibold">
                    €
                    {plannedBudget.toLocaleString(
                      "en-IE"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-slate-200 p-4">
                <Wallet className="h-5 w-5 shrink-0 text-slate-400" />

                <div>
                  <p className="text-sm text-slate-500">
                    Spent
                  </p>

                  <p className="font-semibold">
                    €
                    {stage.spent.toLocaleString(
                      "en-IE"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Budget difference
              </p>

              <p
                className={
                  difference >= 0
                    ? "mt-1 font-bold text-green-600"
                    : "mt-1 font-bold text-red-600"
                }
              >
                {difference >= 0 ? "+" : "-"}€
                {Math.abs(
                  difference
                ).toLocaleString("en-IE")}
              </p>
            </div>

            <Link
              to={`/projects/${stage.projectId}/stages/${stage.id}`}
              className="block"
            >
              <AppButton
                type="button"
                variant="outline"
                className="mt-6 w-full"
              >
                Open Stage
              </AppButton>
            </Link>
          </AppCard>
        );
      })}
    </div>
  );
}