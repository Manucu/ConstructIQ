import {
  Activity,
  Camera,
  HardHat,
  Wallet,
} from "lucide-react";

import { AppStatCard } from "@/components/ui";
import { projectDetails } from "@/features/projects/data/projectDetails";

export function ProjectOverview() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AppStatCard
          title="Total Budget"
          value={`€${projectDetails.budget.toLocaleString()}`}
          description="Approved budget"
          icon={Wallet}
        />

        <AppStatCard
          title="Workers Today"
          value={String(projectDetails.workersToday)}
          description="Currently on site"
          icon={HardHat}
        />

        <AppStatCard
          title="Photos Today"
          value={String(projectDetails.photosToday)}
          description="Uploaded today"
          icon={Camera}
        />

        <AppStatCard
          title="Progress"
          value={`${projectDetails.progress}%`}
          description="Overall completion"
          icon={Activity}
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">
            Budget Overview
          </h3>

          <div className="mt-6 h-4 rounded-full bg-slate-100">
            <div
              className="h-4 rounded-full bg-blue-700"
              style={{
                width: `${
                  (projectDetails.spent / projectDetails.budget) * 100
                }%`,
              }}
            />
          </div>

          <div className="mt-6 flex justify-between">
            <div>
              <p className="text-sm text-slate-500">Spent</p>
              <p className="text-xl font-bold">
                €{projectDetails.spent.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Remaining</p>
              <p className="text-xl font-bold text-green-600">
                €{projectDetails.remaining.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">
            Current Stage
          </h3>

          <p className="mt-5 text-3xl font-bold text-blue-700">
            {projectDetails.currentStage}
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            The project is progressing according to schedule and no major
            issues have been reported during the current stage.
          </p>
        </div>
      </div>
    </div>
  );
}