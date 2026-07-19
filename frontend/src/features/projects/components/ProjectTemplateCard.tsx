import { CalendarDays, Check, CircleDollarSign, Layers3, ListChecks, PackageSearch } from "lucide-react";
import type { ProjectTemplate } from "@/features/templates/data/projectTemplates";
import type { ProjectTemplateSummary } from "@/features/templates/services/ProjectTemplateEstimator";

type Props = {
  projectTemplate: ProjectTemplate;
  summary: ProjectTemplateSummary;
  selected: boolean;
  onSelect: () => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

function formatDuration(days?: number) {
  if (days === undefined) return "Not estimated";
  return days === 1 ? "1 day" : `${days} days`;
}

export function ProjectTemplateCard({ projectTemplate, summary, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={[
        "w-full rounded-2xl border p-5 text-left transition",
        "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2",
        selected ? "border-blue-600 bg-blue-50 shadow-sm" : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="truncate text-base font-bold text-slate-950">{projectTemplate.name}</h4>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{projectTemplate.category}</span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{projectTemplate.description ?? "No description provided."}</p>
        </div>
        <div className={["flex h-7 w-7 shrink-0 items-center justify-center rounded-full border", selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-transparent"].join(" ")}>
          <Check className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-2 text-sm text-slate-600"><Layers3 className="h-4 w-4 text-blue-700" /><span>{summary.stageCount} stages</span></div>
        <div className="flex items-center gap-2 text-sm text-slate-600"><ListChecks className="h-4 w-4 text-blue-700" /><span>{summary.activityCount} activities</span></div>
        <div className="flex items-center gap-2 text-sm text-slate-600"><PackageSearch className="h-4 w-4 text-blue-700" /><span>{summary.resourceCount} resources</span></div>
        <div className="flex items-center gap-2 text-sm text-slate-600"><CalendarDays className="h-4 w-4 text-blue-700" /><span>{formatDuration(projectTemplate.estimatedDurationDays)}</span></div>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 sm:col-span-2"><CircleDollarSign className="h-4 w-4 text-blue-700" /><span>{formatCurrency(summary.estimatedTotalCost)}</span></div>
      </div>
    </button>
  );
}
