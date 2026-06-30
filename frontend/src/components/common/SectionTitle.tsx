import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type SectionTitleProps = ComponentPropsWithoutRef<"div"> & {
  label?: string;
  title: string;
  description?: string;
};

export function SectionTitle({
  label,
  title,
  description,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)} {...props}>
      {label && (
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
          {label}
        </p>
      )}

      <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}