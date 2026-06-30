import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { DashboardCard } from "@/components/common/DashboardCard";

type MetricCardProps = ComponentPropsWithoutRef<"div"> & {
  label: string;
  value: string;
  description?: string;
};

export function MetricCard({
  label,
  value,
  description,
  className,
  ...props
}: MetricCardProps) {
  return (
    <DashboardCard className={cn(className)} {...props}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>

      {description && (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      )}
    </DashboardCard>
  );
}