import { MapPin } from "lucide-react";
import { AppCard } from "@/components/ui";
import { AppButton } from "@/components/ui";
import { Link } from "react-router-dom";

type ProjectCardProps = {
  project: {
    id: string;
    name: string;
    client: string;
    address: string;
    status: string;
    progress: number;
    health: number;
    budget: number;
    spent: number;
  };
};

export function ProjectCard({ project }: ProjectCardProps) {
  const remaining = project.budget - project.spent;

  return (
    <AppCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-700">{project.status}</p>
          <h3 className="mt-2 text-xl font-bold text-slate-950">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-slate-600">{project.client}</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            {project.address}
          </div>
        </div>

        <div className="rounded-2xl bg-blue-50 px-4 py-3 text-center">
          <p className="text-xs text-slate-500">Health</p>
          <p className="text-2xl font-bold text-blue-700">{project.health}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-600">Progress</span>
          <span className="font-semibold">{project.progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-blue-700"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-slate-500">Budget</p>
          <p className="font-semibold">€{project.budget.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-500">Spent</p>
          <p className="font-semibold">€{project.spent.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-500">Remaining</p>
          <p className="font-semibold">€{remaining.toLocaleString()}</p>
        </div>
      </div>

      <Link to={`/projects/${project.id}`}>
        <AppButton className="mt-6 w-full">
             Open Project
        </AppButton>
      </Link>
    </AppCard>
  );
}