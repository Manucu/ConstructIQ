import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type TabItem = {
  label: string;
  value: string;
};

type AppTabsProps = ComponentPropsWithoutRef<"div"> & {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
};

export function AppTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
  ...props
}: AppTabsProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-2 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTabChange(tab.value)}
              className={cn(
                "rounded-2xl px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}