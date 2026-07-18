import { useMemo, useState } from "react";

import { useCompanyContext } from "@/features/company/context/useCompanyContext";

import type {
  ProjectTemplate,
  ProjectTemplateCategory,
  ProjectTemplateStatus,
} from "@/features/templates/data/projectTemplates";

import { CompanyDataService } from "@/features/company/services/companyDataService";

export type SaveProjectTemplateValues = {
  name: string;
  category: ProjectTemplateCategory;
  status: ProjectTemplateStatus;
  description?: string;
  estimatedDurationDays?: number;
  estimatedBudget?: number;
};

export function useCompanyProjectTemplates() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const projectTemplates =
    companyData.projectTemplates;

  const [searchValue, setSearchValue] =
    useState("");

  const [
    isProjectTemplateDialogOpen,
    setIsProjectTemplateDialogOpen,
  ] = useState(false);

  const [
    editingProjectTemplate,
    setEditingProjectTemplate,
  ] = useState<ProjectTemplate | null>(null);

  const filteredProjectTemplates =
    useMemo(() => {
      const normalizedSearch = searchValue
        .trim()
        .toLowerCase();

      if (!normalizedSearch) {
        return projectTemplates;
      }

      return projectTemplates.filter(
        projectTemplate =>
          projectTemplate.name
            .toLowerCase()
            .includes(normalizedSearch) ||
          projectTemplate.category
            .toLowerCase()
            .includes(normalizedSearch) ||
          projectTemplate.status
            .toLowerCase()
            .includes(normalizedSearch) ||
          projectTemplate.description
            ?.toLowerCase()
            .includes(normalizedSearch)
      );
    }, [
      projectTemplates,
      searchValue,
    ]);

  function openAddProjectTemplateDialog() {
    setEditingProjectTemplate(null);
    setIsProjectTemplateDialogOpen(true);
  }

  function openEditProjectTemplateDialog(
    projectTemplate: ProjectTemplate
  ) {
    setEditingProjectTemplate(
      projectTemplate
    );

    setIsProjectTemplateDialogOpen(true);
  }

  function closeProjectTemplateDialog() {
    setEditingProjectTemplate(null);
    setIsProjectTemplateDialogOpen(false);
  }

  function saveProjectTemplate(
    values: SaveProjectTemplateValues
  ) {
    if (editingProjectTemplate) {
      setCompanyData(currentData => ({
        ...currentData,

        projectTemplates:
          currentData.projectTemplates.map(
            projectTemplate =>
              projectTemplate.id ===
              editingProjectTemplate.id
                ? {
                    ...projectTemplate,
                    ...values,
                  }
                : projectTemplate
          ),
      }));

      closeProjectTemplateDialog();
      return;
    }

    const newProjectTemplate: ProjectTemplate = {
      id: crypto.randomUUID(),
      ...values,
    };

    setCompanyData(currentData => ({
      ...currentData,

      projectTemplates: [
        ...currentData.projectTemplates,
        newProjectTemplate,
      ],
    }));

    closeProjectTemplateDialog();
  }

  function toggleProjectTemplateStatus(
    projectTemplateId: string
  ) {
    setCompanyData(currentData => ({
      ...currentData,

      projectTemplates:
        currentData.projectTemplates.map(
          projectTemplate =>
            projectTemplate.id ===
            projectTemplateId
              ? {
                  ...projectTemplate,

                  status:
                    projectTemplate.status ===
                    "ACTIVE"
                      ? "INACTIVE"
                      : "ACTIVE",
                }
              : projectTemplate
        ),
    }));
  }

  function deleteProjectTemplate(
    projectTemplateId: string
  ) {
    setCompanyData(currentData =>
      CompanyDataService.deleteProjectTemplate(
        currentData,
        projectTemplateId
      )
    );

    if (
      editingProjectTemplate?.id ===
      projectTemplateId
    ) {
      closeProjectTemplateDialog();
    }
  }

  return {
    projectTemplates,
    filteredProjectTemplates,

    searchValue,
    setSearchValue,

    isProjectTemplateDialogOpen,
    editingProjectTemplate,

    openAddProjectTemplateDialog,
    openEditProjectTemplateDialog,
    closeProjectTemplateDialog,

    saveProjectTemplate,
    toggleProjectTemplateStatus,
    deleteProjectTemplate,
  };
}