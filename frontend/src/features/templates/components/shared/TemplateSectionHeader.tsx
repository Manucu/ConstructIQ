import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";

import { AppButton } from "@/components/ui/AppButton";

type TemplateSectionHeaderProps = {
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  description: string;
  addLabel: string;
  onAdd: () => void;
};

export default function TemplateSectionHeader({
  icon: Icon,
  iconClassName,
  title,
  description,
  addLabel,
  onAdd,
}: TemplateSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-center gap-3">
        <div
          className={[
            "flex h-11 w-11 items-center justify-center rounded-xl",
            iconClassName,
          ].join(" ")}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <AppButton onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        {addLabel}
      </AppButton>
    </div>
  );
}
