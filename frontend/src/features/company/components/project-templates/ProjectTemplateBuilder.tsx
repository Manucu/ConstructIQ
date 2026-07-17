import {
  CalendarDays,
  CircleDollarSign,
  FolderKanban,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import type { ProjectTemplate } from "../../data/projectTemplates";

import ProjectTemplateStages from "./ProjectTemplateStages";

type ProjectTemplateBuilderProps = {
  projectTemplate: ProjectTemplate;
};

function formatDuration(days?: number) {
  if (days === undefined) {
    return "Not estimated";
  }

  if (days === 1) {
    return "1 day";
  }

  return `${days} days`;
}

function formatBudget(value?: number) {
  if (value === undefined) {
    return "Not estimated";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProjectTemplateBuilder({
  projectTemplate,
}: ProjectTemplateBuilderProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-slate-50 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900">
                {projectTemplate.name}
              </h3>

              <Badge
                variant={
                  projectTemplate.status === "ACTIVE"
                    ? "default"
                    : "secondary"
                }
              >
                {projectTemplate.status === "ACTIVE"
                  ? "Active"
                  : "Inactive"}
              </Badge>
            </div>

            {projectTemplate.description && (
              <p className="max-w-3xl text-sm leading-6 text-slate-600">
                {projectTemplate.description}
              </p>
            )}
          </div>

          <Badge variant="outline">
            {projectTemplate.category}
          </Badge>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border bg-white p-3">
            <FolderKanban className="h-5 w-5 text-slate-500" />

            <div>
              <p className="text-xs text-slate-500">
                Category
              </p>

              <p className="text-sm font-medium text-slate-900">
                {projectTemplate.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border bg-white p-3">
            <CalendarDays className="h-5 w-5 text-slate-500" />

            <div>
              <p className="text-xs text-slate-500">
                Estimated duration
              </p>

              <p className="text-sm font-medium text-slate-900">
                {formatDuration(
                  projectTemplate.estimatedDurationDays
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border bg-white p-3">
            <CircleDollarSign className="h-5 w-5 text-slate-500" />

            <div>
              <p className="text-xs text-slate-500">
                Estimated budget
              </p>

              <p className="text-sm font-medium text-slate-900">
                {formatBudget(
                  projectTemplate.estimatedBudget
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProjectTemplateStages
        projectTemplate={projectTemplate}
      />
    </div>
  );
}