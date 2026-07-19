import {
  useCallback,
} from "react";

import {
  useCompanyContext,
} from "@/features/company/context/useCompanyContext";

import type {
  MaterialCategory,
  MaterialTemplateStatus,
  UnitOfMeasure,
} from "@/features/templates/data/materialTemplates";

import {
  MaterialTemplateService,
} from "@/features/templates/services/MaterialTemplateService";

import {
  useTemplateCrud,
} from "@/features/templates/hooks/useTemplateCrud";

export type SaveMaterialTemplateValues = {
  code: string;
  name: string;
  category: MaterialCategory;
  unit: UnitOfMeasure;
  defaultEstimatedUnitCost?: number;
  status: MaterialTemplateStatus;
};

export function useMaterialTemplates() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const materialTemplates =
    companyData.materialTemplates;

  const search = useCallback(
    (
      templates: typeof materialTemplates,
      searchValue: string
    ) =>
      MaterialTemplateService.search(
        templates,
        searchValue
      ),
    []
  );

  const create = useCallback(
    (values: SaveMaterialTemplateValues) =>
      MaterialTemplateService.create(values),
    []
  );

  const update = useCallback(
    (
      templates: typeof materialTemplates,
      templateId: string,
      values: SaveMaterialTemplateValues
    ) =>
      MaterialTemplateService.update(
        templates,
        templateId,
        values
      ),
    []
  );

  const toggleStatus = useCallback(
    (
      templates: typeof materialTemplates,
      templateId: string
    ) =>
      MaterialTemplateService.toggleStatus(
        templates,
        templateId
      ),
    []
  );

  const remove = useCallback(
    (
      templates: typeof materialTemplates,
      templateId: string
    ) =>
      MaterialTemplateService.delete(
        templates,
        templateId
      ),
    []
  );

  const getUsageCount = useCallback(
    (templateId: string) =>
      MaterialTemplateService.getUsageCount(
        templateId,
        companyData
          .projectTemplateActivityMaterials
      ),
    [
      companyData
        .projectTemplateActivityMaterials,
    ]
  );

  const canDelete = useCallback(
    (templateId: string) =>
      MaterialTemplateService.canDelete(
        templateId,
        companyData
          .projectTemplateActivityMaterials
      ),
    [
      companyData
        .projectTemplateActivityMaterials,
    ]
  );

  const setTemplates = useCallback(
    (
      updater: (
        currentTemplates:
          typeof materialTemplates
      ) => typeof materialTemplates
    ) => {
      setCompanyData(currentData => ({
        ...currentData,
        materialTemplates: updater(
          currentData.materialTemplates
        ),
      }));
    },
    [setCompanyData]
  );

  const normalizeValues = useCallback(
    (
      values: SaveMaterialTemplateValues
    ): SaveMaterialTemplateValues | null => {
      const code = values.code.trim();
      const name = values.name.trim();

      if (!code || !name) {
        return null;
      }

      return {
        ...values,
        code,
        name,
      };
    },
    []
  );

  const validateValues = useCallback(
    (
      values: SaveMaterialTemplateValues,
      editingTemplate:
        (typeof materialTemplates)[number] | null
    ) =>
      MaterialTemplateService
        .isCodeAvailable(
          materialTemplates,
          values.code,
          editingTemplate?.id
        ),
    [materialTemplates]
  );

  const crud = useTemplateCrud({
    templates: materialTemplates,
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

  function isMaterialTemplateCodeAvailable(
    code: string,
    ignoredMaterialTemplateId?: string
  ) {
    return MaterialTemplateService
      .isCodeAvailable(
        materialTemplates,
        code,
        ignoredMaterialTemplateId
      );
  }

  return {
    materialTemplates:
      crud.templates,

    filteredMaterialTemplates:
      crud.filteredTemplates,

    searchValue:
      crud.searchValue,

    setSearchValue:
      crud.setSearchValue,

    isMaterialTemplateDialogOpen:
      crud.isTemplateDialogOpen,

    editingMaterialTemplate:
      crud.editingTemplate,

    openAddMaterialTemplateDialog:
      crud.openAddTemplateDialog,

    openEditMaterialTemplateDialog:
      crud.openEditTemplateDialog,

    closeMaterialTemplateDialog:
      crud.closeTemplateDialog,

    isMaterialTemplateCodeAvailable,

    saveMaterialTemplate:
      crud.saveTemplate,

    toggleMaterialTemplateStatus:
      crud.toggleTemplateStatus,

    getMaterialTemplateUsageCount:
      crud.getTemplateUsageCount,

    deleteMaterialTemplate:
      crud.deleteTemplate,
  };
}
