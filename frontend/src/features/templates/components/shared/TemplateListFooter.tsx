type TemplateListFooterProps = {
  visibleCount: number;
  totalCount: number;
  activeCount: number;
  entityLabel: string;
};

export default function TemplateListFooter({
  visibleCount,
  totalCount,
  activeCount,
  entityLabel,
}: TemplateListFooterProps) {
  if (visibleCount === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 border-t border-slate-200 px-6 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <span>
        Showing {visibleCount} of {totalCount} {entityLabel}
      </span>

      <span>{activeCount} active</span>
    </div>
  );
}
