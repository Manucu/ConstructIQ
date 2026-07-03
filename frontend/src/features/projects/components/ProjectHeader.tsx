import { MapPin } from "lucide-react";
import { AppCard } from "@/components/ui";

type ProjectHeaderProps = {
  project: {
    name: string;
    client: string;
    address: string;
    status: string;
    health: number;
    progress: number;
  };
};

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <AppCard className="p-6">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-700">{project.status}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-950">
            {project.name}
          </h2>

          <p className="mt-2 text-slate-600">Client: {project.client}</p>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            {project.address}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-blue-50 p-5 text-center">
            <p className="text-sm text-slate-500">Project Health</p>
            <p className="mt-2 text-4xl font-bold text-blue-700">
              {project.health}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-500">Progress</p>
            <p className="mt-2 text-4xl font-bold text-slate-950">
              {project.progress}%
            </p>
          </div>
        </div>
      </div>
    </AppCard>
  );
}