import {
  useCallback,
} from "react";

import {
  useCompanyContext,
} from "@/features/company/context/useCompanyContext";

import type {
  EquipmentTemplateStatus,
} from "@/features/templates/data/equipmentTemplates";

import {
  EquipmentTemplateService,
} from "@/features/templates/services/EquipmentTemplateService";

import {
  useTemplateCrud,
} from "@/features/templates/hooks/useTemplateCrud";

export type SaveEquipmentTemplateValues = {
  name: string;
  category: string;
  estimatedHourlyRate?: number;
  status: EquipmentTemplateStatus;
  description?: string;
};

export function useEquipmentTemplates() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const equipmentTemplates =
    companyData.equipmentTemplates;

  const search = useCallback(
    (
      templates: typeof equipmentTemplates,
      searchValue: string
    ) =>
      EquipmentTemplateService.search(
        templates,
        searchValue
      ),
    []
  );

  const create = useCallback(
    (values: SaveEquipmentTemplateValues) =>
      EquipmentTemplateService.create(values),
    []
  );

  const update = useCallback(
    (
      templates: typeof equipmentTemplates,
      templateId: string,
      values: SaveEquipmentTemplateValues
    ) =>
      EquipmentTemplateService.update(
        templates,
        templateId,
        values
      ),
    []
  );

  const toggleStatus = useCallback(
    (
      templates: typeof equipmentTemplates,
      templateId: string
    ) =>
      EquipmentTemplateService.toggleStatus(
        templates,
        templateId
      ),
    []
  );

  const remove = useCallback(
    (
      templates: typeof equipmentTemplates,
      templateId: string
    ) =>
      EquipmentTemplateService.delete(
        templates,
        templateId
      ),
    []
  );

  const getUsageCount = useCallback(
    (templateId: string) =>
      EquipmentTemplateService.getUsageCount(
        templateId,
        companyData
          .projectTemplateActivityEquipment
      ),
    [
      companyData
        .projectTemplateActivityEquipment,
    ]
  );

  const canDelete = useCallback(
    (templateId: string) =>
      EquipmentTemplateService.canDelete(
        templateId,
        companyData
          .projectTemplateActivityEquipment
      ),
    [
      companyData
        .projectTemplateActivityEquipment,
    ]
  );

  const setTemplates = useCallback(
    (
      updater: (
        currentTemplates:
          typeof equipmentTemplates
      ) => typeof equipmentTemplates
    ) => {
      setCompanyData(currentData => ({
        ...currentData,
        equipmentTemplates: updater(
          currentData.equipmentTemplates
        ),
      }));
    },
    [setCompanyData]
  );

  const normalizeValues = useCallback(
    (
      values: SaveEquipmentTemplateValues
    ): SaveEquipmentTemplateValues | null => {
      const name = values.name.trim();
      const category =
        values.category.trim();

      if (!name || !category) {
        return null;
      }

      return {
        ...values,
        name,
        category,
        description:
          values.description?.trim() ||
          undefined,
      };
    },
    []
  );

  const validateValues = useCallback(
    (
      values: SaveEquipmentTemplateValues,
      editingTemplate:
        (typeof equipmentTemplates)[number] | null
    ) =>
      EquipmentTemplateService
        .isNameAvailable(
          equipmentTemplates,
          values.name,
          editingTemplate?.id
        ),
    [equipmentTemplates]
  );

  const crud = useTemplateCrud({
    templates: equipmentTemplates,
    search,
    create,
    update,
    toggleStatus,
    remove,
    getUsageCount,
    canDelete,
    setTemplates,
    normalizeValues,
    validateValues,
  });

  function isEquipmentTemplateNameAvailable(
    name: string,
    ignoredEquipmentTemplateId?: string
  ) {
    return EquipmentTemplateService
      .isNameAvailable(
        equipmentTemplates,
        name,
        ignoredEquipmentTemplateId
      );
  }

  return {
    equipmentTemplates:
      crud.templates,

    filteredEquipmentTemplates:
      crud.filteredTemplates,

    searchValue:
      crud.searchValue,

    setSearchValue:
      crud.setSearchValue,

    isEquipmentTemplateDialogOpen:
      crud.isTemplateDialogOpen,

    editingEquipmentTemplate:
      crud.editingTemplate,

    openAddEquipmentTemplateDialog:
      crud.openAddTemplateDialog,

    openEditEquipmentTemplateDialog:
      crud.openEditTemplateDialog,

    closeEquipmentTemplateDialog:
      crud.closeTemplateDialog,

    isEquipmentTemplateNameAvailable,

    saveEquipmentTemplate:
      crud.saveTemplate,

    toggleEquipmentTemplateStatus:
      crud.toggleTemplateStatus,

    getEquipmentTemplateUsageCount:
      crud.getTemplateUsageCount,

    deleteEquipmentTemplate:
      crud.deleteTemplate,
  };
}
