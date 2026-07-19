import {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  useCompanyContext,
} from "@/features/company/context/useCompanyContext";

import type {
  ProjectStatus,
} from "@/features/projects/data/projects";

import type {
  ProjectTemplate,
} from "@/features/templates/data/projectTemplates";

import {
  ProjectTemplateEstimator,
  type ProjectTemplateSummary,
} from "@/features/templates/services/ProjectTemplateEstimator";

import {
  ProjectGenerationService,
  type ProjectGenerationResult,
} from "@/features/projects/services/projectGenerationService";

export const PROJECT_GENERATOR_STEP_COUNT = 4;

export type ProjectGeneratorStep =
  | 1
  | 2
  | 3
  | 4;

export type ProjectDetailsValues = {
  name: string;
  clientName: string;
  address: string;
  status: ProjectStatus;
  startDate: string;
};

export type ProjectDetailsErrors = {
  name?: string;
  startDate?: string;
};

export type ProjectGenerationProgress = {
  isRunning: boolean;
  percent: number;
  message: string;
};

const initialGenerationProgress: ProjectGenerationProgress = {
  isRunning: false,
  percent: 0,
  message: "Ready to generate.",
};

function wait(milliseconds: number) {
  return new Promise<void>(resolve => {
    window.setTimeout(resolve, milliseconds);
  });
}

const initialProjectDetails:
  ProjectDetailsValues = {
    name: "",
    clientName: "",
    address: "",
    status: "PLANNING",
    startDate: "",
  };

function getTodayDateValue() {
  const now = new Date();
  const timezoneOffset =
    now.getTimezoneOffset() * 60_000;

  return new Date(
    now.getTime() - timezoneOffset
  )
    .toISOString()
    .slice(0, 10);
}

function addDaysToDateValue(
  dateValue: string,
  days: number
) {
  if (!dateValue) {
    return null;
  }

  const date = new Date(
    `${dateValue}T00:00:00`
  );

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setDate(
    date.getDate() +
    Math.max(0, days)
  );

  const timezoneOffset =
    date.getTimezoneOffset() * 60_000;

  return new Date(
    date.getTime() - timezoneOffset
  )
    .toISOString()
    .slice(0, 10);
}

export function useProjectGeneration() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const [
    isGenerating,
    setIsGenerating,
  ] = useState(false);

  const [
    generationError,
    setGenerationError,
  ] = useState<string | null>(null);

  const [
    generationProgress,
    setGenerationProgress,
  ] = useState<ProjectGenerationProgress>(
    initialGenerationProgress
  );

  const [
    lastGenerationResult,
    setLastGenerationResult,
  ] = useState<ProjectGenerationResult | null>(
    null
  );

  const [
    isDialogOpen,
    setIsDialogOpen,
  ] = useState(false);

  const [
    currentStep,
    setCurrentStep,
  ] = useState<ProjectGeneratorStep>(1);

  const [
    templateSearchValue,
    setTemplateSearchValue,
  ] = useState("");

  const [
    selectedProjectTemplateId,
    setSelectedProjectTemplateId,
  ] = useState<string | null>(null);

  const [
    projectDetails,
    setProjectDetails,
  ] = useState<ProjectDetailsValues>(
    initialProjectDetails
  );

  const [
    projectDetailsErrors,
    setProjectDetailsErrors,
  ] = useState<ProjectDetailsErrors>({});

  const activeProjectTemplates =
    useMemo(
      () =>
        companyData.projectTemplates.filter(
          template =>
            template.status === "ACTIVE"
        ),
      [companyData.projectTemplates]
    );

  const filteredProjectTemplates =
    useMemo(() => {
      const normalizedSearch =
        templateSearchValue
          .trim()
          .toLowerCase();

      if (!normalizedSearch) {
        return activeProjectTemplates;
      }

      return activeProjectTemplates.filter(
        template =>
          template.name
            .toLowerCase()
            .includes(normalizedSearch) ||
          template.category
            .toLowerCase()
            .includes(normalizedSearch) ||
          template.description
            ?.toLowerCase()
            .includes(normalizedSearch)
      );
    }, [
      activeProjectTemplates,
      templateSearchValue,
    ]);

  const selectedProjectTemplate =
    useMemo<ProjectTemplate | null>(
      () =>
        activeProjectTemplates.find(
          template =>
            template.id ===
            selectedProjectTemplateId
        ) ?? null,
      [
        activeProjectTemplates,
        selectedProjectTemplateId,
      ]
    );

  const selectedProjectTemplateSummary =
    useMemo<ProjectTemplateSummary | null>(
      () =>
        selectedProjectTemplate
          ? ProjectTemplateEstimator.getProjectSummary(
              companyData,
              selectedProjectTemplate.id
            )
          : null,
      [
        companyData,
        selectedProjectTemplate,
      ]
    );

  const expectedEndDate =
    useMemo(
      () =>
        addDaysToDateValue(
          projectDetails.startDate,
          selectedProjectTemplate
            ?.estimatedDurationDays ?? 0
        ),
      [
        projectDetails.startDate,
        selectedProjectTemplate,
      ]
    );

  const validateProjectDetails =
    useCallback(() => {
      const errors:
        ProjectDetailsErrors = {};

      const normalizedName =
        projectDetails.name.trim();

      if (!normalizedName) {
        errors.name =
          "Project name is required.";
      } else {
        const duplicateExists =
          companyData.projects.some(
            project =>
              project.name
                .trim()
                .toLowerCase() ===
              normalizedName.toLowerCase()
          );

        if (duplicateExists) {
          errors.name =
            "A project with this name already exists.";
        }
      }

      if (
        projectDetails.startDate &&
        Number.isNaN(
          new Date(
            `${projectDetails.startDate}T00:00:00`
          ).getTime()
        )
      ) {
        errors.startDate =
          "Start date is invalid.";
      }

      setProjectDetailsErrors(errors);

      return (
        Object.keys(errors).length === 0
      );
    }, [
      companyData.projects,
      projectDetails,
    ]);

  const canContinue =
    useMemo(() => {
      if (currentStep === 1) {
        return (
          selectedProjectTemplate !== null
        );
      }

      if (currentStep === 2) {
        const normalizedName =
          projectDetails.name.trim();

        const duplicateExists =
          companyData.projects.some(
            project =>
              project.name
                .trim()
                .toLowerCase() ===
              normalizedName.toLowerCase()
          );

        return (
          normalizedName.length > 0 &&
          !duplicateExists
        );
      }

      return true;
    }, [
      companyData.projects,
      currentStep,
      projectDetails.name,
      selectedProjectTemplate,
    ]);

  const selectProjectTemplate =
    useCallback(
      (projectTemplateId: string) => {
        const projectTemplate =
          companyData.projectTemplates.find(
            template =>
              template.id ===
              projectTemplateId
          );

        setSelectedProjectTemplateId(
          projectTemplateId
        );

        setProjectDetails(current => ({
          ...current,
          name:
            current.name.trim() ||
            `${projectTemplate?.name ?? "New"} Project`,
          startDate:
            current.startDate ||
            getTodayDateValue(),
        }));

        setProjectDetailsErrors({});
        setGenerationError(null);
      },
      [companyData.projectTemplates]
    );

  const updateProjectDetails =
    useCallback(
      (
        field:
          keyof ProjectDetailsValues,
        value: string
      ) => {
        setProjectDetails(current => ({
          ...current,
          [field]: value,
        }));

        setProjectDetailsErrors(
          current => ({
            ...current,
            ...(field === "name"
              ? { name: undefined }
              : {}),
            ...(field === "startDate"
              ? { startDate: undefined }
              : {}),
          })
        );

        setGenerationError(null);
      },
      []
    );

  const generateProject =
    useCallback(async () => {
      if (
        isGenerating ||
        !selectedProjectTemplate
      ) {
        return null;
      }

      setIsGenerating(true);
      setGenerationError(null);
      setLastGenerationResult(null);
      setGenerationProgress({
        isRunning: true,
        percent: 10,
        message: "Preparing project data...",
      });

      try {
        await wait(180);
        setGenerationProgress({
          isRunning: true,
          percent: 30,
          message: "Creating project and stages...",
        });

        await wait(180);
        setGenerationProgress({
          isRunning: true,
          percent: 55,
          message: "Creating activities...",
        });

        await wait(180);
        setGenerationProgress({
          isRunning: true,
          percent: 78,
          message: "Adding resources and budgets...",
        });

        const result =
          ProjectGenerationService.generate(
            companyData,
            {
              projectTemplateId:
                selectedProjectTemplate.id,
              name: projectDetails.name,
              clientName:
                projectDetails.clientName,
              address:
                projectDetails.address,
              status:
                projectDetails.status,
              startDate:
                projectDetails.startDate ||
                undefined,
            }
          );

        setCompanyData(result.companyData);

        await wait(180);
        setGenerationProgress({
          isRunning: true,
          percent: 100,
          message: "Project created successfully.",
        });

        setLastGenerationResult(result);

        return result;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "The project could not be generated.";

        setGenerationError(message);
        setGenerationProgress(
          initialGenerationProgress
        );

        return null;
      } finally {
        setIsGenerating(false);
      }
    }, [
      companyData,
      isGenerating,
      projectDetails,
      selectedProjectTemplate,
      setCompanyData,
    ]);

  const clearGenerationError =
    useCallback(() => {
      setGenerationError(null);
    }, []);

  const resetWizard =
    useCallback(() => {
      setCurrentStep(1);
      setTemplateSearchValue("");
      setSelectedProjectTemplateId(null);
      setProjectDetails(
        initialProjectDetails
      );
      setProjectDetailsErrors({});
      setGenerationError(null);
      setGenerationProgress(initialGenerationProgress);
      setLastGenerationResult(null);
    }, []);

  const startAnotherProject =
    useCallback(() => {
      resetWizard();
    }, [resetWizard]);

  const openDialog =
    useCallback(() => {
      resetWizard();
      setIsDialogOpen(true);
    }, [resetWizard]);

  const closeDialog =
    useCallback(() => {
      if (isGenerating) {
        return;
      }

      setIsDialogOpen(false);
      resetWizard();
    }, [
      isGenerating,
      resetWizard,
    ]);

  const goToNextStep =
    useCallback(() => {
      if (
        currentStep === 1 &&
        selectedProjectTemplateId === null
      ) {
        return;
      }

      if (
        currentStep === 2 &&
        !validateProjectDetails()
      ) {
        return;
      }

      setCurrentStep(current =>
        Math.min(
          PROJECT_GENERATOR_STEP_COUNT,
          current + 1
        ) as ProjectGeneratorStep
      );
    }, [
      currentStep,
      selectedProjectTemplateId,
      validateProjectDetails,
    ]);

  const goToPreviousStep =
    useCallback(() => {
      setCurrentStep(current =>
        Math.max(
          1,
          current - 1
        ) as ProjectGeneratorStep
      );
    }, []);

  return {
    activeProjectTemplates,
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
    validateProjectDetails,

    isGenerating,
    generationError,
    generationProgress,
    lastGenerationResult,
    generateProject,
    startAnotherProject,
    clearGenerationError,

    isDialogOpen,
    currentStep,
    isFirstStep:
      currentStep === 1,
    isLastStep:
      currentStep ===
      PROJECT_GENERATOR_STEP_COUNT,
    canContinue,

    openDialog,
    closeDialog,
    goToNextStep,
    goToPreviousStep,
  };
}
