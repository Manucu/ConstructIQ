import {
  CalendarDays,
  CircleDollarSign,
  ClipboardCheck,
  Construction,
  FileText,
  HardHat,
  Layers3,
  MapPin,
  Package,
  ReceiptText,
  UserRound,
  UsersRound,
  Wrench,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import type {
  ProjectTemplate,
} from "@/features/templates/data/projectTemplates";

import type {
  ProjectTemplateSummary,
} from "@/features/templates/services/ProjectTemplateEstimator";

import type {
  ProjectDetailsValues,
} from "@/features/projects/hook/useProjectGeneration";

type ProjectReviewStepProps = {
  projectTemplate: ProjectTemplate;
  summary: ProjectTemplateSummary;
  projectDetails: ProjectDetailsValues;
  expectedEndDate: string | null;
};

type SummaryCardProps = {
  icon: LucideIcon;
  label: string;
  count: number;
  cost: number;
};

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
  value?: string | null
) {
  if (!value) {
    return "Not specified";
  }

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

function formatStatus(
  value: string
) {
  return value
    .toLowerCase()
    .split("_")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

export function ProjectReviewStep({
  projectTemplate,
  summary,
  projectDetails,
  expectedEndDate,
}: ProjectReviewStepProps) {
  const estimatedCost =
    summary.estimatedTotalCost ||
    projectTemplate.estimatedBudget ||
    0;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <ClipboardCheck className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-bold text-slate-950">
              Ready for review
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Check the project information and template totals before continuing to generation.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-700" />

          <h3 className="font-bold text-slate-950">
            Project details
          </h3>
        </div>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <ReviewItem
            icon={Construction}
            label="Project"
            value={projectDetails.name}
          />

          <ReviewItem
            icon={UserRound}
            label="Client"
            value={
              projectDetails.clientName.trim() ||
              "Not specified"
            }
          />

          <ReviewItem
            icon={MapPin}
            label="Address"
            value={
              projectDetails.address.trim() ||
              "Not specified"
            }
          />

          <ReviewItem
            icon={HardHat}
            label="Initial status"
            value={formatStatus(
              projectDetails.status
            )}
          />

          <ReviewItem
            icon={CalendarDays}
            label="Start date"
            value={formatDate(
              projectDetails.startDate
            )}
          />

          <ReviewItem
            icon={CalendarDays}
            label="Expected end date"
            value={formatDate(
              expectedEndDate
            )}
          />
        </dl>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Selected template
            </p>

            <h3 className="mt-1 text-lg font-bold text-slate-950">
              {projectTemplate.name}
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              {projectTemplate.category}
            </p>
          </div>

          <div className="rounded-xl bg-slate-950 px-4 py-3 text-white">
            <p className="text-xs font-medium text-slate-300">
              Estimated total
            </p>

            <p className="mt-1 flex items-center text-xl font-bold">
              <CircleDollarSign className="mr-2 h-5 w-5" />

              {formatCurrency(
                estimatedCost
              )}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Metric
            icon={Layers3}
            label="Stages"
            value={summary.stageCount}
          />

          <Metric
            icon={ClipboardCheck}
            label="Activities"
            value={summary.activityCount}
          />

          <Metric
            icon={Wrench}
            label="Resources"
            value={summary.resourceCount}
          />
        </div>
      </section>

      <section>
        <h3 className="font-bold text-slate-950">
          Resource breakdown
        </h3>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <SummaryCard
            icon={Package}
            label="Materials"
            count={summary.materialCount}
            cost={
              summary.estimatedMaterialCost
            }
          />

          <SummaryCard
            icon={UsersRound}
            label="Labour"
            count={summary.labourCount}
            cost={
              summary.estimatedLabourCost
            }
          />

          <SummaryCard
            icon={Wrench}
            label="Equipment"
            count={summary.equipmentCount}
            cost={
              summary.estimatedEquipmentCost
            }
          />

          <SummaryCard
            icon={ReceiptText}
            label="Expenses"
            count={summary.expenseCount}
            cost={
              summary.estimatedExpenseCost
            }
          />
        </div>
      </section>
    </div>
  );
}

type ReviewItemProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function ReviewItem({
  icon: Icon,
  label,
  value,
}: ReviewItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />

      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </dt>

        <dd className="mt-1 break-words text-sm font-medium text-slate-900">
          {value}
        </dd>
      </div>
    </div>
  );
}

type MetricProps = {
  icon: LucideIcon;
  label: string;
  value: number;
};

function Metric({
  icon: Icon,
  label,
  value,
}: MetricProps) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <Icon className="h-5 w-5 text-blue-700" />

      <p className="mt-3 text-2xl font-bold text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-600">
        {label}
      </p>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  count,
  cost,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </div>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
          {count} items
        </span>
      </div>

      <h4 className="mt-4 font-semibold text-slate-950">
        {label}
      </h4>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {formatCurrency(cost)}
      </p>
    </div>
  );
}
