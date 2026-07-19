import {
  CalendarDays,
  CircleDollarSign,
  Info,
} from "lucide-react";

import {
  TemplateFormGrid,
  TemplateSelectField,
  TemplateTextField,
  type TemplateSelectOption,
} from "@/features/templates/components/shared/forms";

import type {
  ProjectStatus,
} from "@/features/projects/data/projects";

import type {
  ProjectTemplate,
} from "@/features/templates/data/projectTemplates";

import type {
  ProjectTemplateSummary,
} from "@/features/templates/services/ProjectTemplateEstimator";

import type {
  ProjectDetailsErrors,
  ProjectDetailsValues,
} from "@/features/projects/hook/useProjectGeneration";

type ProjectDetailsStepProps = {
  projectTemplate: ProjectTemplate;
  summary: ProjectTemplateSummary;
  values: ProjectDetailsValues;
  errors: ProjectDetailsErrors;
  expectedEndDate: string | null;
  onChange: (
    field: keyof ProjectDetailsValues,
    value: string
  ) => void;
};

const statusOptions:
  TemplateSelectOption<ProjectStatus>[] = [
    {
      value: "PLANNING",
      label: "Planning",
    },
    {
      value: "ACTIVE",
      label: "Active",
    },
    {
      value: "ON_HOLD",
      label: "On hold",
    },
  ];

function formatCurrency(
  value: number
) {
  return new Intl.NumberFormat(
    "en-IE",
    {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

function formatDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(
    new Date(`${value}T00:00:00`)
  );
}

export function ProjectDetailsStep({
  projectTemplate,
  summary,
  values,
  errors,
  expectedEndDate,
  onChange,
}: ProjectDetailsStepProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />

          <div>
            <h3 className="font-semibold text-slate-950">
              {projectTemplate.name}
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              The project will be generated with{" "}
              {summary.stageCount} stages,{" "}
              {summary.activityCount} activities and{" "}
              {summary.resourceCount} resources.
            </p>
          </div>
        </div>
      </section>

      <TemplateFormGrid>
        <TemplateTextField
          label="Project name"
          value={values.name}
          placeholder="Enter the project name"
          required
          autoFocus
          error={errors.name}
          onChange={value =>
            onChange("name", value)
          }
        />

        <TemplateTextField
          label="Client"
          value={values.clientName}
          placeholder="Enter the client name"
          onChange={value =>
            onChange("clientName", value)
          }
        />

        <TemplateTextField
          label="Project address"
          value={values.address}
          placeholder="Site address or location"
          onChange={value =>
            onChange("address", value)
          }
        />

        <TemplateSelectField
          label="Initial status"
          value={values.status}
          options={statusOptions}
          onChange={value =>
            onChange("status", value)
          }
        />

        <TemplateTextField
          label="Start date"
          type="date"
          value={values.startDate}
          error={errors.startDate}
          onChange={value =>
            onChange("startDate", value)
          }
        />

        <div>
          <p className="text-sm font-medium text-slate-700">
            Expected end date
          </p>

          <div className="mt-2 flex min-h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <CalendarDays className="mr-2 h-4 w-4 text-blue-700" />

            {expectedEndDate
              ? formatDate(expectedEndDate)
              : "Select a start date"}
          </div>
        </div>
      </TemplateFormGrid>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Estimated duration
          </p>

          <p className="mt-2 flex items-center text-lg font-bold text-slate-950">
            <CalendarDays className="mr-2 h-5 w-5 text-blue-700" />

            {projectTemplate.estimatedDurationDays ?? 0} days
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Estimated cost
          </p>

          <p className="mt-2 flex items-center text-lg font-bold text-slate-950">
            <CircleDollarSign className="mr-2 h-5 w-5 text-blue-700" />

            {formatCurrency(
              summary.estimatedTotalCost ||
              projectTemplate.estimatedBudget ||
              0
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
