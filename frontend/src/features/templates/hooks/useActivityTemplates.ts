import { useMemo, useState } from "react";

import { useCompanyContext } from "@/features/company/context/useCompanyContext";

import type {
  ActivityCategory,
  ActivityTemplate,
  ActivityTemplateStatus,
} from "@/features/templates/data/activityTemplates";

export type SaveActivityTemplateValues = {
  name: string;
  category: ActivityCategory;
  status: ActivityTemplateStatus;
  description?: string;
};

export function useActivityTemplates() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const activityTemplates = companyData.activityTemplates;

  const [searchValue, setSearchValue] = useState("");

  const [
    isActivityTemplateDialogOpen,
    setIsActivityTemplateDialogOpen,
  ] = useState(false);

  const [
    editingActivityTemplate,
    setEditingActivityTemplate,
  ] = useState<ActivityTemplate | null>(null);

  const filteredActivityTemplates = useMemo(() => {
    const normalizedSearch = searchValue
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return activityTemplates;
    }

    return activityTemplates.filter((activityTemplate) => {
      return (
        activityTemplate.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        activityTemplate.category
          .toLowerCase()
          .includes(normalizedSearch) ||
        activityTemplate.status
          .toLowerCase()
          .includes(normalizedSearch) ||
        activityTemplate.description
          ?.toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [activityTemplates, searchValue]);

  function openAddActivityTemplateDialog() {
    setEditingActivityTemplate(null);
    setIsActivityTemplateDialogOpen(true);
  }

  function openEditActivityTemplateDialog(
    activityTemplate: ActivityTemplate
  ) {
    setEditingActivityTemplate(activityTemplate);
    setIsActivityTemplateDialogOpen(true);
  }

  function closeActivityTemplateDialog() {
    setEditingActivityTemplate(null);
    setIsActivityTemplateDialogOpen(false);
  }

  function saveActivityTemplate(
    values: SaveActivityTemplateValues
  ) {
    if (editingActivityTemplate) {
      setCompanyData((currentData) => ({
        ...currentData,
        activityTemplates:
          currentData.activityTemplates.map(
            (activityTemplate) =>
              activityTemplate.id ===
              editingActivityTemplate.id
                ? {
                    ...activityTemplate,
                    ...values,
                  }
                : activityTemplate
          ),
      }));

      closeActivityTemplateDialog();
      return;
    }

    const newActivityTemplate: ActivityTemplate = {
      id: crypto.randomUUID(),
      ...values,
    };

    setCompanyData((currentData) => ({
      ...currentData,
      activityTemplates: [
        ...currentData.activityTemplates,
        newActivityTemplate,
      ],
    }));

    closeActivityTemplateDialog();
  }

  function toggleActivityTemplateStatus(
    activityTemplateId: string
  ) {
    setCompanyData((currentData) => ({
      ...currentData,
      activityTemplates:
        currentData.activityTemplates.map(
          (activityTemplate) =>
            activityTemplate.id === activityTemplateId
              ? {
                  ...activityTemplate,
                  status:
                    activityTemplate.status === "ACTIVE"
                      ? "INACTIVE"
                      : "ACTIVE",
                }
              : activityTemplate
        ),
    }));
  }

  function deleteActivityTemplate(
    activityTemplateId: string
  ) {
    setCompanyData((currentData) => ({
      ...currentData,
      activityTemplates:
        currentData.activityTemplates.filter(
          (activityTemplate) =>
            activityTemplate.id !== activityTemplateId
        ),
    }));
  }

  return {
    activityTemplates,
    filteredActivityTemplates,
    searchValue,
    isActivityTemplateDialogOpen,
    editingActivityTemplate,

    setSearchValue,

    openAddActivityTemplateDialog,
    openEditActivityTemplateDialog,
    closeActivityTemplateDialog,

    saveActivityTemplate,
    toggleActivityTemplateStatus,
    deleteActivityTemplate,
  };
}