import type { ComponentPropsWithoutRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashboardCardProps = ComponentPropsWithoutRef<"div">;

export function DashboardCard({
  className,
  children,
  ...props
}: DashboardCardProps) {
  return (
    <Card
      className={cn(
        "border-slate-200 bg-white shadow-sm",
        className
      )}
      {...props}
    >
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}