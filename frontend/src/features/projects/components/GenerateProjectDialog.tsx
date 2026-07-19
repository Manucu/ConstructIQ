import {
  TemplateDialog,
} from "@/features/templates/components/shared/forms";

import type {
  CompanyData,
} from "@/features/company/context/companyContextDefinition";

import type {
  ProjectTemplate,
} from "@/features/templates/data/projectTemplates";

import type {
  ProjectTemplateSummary,
} from "@/features/templates/services/ProjectTemplateEstimator";

import {
  ProjectGeneratorFooter,
} from "@/features/projects/components/ProjectGeneratorFooter";

import {
  ProjectGeneratorWizard,
} from "@/features/projects/components/ProjectGeneratorWizard";

import type {
  ProjectDetailsErrors,
  ProjectDetailsValues,
  ProjectGenerationProgress,
  ProjectGeneratorStep,
} from "@/features/projects/hook/useProjectGeneration";

import type {
  ProjectGenerationResult,
} from "@/features/projects/services/projectGenerationService";

type GenerateProjectDialogProps = {
  open: boolean;
  companyData: CompanyData;
  currentStep: ProjectGeneratorStep;
  isGenerating: boolean;
  canContinue: boolean;
  error?: string | null;

  projectTemplates: ProjectTemplate[];
  templateSearchValue: string;
  selectedProjectTemplateId: string | null;
  onTemplateSearchChange: (
    value: string
  ) => void;
  onSelectProjectTemplate: (
    projectTemplateId: string
  ) => void;

  selectedProjectTemplate:
    ProjectTemplate | null;
  selectedProjectTemplateSummary:
    ProjectTemplateSummary | null;
  projectDetails:
    ProjectDetailsValues;
  projectDetailsErrors:
    ProjectDetailsErrors;
  expectedEndDate: string | null;
  onProjectDetailsChange: (
    field: keyof ProjectDetailsValues,
    value: string
  ) => void;

  generationProgress: ProjectGenerationProgress;
  generationResult: ProjectGenerationResult | null;
  onOpenProject: (projectId: string) => void;
  onGenerateAnother: () => void;

  onBack: () => void;
  onClose: () => void;
  onNext: () => void;
};

export function GenerateProjectDialog({
  open,
  companyData,
  currentStep,
  isGenerating,
  canContinue,
  error,

  projectTemplates,
  templateSearchValue,
  selectedProjectTemplateId,
  onTemplateSearchChange,
  onSelectProjectTemplate,

  selectedProjectTemplate,
  selectedProjectTemplateSummary,
  projectDetails,
  projectDetailsErrors,
  expectedEndDate,
  onProjectDetailsChange,

  generationProgress,
  generationResult,
  onOpenProject,
  onGenerateAnother,

  onBack,
  onClose,
  onNext,
}: GenerateProjectDialogProps) {
  const isFirstStep =
    currentStep === 1;

  const isGenerationComplete =
    generationResult !== null;

  const saveLabel =
    currentStep < 4
      ? "Next"
      : isGenerationComplete
        ? "Close"
        : isGenerating
          ? "Generating..."
          : "Generate Project";

  return (
    <TemplateDialog
      open={open}
      title="Generate project from template"
      description="Create a complete project structure from one of your reusable project templates."
      saveLabel={saveLabel}
      isValid={
        isGenerationComplete ||
        (canContinue && !isGenerating)
      }
      error={error ?? null}
      onClose={onClose}
      onSave={onNext}
    >
      <div className="space-y-4">
        <ProjectGeneratorWizard
          companyData={companyData}
          currentStep={currentStep}

          projectTemplates={
            projectTemplates
          }
          templateSearchValue={
            templateSearchValue
          }
          selectedProjectTemplateId={
            selectedProjectTemplateId
          }
          onTemplateSearchChange={
            onTemplateSearchChange
          }
          onSelectProjectTemplate={
            onSelectProjectTemplate
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
            onProjectDetailsChange
          }

          generationProgress={
            generationProgress
          }
          generationResult={
            generationResult
          }
          onOpenProject={
            onOpenProject
          }
          onGenerateAnother={
            onGenerateAnother
          }
        />

        {!isFirstStep && !isGenerationComplete && (
          <ProjectGeneratorFooter
            isGenerating={
              isGenerating
            }
            onBack={onBack}
          />
        )}
      </div>
    </TemplateDialog>
  );
}
