import type { ReactNode } from "react";

type TemplateTableShellProps = {
  headers: string[];
  children: ReactNode;
};

export default function TemplateTableShell({
  headers,
  children,
}: TemplateTableShellProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={`${header}-${index}`}
                className={[
                  "px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500",
                  index === headers.length - 1 ? "text-right" : "text-left",
                ].join(" ")}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {children}
        </tbody>
      </table>
    </div>
  );
}
