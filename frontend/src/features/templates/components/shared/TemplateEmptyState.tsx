import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";

import { AppButton } from "@/components/ui/AppButton";

type TemplateEmptyStateProps = {
  icon: LucideIcon;
  isCollectionEmpty: boolean;
  emptyTitle: string;
  noResultsTitle: string;
  emptyDescription: string;
  noResultsDescription: string;
  addLabel: string;
  onAdd: () => void;
};

export default function TemplateEmptyState({
  icon: Icon,
  isCollectionEmpty,
  emptyTitle,
  noResultsTitle,
  emptyDescription,
  noResultsDescription,
  addLabel,
  onAdd,
}: TemplateEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900">
        {isCollectionEmpty ? emptyTitle : noResultsTitle}
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        {isCollectionEmpty ? emptyDescription : noResultsDescription}
      </p>

      {isCollectionEmpty && (
        <AppButton className="mt-5" onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          {addLabel}
        </AppButton>
      )}
    </div>
  );
}
