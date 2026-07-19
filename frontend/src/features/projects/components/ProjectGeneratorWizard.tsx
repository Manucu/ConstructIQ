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
  ProjectDetailsStep,
} from "@/features/projects/components/ProjectDetailsStep";

import {
  ProjectGeneratorStepHeader,
} from "@/features/projects/components/ProjectGeneratorStepHeader";

import {
  ProjectGenerationStep,
} from "@/features/projects/components/ProjectGenerationStep";

import {
  ProjectReviewStep,
} from "@/features/projects/components/ProjectReviewStep";

import {
  ProjectTemplateSelectionStep,
} from "@/features/projects/components/ProjectTemplateSelectionStep";

import type {
  ProjectDetailsErrors,
  ProjectDetailsValues,
  ProjectGenerationProgress,
  ProjectGeneratorStep,
} from "@/features/projects/hook/useProjectGeneration";

import type {
  ProjectGenerationResult,
} from "@/features/projects/services/projectGenerationService";

type ProjectGeneratorWizardProps = {
  companyData: CompanyData;
  currentStep: ProjectGeneratorStep;

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
};

export function ProjectGeneratorWizard({
  companyData,
  currentStep,

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
}: ProjectGeneratorWizardProps) {
  let stepContent;

  if (currentStep === 1) {
    stepContent = (
      <ProjectTemplateSelectionStep
        companyData={companyData}
        projectTemplates={
          projectTemplates
        }
        searchValue={
          templateSearchValue
        }
        selectedProjectTemplateId={
          selectedProjectTemplateId
        }
        onSearchChange={
          onTemplateSearchChange
        }
        onSelect={
          onSelectProjectTemplate
        }
      />
    );
  } else if (
    currentStep === 2 &&
    selectedProjectTemplate &&
    selectedProjectTemplateSummary
  ) {
    stepContent = (
      <ProjectDetailsStep
        projectTemplate={
          selectedProjectTemplate
        }
        summary={
          selectedProjectTemplateSummary
        }
        values={projectDetails}
        errors={
          projectDetailsErrors
        }
        expectedEndDate={
          expectedEndDate
        }
        onChange={
          onProjectDetailsChange
        }
      />
    );
  } else if (
    currentStep === 3 &&
    selectedProjectTemplate &&
    selectedProjectTemplateSummary
  ) {
    stepContent = (
      <ProjectReviewStep
        projectTemplate={
          selectedProjectTemplate
        }
        summary={
          selectedProjectTemplateSummary
        }
        projectDetails={
          projectDetails
        }
        expectedEndDate={
          expectedEndDate
        }
      />
    );
  } else {
    stepContent = (
      <ProjectGenerationStep
        projectName={projectDetails.name}
        progress={generationProgress}
        result={generationResult}
        onOpenProject={onOpenProject}
        onGenerateAnother={onGenerateAnother}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ProjectGeneratorStepHeader
        currentStep={currentStep}
      />

      {stepContent}
    </div>
  );
}

