import { Search } from "lucide-react";
import type { CompanyData } from "@/features/company/context/companyContextDefinition";
import type { ProjectTemplate } from "@/features/templates/data/projectTemplates";
import { ProjectTemplateEstimator } from "@/features/templates/services/ProjectTemplateEstimator";
import { ProjectTemplateCard } from "@/features/projects/components/ProjectTemplateCard";

type Props = {
  companyData: CompanyData;
  projectTemplates: ProjectTemplate[];
  searchValue: string;
  selectedProjectTemplateId: string | null;
  onSearchChange: (value: string) => void;
  onSelect: (projectTemplateId: string) => void;
};

export function ProjectTemplateSelectionStep({ companyData, projectTemplates, searchValue, selectedProjectTemplateId, onSearchChange, onSelect }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="project-template-search" className="text-sm font-semibold text-slate-800">Search templates</label>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="project-template-search"
            type="search"
            value={searchValue}
            placeholder="Search by name, category or description..."
            onChange={event => onSearchChange(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
      {projectTemplates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
          <h4 className="font-semibold text-slate-950">No active templates found</h4>
          <p className="mt-2 text-sm text-slate-600">{searchValue.trim() ? "No active project templates match your search." : "Create or activate a project template before generating a project."}</p>
        </div>
      ) : (
        <div className="grid max-h-[52vh] gap-4 overflow-y-auto pr-1">
          {projectTemplates.map(projectTemplate => (
            <ProjectTemplateCard
              key={projectTemplate.id}
              projectTemplate={projectTemplate}
              summary={ProjectTemplateEstimator.getProjectSummary(companyData, projectTemplate.id)}
              selected={selectedProjectTemplateId === projectTemplate.id}
              onSelect={() => onSelect(projectTemplate.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
