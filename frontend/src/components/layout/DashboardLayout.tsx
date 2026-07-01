import type { ReactNode } from "react";

import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardTopbar } from "@/features/dashboard/components/DashboardTopbar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="lg:pl-72">
        <DashboardTopbar />

        <main className="px-6 py-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}