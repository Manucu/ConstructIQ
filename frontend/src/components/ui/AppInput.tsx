import type { InputHTMLAttributes, ElementType } from "react";

import { cn } from "@/lib/utils";

type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ElementType;
};

export function AppInput({
  label,
  icon: Icon,
  className,
  ...props
}: AppInputProps) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <div
        className={cn(
          "mt-2 flex items-center rounded-xl border border-slate-300 bg-white px-4 transition-colors focus-within:border-blue-700",
          className
        )}
      >
        {Icon && (
          <Icon className="h-5 w-5 text-slate-400" />
        )}

        <input
          className="w-full bg-transparent px-3 py-3 outline-none"
          {...props}
        />
      </div>
    </div>
  );
}