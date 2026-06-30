import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  value: string;
  description?: string;
};

export function StatCard({
  title,
  value,
  description,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card className={cn("border-slate-200 bg-white", className)} {...props}>
      <CardContent className="p-6">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
        {description && (
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}