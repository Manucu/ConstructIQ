import type { ReactNode } from "react";

type PageSectionProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function PageSection({
  title,
  description,
  actions,
  children,
}: PageSectionProps) {
  return (
    <section className="space-y-4">
      {(title || description || actions) && (
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-xl font-semibold">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          {actions}
        </div>
      )}

      {children}
    </section>
  );
}