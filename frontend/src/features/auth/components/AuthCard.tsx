import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type AuthCardProps = ComponentPropsWithoutRef<"div">;

export function AuthCard({ children, className, ...props }: AuthCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}