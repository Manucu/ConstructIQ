import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type ProgressCardProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  value: number;
  description?: string;
};

export function ProgressCard({
  title,
  value,
  description,
  className,
  ...props
}: ProgressCardProps) {
  return (
    <Card className={cn("border-slate-200 bg-white", className)} {...props}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-sm font-semibold text-slate-900">{value}%</p>
        </div>

        <div className="mt-4 h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-blue-700"
            style={{ width: `${value}%` }}
          />
        </div>

        {description && (
          <p className="mt-3 text-sm text-slate-500">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}