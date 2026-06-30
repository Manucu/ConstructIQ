import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type AppCardProps = ComponentPropsWithoutRef<typeof Card>;

export function AppCard({
  className,
  children,
  ...props
}: AppCardProps) {
  return (
    <Card
      className={cn(
        "rounded-3xl border-slate-200 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}