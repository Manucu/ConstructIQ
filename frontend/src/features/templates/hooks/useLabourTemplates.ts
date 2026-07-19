import {
  useMemo,
  useState,
} from "react";

import {
  useCompanyContext,
} from "@/features/company/context/useCompanyContext";

import type {
  LabourTemplate,
  LabourTemplateStatus,
} from "@/features/templates/data/labourTemplates";

import {
  LabourTemplateService,
} from "@/features/templates/services/LabourTemplateService";

export type SaveLabourTemplateValues = {
  role: string;
  estimatedHourlyRate?: number;
  status: LabourTemplateStatus;
  description?: string;
};

export function useLabourTemplates() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const labourTemplates =
    companyData.labourTemplates;

  const [searchValue, setSearchValue] =
    useState("");

  const [
    isLabourTemplateDialogOpen,
    setIsLabourTemplateDialogOpen,
  ] = useState(false);

  const [
    editingLabourTemplate,
    setEditingLabourTemplate,
  ] = useState<LabourTemplate | null>(
    null
  );

  const filteredLabourTemplates =
    useMemo(
      () =>
        LabourTemplateService.search(
          labourTemplates,
          searchValue
        ),
      [
        labourTemplates,
        searchValue,
      ]
    );

  function openAddLabourTemplateDialog() {
    setEditingLabourTemplate(null);
    setIsLabourTemplateDialogOpen(true);
  }

  function openEditLabourTemplateDialog(
    labourTemplate: LabourTemplate
  ) {
    setEditingLabourTemplate(
      labourTemplate
    );

    setIsLabourTemplateDialogOpen(true);
  }

  function closeLabourTemplateDialog() {
    setEditingLabourTemplate(null);
    setIsLabourTemplateDialogOpen(false);
  }

  function isLabourTemplateRoleAvailable(
    role: string,
    ignoredLabourTemplateId?: string
  ) {
    return LabourTemplateService.isRoleAvailable(
      labourTemplates,
      role,
      ignoredLabourTemplateId
    );
  }

  function saveLabourTemplate(
    values: SaveLabourTemplateValues
  ) {
    const normalizedRole =
      values.role.trim();

    if (!normalizedRole) {
      return false;
    }

    const isRoleAvailable =
      LabourTemplateService.isRoleAvailable(
        labourTemplates,
        normalizedRole,
        editingLabourTemplate?.id
      );

    if (!isRoleAvailable) {
      return false;
    }

    const normalizedValues = {
      ...values,
      role: normalizedRole,
    };

    if (editingLabourTemplate) {
      setCompanyData(currentData => ({
        ...currentData,

        labourTemplates:
          LabourTemplateService.update(
            currentData.labourTemplates,
            editingLabourTemplate.id,
            normalizedValues
          ),
      }));

      closeLabourTemplateDialog();

      return true;
    }

    const newLabourTemplate =
      LabourTemplateService.create(
        normalizedValues
      );

    setCompanyData(currentData => ({
      ...currentData,

      labourTemplates: [
        ...currentData.labourTemplates,
        newLabourTemplate,
      ],
    }));

    closeLabourTemplateDialog();

    return true;
  }

  function toggleLabourTemplateStatus(
    labourTemplateId: string
  ) {
    setCompanyData(currentData => ({
      ...currentData,

      labourTemplates:
        LabourTemplateService.toggleStatus(
          currentData.labourTemplates,
          labourTemplateId
        ),
    }));
  }

  function getLabourTemplateUsageCount(
    labourTemplateId: string
  ) {
    return LabourTemplateService.getUsageCount(
      labourTemplateId,
      companyData.projectTemplateActivityLabour
    );
  }

  function deleteLabourTemplate(
    labourTemplateId: string
  ) {
    const canDelete =
      LabourTemplateService.canDelete(
        labourTemplateId,
        companyData.projectTemplateActivityLabour
      );

    if (!canDelete) {
      return false;
    }

    setCompanyData(currentData => ({
      ...currentData,

      labourTemplates:
        LabourTemplateService.delete(
          currentData.labourTemplates,
          labourTemplateId
        ),
    }));

    if (
      editingLabourTemplate?.id ===
      labourTemplateId
    ) {
      closeLabourTemplateDialog();
    }

    return true;
  }

  return {
    labourTemplates,
    filteredLabourTemplates,

    searchValue,
    setSearchValue,

    isLabourTemplateDialogOpen,
    editingLabourTemplate,

    openAddLabourTemplateDialog,
    openEditLabourTemplateDialog,
    closeLabourTemplateDialog,

    isLabourTemplateRoleAvailable,
    saveLabourTemplate,
    toggleLabourTemplateStatus,
    getLabourTemplateUsageCount,
    deleteLabourTemplate,
  };
}