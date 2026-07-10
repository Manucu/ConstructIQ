import type { ReactNode } from "react";

type EntityRowProps = {
  title: string;
  subtitle?: string;
  description?: ReactNode;
  actions?: ReactNode;
};

export default function EntityRow({
  title,
  subtitle,
  description,
  actions,
}: EntityRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold">{title}</h3>

        {subtitle && (
          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}

        {description}
      </div>

      {actions && (
        <div className="flex shrink-0 items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}