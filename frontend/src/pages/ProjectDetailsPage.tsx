import { useState } from "react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProjectHeader } from "@/features/projects/components/ProjectHeader";
import { ProjectOverview } from "@/features/projects/components/ProjectOverview";
import { ProjectTabs } from "@/features/projects/components/ProjectTabs";
import { projectDetails } from "@/features/projects/data/projectDetails";
import { ProjectStages } from "@/features/projects/components/ProjectStages";
import ProjectBudget from "@/features/projects/components/ProjectBudget";
import ProjectSiteDiary from "@/features/projects/components/ProjectSiteDiary";
import ProjectPhotos from "@/features/projects/components/ProjectPhotos";
import ProjectDocuments from "@/features/projects/components/ProjectDocuments";

export function ProjectDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ProjectHeader project={projectDetails} />

        <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "overview" && <ProjectOverview />}

        {activeTab === "stages" && <ProjectStages />}

        {activeTab === "budget" && <ProjectBudget />}

        {activeTab === "diary" && <ProjectSiteDiary />}

        {activeTab === "photos" && <ProjectPhotos />}

        {activeTab === "documents" && <ProjectDocuments />}
      </div>
    </DashboardLayout>
  );
}