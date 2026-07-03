import { Camera, CheckCircle2, Users, Wallet } from "lucide-react";

import { AppCard, AppButton } from "@/components/ui";
import { projectStages } from "@/features/projects/data/projectStages";
import { Link } from "react-router-dom";

export function ProjectStages() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {projectStages.map((stage) => {
        const difference = stage.plannedBudget - stage.spent;

        return (
          <AppCard key={stage.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-700">
                  {stage.status}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-950">
                  {stage.name}
                </h3>
              </div>

              <CheckCircle2 className="h-6 w-6 text-blue-700" />
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">Progress</span>
                <span className="font-semibold">{stage.progress}%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-blue-700"
                  style={{ width: `${stage.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="flex gap-3">
                <Wallet className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-slate-500">Planned</p>
                  <p className="font-semibold">
                    €{stage.plannedBudget.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Wallet className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-slate-500">Spent</p>
                  <p className="font-semibold">
                    €{stage.spent.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Users className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-slate-500">Workers</p>
                  <p className="font-semibold">{stage.workers}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Camera className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-slate-500">Photos</p>
                  <p className="font-semibold">{stage.photos}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Budget difference</p>
              <p
                className={
                  difference >= 0
                    ? "mt-1 font-bold text-green-600"
                    : "mt-1 font-bold text-red-600"
                }
              >
                {difference >= 0 ? "+" : "-"}€
                {Math.abs(difference).toLocaleString()}
              </p>
            </div>

            <Link to={`/projects/1/stages/${stage.id}`}>
                <AppButton variant="outline" className="mt-6 w-full">
                    Open Stage
                </AppButton>
            </Link>
          </AppCard>
        );
      })}
    </div>
  );
}