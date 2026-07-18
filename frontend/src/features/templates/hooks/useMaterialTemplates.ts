import { useMemo, useState } from "react";

import { useCompanyContext } from "@/features/company/context/useCompanyContext";

import type {
  MaterialCategory,
  MaterialTemplate,
  MaterialTemplateStatus,
  UnitOfMeasure,
} from "@/features/templates/data/materialTemplates";

import {
  MaterialTemplateService,
} from "@/features/templates/services/MaterialTemplateService";

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

  const [searchValue, setSearchValue] =
    useState("");

  const [
    isMaterialTemplateDialogOpen,
    setIsMaterialTemplateDialogOpen,
  ] = useState(false);

  const [
    editingMaterialTemplate,
    setEditingMaterialTemplate,
  ] = useState<MaterialTemplate | null>(
    null
  );

  const filteredMaterialTemplates =
    useMemo(
      () =>
        MaterialTemplateService.search(
          materialTemplates,
          searchValue
        ),
      [
        materialTemplates,
        searchValue,
      ]
    );

  function openAddMaterialTemplateDialog() {
    setEditingMaterialTemplate(null);
    setIsMaterialTemplateDialogOpen(true);
  }

  function openEditMaterialTemplateDialog(
    materialTemplate: MaterialTemplate
  ) {
    setEditingMaterialTemplate(
      materialTemplate
    );

    setIsMaterialTemplateDialogOpen(true);
  }

  function closeMaterialTemplateDialog() {
    setEditingMaterialTemplate(null);
    setIsMaterialTemplateDialogOpen(false);
  }

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

  function saveMaterialTemplate(
    values: SaveMaterialTemplateValues
  ) {
    const isCodeAvailable =
      MaterialTemplateService
        .isCodeAvailable(
          materialTemplates,
          values.code,
          editingMaterialTemplate?.id
        );

    if (!isCodeAvailable) {
      return false;
    }

    if (editingMaterialTemplate) {
      setCompanyData(currentData => ({
        ...currentData,

        materialTemplates:
          MaterialTemplateService.update(
            currentData.materialTemplates,
            editingMaterialTemplate.id,
            values
          ),
      }));

      closeMaterialTemplateDialog();

      return true;
    }

    const newMaterialTemplate =
      MaterialTemplateService.create(values);

    setCompanyData(currentData => ({
      ...currentData,

      materialTemplates: [
        ...currentData.materialTemplates,
        newMaterialTemplate,
      ],
    }));

    closeMaterialTemplateDialog();

    return true;
  }

  function toggleMaterialTemplateStatus(
    materialTemplateId: string
  ) {
    setCompanyData(currentData => ({
      ...currentData,

      materialTemplates:
        MaterialTemplateService.toggleStatus(
          currentData.materialTemplates,
          materialTemplateId
        ),
    }));
  }

  function getMaterialTemplateUsageCount(
    materialTemplateId: string
  ) {
    return MaterialTemplateService
      .getUsageCount(
        materialTemplateId,
        companyData
          .projectTemplateActivityMaterials
      );
  }

  function deleteMaterialTemplate(
    materialTemplateId: string
  ) {
    const canDelete =
      MaterialTemplateService.canDelete(
        materialTemplateId,
        companyData
          .projectTemplateActivityMaterials
      );

    if (!canDelete) {
      return false;
    }

    setCompanyData(currentData => ({
      ...currentData,

      materialTemplates:
        MaterialTemplateService.delete(
          currentData.materialTemplates,
          materialTemplateId
        ),
    }));

    if (
      editingMaterialTemplate?.id ===
      materialTemplateId
    ) {
      closeMaterialTemplateDialog();
    }

    return true;
  }

  return {
    materialTemplates,
    filteredMaterialTemplates,

    searchValue,
    setSearchValue,

    isMaterialTemplateDialogOpen,
    editingMaterialTemplate,

    openAddMaterialTemplateDialog,
    openEditMaterialTemplateDialog,
    closeMaterialTemplateDialog,

    isMaterialTemplateCodeAvailable,
    saveMaterialTemplate,
    toggleMaterialTemplateStatus,
    getMaterialTemplateUsageCount,
    deleteMaterialTemplate,
  };
}