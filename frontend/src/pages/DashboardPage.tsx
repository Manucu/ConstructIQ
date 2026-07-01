import { Building2, Euro, FolderKanban, TrendingUp } from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AppStatCard } from "@/components/ui";

export function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-slate-950">
            Dashboard Overview
          </h2>

          <p className="mt-2 text-slate-600">
            Monitor your construction company in real time.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <AppStatCard
            title="Business Health"
            value="91"
            description="Excellent performance"
            icon={TrendingUp}
          />

          <AppStatCard
            title="Active Projects"
            value="12"
            description="3 finishing this month"
            icon={FolderKanban}
          />

          <AppStatCard
            title="Budget Used"
            value="€1.2M"
            description="72% of annual budget"
            icon={Euro}
          />

          <AppStatCard
            title="Clients"
            value="18"
            description="Active contracts"
            icon={Building2}
          />
        </section>
      </div>
    </DashboardLayout>
  );
}