import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AppStatCard } from "@/components/ui";
import { ProjectHeader } from "@/features/projects/components/ProjectHeader";
import { projectDetails } from "@/features/projects/data/projectDetails";
import { Camera, Euro, HardHat, Wallet } from "lucide-react";
import { ProjectTabs } from "@/features/projects/components/ProjectTabs";
import { useState } from "react";
import { ProjectOverview } from "@/features/projects/components/ProjectOverview";

export function ProjectDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ProjectHeader project={projectDetails} />
        <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === "overview" && <ProjectOverview />}

            {activeTab === "stages" && (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                Stages module coming soon...
            </div>
            )}

            {activeTab === "budget" && (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                Budget module coming soon...
            </div>
            )}

            {activeTab === "diary" && (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                Site Diary module coming soon...
            </div>
            )}

            {activeTab === "photos" && (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                Photos module coming soon...
            </div>
            )}

            {activeTab === "documents" && (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                Documents module coming soon...
            </div>
        )}

       
      </div>
    </DashboardLayout>
  );
}