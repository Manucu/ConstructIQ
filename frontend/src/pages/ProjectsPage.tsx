import { Plus } from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AppButton } from "@/components/ui";
import { projects } from "@/features/projects/data/projects";
import { ProjectCard } from "@/features/projects/components/ProjectCard";

export function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">Projects</h2>
            <p className="mt-2 text-slate-600">
              Manage active construction projects, budgets and progress.
            </p>
          </div>

          <AppButton>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </AppButton>
        </section>

        <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      </div>
    </DashboardLayout>
  );
}