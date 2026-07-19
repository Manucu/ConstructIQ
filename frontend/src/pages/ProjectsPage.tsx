import {
  FileStack,
  Plus,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  DashboardLayout,
} from "@/components/layout/DashboardLayout";

import {
  AppButton,
} from "@/components/ui";

import {
  useCompanyContext,
} from "@/features/company/context/useCompanyContext";

import {
  GenerateProjectDialog,
} from "@/features/projects/components/GenerateProjectDialog";

import {
  ProjectCard,
} from "@/features/projects/components/ProjectCard";

import {
  useProjectGeneration,
} from "@/features/projects/hook/useProjectGeneration";

export function ProjectsPage() {
  const navigate = useNavigate();

  const {
    companyData,
  } = useCompanyContext();

  const {
    filteredProjectTemplates,

    templateSearchValue,
    setTemplateSearchValue,

    selectedProjectTemplateId,
    selectedProjectTemplate,
    selectedProjectTemplateSummary,
    selectProjectTemplate,

    projectDetails,
    projectDetailsErrors,
    expectedEndDate,
    updateProjectDetails,

    isDialogOpen,
    currentStep,
    isGenerating,
    generationError,
    generationProgress,
    lastGenerationResult,
    generateProject,
    startAnotherProject,
    canContinue,

    openDialog,
    closeDialog,
    goToNextStep,
    goToPreviousStep,
  } = useProjectGeneration();

  const handleOpenProject = (
    projectId: string
  ) => {
    closeDialog();
    navigate(`/projects/${projectId}`);
  };

  const handleDialogAction = async () => {
    if (currentStep < 4) {
      goToNextStep();
      return;
    }

    if (lastGenerationResult) {
      closeDialog();
      return;
    }

    await generateProject();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">
              Projects
            </h2>

            <p className="mt-2 text-slate-600">
              Manage active construction projects, budgets and progress.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <AppButton
              type="button"
              variant="outline"
              disabled
              title="Blank project creation will be added after the template generator flow."
            >
              <Plus className="mr-2 h-4 w-4" />
              Blank Project
            </AppButton>

            <AppButton
              type="button"
              onClick={openDialog}
            >
              <FileStack className="mr-2 h-4 w-4" />
              Generate From Template
            </AppButton>
          </div>
        </section>

        {companyData.projects.length > 0 ? (
          <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {companyData.projects.map(
              project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              )
            )}
          </section>
        ) : (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <h3 className="text-lg font-semibold text-slate-950">
              No projects yet
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
              Generate your first project from an active project template.
            </p>

            <AppButton
              type="button"
              className="mt-6"
              onClick={openDialog}
            >
              <FileStack className="mr-2 h-4 w-4" />
              Generate From Template
            </AppButton>
          </section>
        )}
      </div>

      <GenerateProjectDialog
        open={isDialogOpen}
        companyData={companyData}
        currentStep={currentStep}
        isGenerating={isGenerating}
        canContinue={canContinue}
        error={generationError}

        projectTemplates={
          filteredProjectTemplates
        }
        templateSearchValue={
          templateSearchValue
        }
        selectedProjectTemplateId={
          selectedProjectTemplateId
        }
        onTemplateSearchChange={
          setTemplateSearchValue
        }
        onSelectProjectTemplate={
          selectProjectTemplate
        }

        selectedProjectTemplate={
          selectedProjectTemplate
        }
        selectedProjectTemplateSummary={
          selectedProjectTemplateSummary
        }
        projectDetails={
          projectDetails
        }
        projectDetailsErrors={
          projectDetailsErrors
        }
        expectedEndDate={
          expectedEndDate
        }
        onProjectDetailsChange={
          updateProjectDetails
        }

        generationProgress={
          generationProgress
        }
        generationResult={
          lastGenerationResult
        }
        onOpenProject={
          handleOpenProject
        }
        onGenerateAnother={
          startAnotherProject
        }

        onBack={
          goToPreviousStep
        }
        onClose={closeDialog}
        onNext={
          handleDialogAction
        }
      />
    </DashboardLayout>
  );
}
