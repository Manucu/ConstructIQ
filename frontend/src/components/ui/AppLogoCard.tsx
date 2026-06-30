import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/Logo";
import { AppCard } from "@/components/ui/AppCard";

type AppLogoCardProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  description?: string;
};

export function AppLogoCard({
  title,
  description,
  className,
  ...props
}: AppLogoCardProps) {
  return (
    <AppCard className={cn("p-6", className)} {...props}>
      <Logo />

      <h3 className="mt-6 text-xl font-bold text-slate-950">{title}</h3>

      {description && (
        <p className="mt-3 leading-7 text-slate-600">{description}</p>
      )}
    </AppCard>
  );
}