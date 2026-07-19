import {
  CheckCircle2,
  Circle,
  ExternalLink,
  FilePlus2,
  LoaderCircle,
  Rocket,
} from "lucide-react";

import { AppButton } from "@/components/ui/AppButton";

import type {
  ProjectGenerationProgress,
} from "@/features/projects/hook/useProjectGeneration";

import type {
  ProjectGenerationResult,
} from "@/features/projects/services/projectGenerationService";

type ProjectGenerationStepProps = {
  projectName: string;
  progress: ProjectGenerationProgress;
  result: ProjectGenerationResult | null;
  onOpenProject: (projectId: string) => void;
  onGenerateAnother: () => void;
};

const generationTasks = [
  { threshold: 15, label: "Preparing project data" },
  { threshold: 35, label: "Creating project and stages" },
  { threshold: 60, label: "Creating activities" },
  { threshold: 82, label: "Adding resources and budgets" },
  { threshold: 100, label: "Finalizing project" },
];

export function ProjectGenerationStep({
  projectName,
  progress,
  result,
  onOpenProject,
  onGenerateAnother,
}: ProjectGenerationStepProps) {
  if (result) {
    const resourceCount =
      result.materials.length +
      result.labours.length +
      result.equipment.length +
      result.expenses.length;

    return (
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-9 w-9" />
        </div>

        <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Project created successfully
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-950">
          {result.project.name}
        </h3>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
          The project is ready with {result.stages.length} stages, {result.activities.length} activities and {resourceCount} resources.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <AppButton
            type="button"
            onClick={() => onOpenProject(result.project.id)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Project
          </AppButton>

          <AppButton
            type="button"
            variant="outline"
            onClick={onGenerateAnother}
          >
            <FilePlus2 className="mr-2 h-4 w-4" />
            Generate Another
          </AppButton>
        </div>
      </section>
    );
  }

  if (!progress.isRunning) {
    return (
      <section className="rounded-2xl border border-blue-200 bg-blue-50 px-6 py-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
          <Rocket className="h-8 w-8" />
        </div>

        <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-blue-700">
          Ready to generate
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-950">
          {projectName}
        </h3>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
          Press Generate Project to create the project, stages, activities, resources and planned budgets.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
          <LoaderCircle className="h-6 w-6 animate-spin" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Generating project
          </p>

          <h3 className="mt-1 truncate text-xl font-bold text-slate-950">
            {projectName}
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            {progress.message}
          </p>
        </div>

        <span className="text-lg font-bold text-slate-950">
          {progress.percent}%
        </span>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-700 transition-all duration-300"
          style={{ width: `${progress.percent}%` }}
        />
      </div>

      <div className="mt-6 space-y-3">
        {generationTasks.map(task => {
          const completed = progress.percent >= task.threshold;
          const active =
            !completed &&
            progress.percent >= Math.max(0, task.threshold - 25);

          return (
            <div
              key={task.label}
              className="flex items-center gap-3 text-sm"
            >
              {completed ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : active ? (
                <LoaderCircle className="h-5 w-5 animate-spin text-blue-700" />
              ) : (
                <Circle className="h-5 w-5 text-slate-300" />
              )}

              <span className={completed || active ? "font-medium text-slate-900" : "text-slate-500"}>
                {task.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
