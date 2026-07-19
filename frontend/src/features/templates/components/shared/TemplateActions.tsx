import { Pencil, Trash2 } from "lucide-react";

type TemplateActionsProps = {
  entityLabel: string;
  usageCount: number;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TemplateActions({
  entityLabel,
  usageCount,
  onEdit,
  onDelete,
}: TemplateActionsProps) {
  const isInUse = usageCount > 0;

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        title={`Edit ${entityLabel}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4" />
      </button>

      <button
        type="button"
        title={isInUse ? "Template is currently in use" : `Delete ${entityLabel}`}
        className={[
          "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition",
          isInUse
            ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300"
            : "border-slate-200 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700",
        ].join(" ")}
        disabled={isInUse}
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
