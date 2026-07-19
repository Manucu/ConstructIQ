import type {
  ReactNode,
} from "react";

type TemplateFormGridProps = {
  children: ReactNode;
  columns?: 1 | 2;
};

export default function TemplateFormGrid({
  children,
  columns = 2,
}: TemplateFormGridProps) {
  return (
    <div
      className={
        columns === 2
          ? "grid gap-4 md:grid-cols-2"
          : "grid gap-4"
      }
    >
      {children}
    </div>
  );
}
