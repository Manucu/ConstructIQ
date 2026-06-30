import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type FeatureCardProps = ComponentPropsWithoutRef<"div"> & {
  icon: ElementType;
  title: string;
  description: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl",
        className
      )}
      {...props}
    >
      <CardContent className="p-8">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="text-xl font-bold text-slate-950">{title}</h3>

        <p className="mt-4 leading-7 text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}