import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";
import { AppCard } from "@/components/ui/AppCard";

type AppStatCardProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  value: string;
  description?: string;
  icon?: ElementType;
};

export function AppStatCard({
  title,
  value,
  description,
  icon: Icon,
  className,
  ...props
}: AppStatCardProps) {
  return (
    <AppCard className={cn("p-6", className)} {...props}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>

          {description && (
            <p className="mt-2 text-sm text-slate-500">{description}</p>
          )}
        </div>

        {Icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </AppCard>
  );
}