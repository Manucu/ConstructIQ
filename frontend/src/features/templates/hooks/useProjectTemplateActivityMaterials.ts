import { useMemo, useState } from "react";

import { useCompanyContext } from "@/features/company/context/useCompanyContext";

import type {
  ProjectTemplateActivityMaterial,
} from "../data/projectTemplateActivityMaterial";

export type SaveProjectTemplateActivityMaterialValues = {
  materialTemplateId: string;
  estimatedQuantity: number;
  estimatedUnitCost?: number;
  notes?: string;
};

type UseProjectTemplateActivityMaterialsOptions = {
  projectTemplateActivityId: string;
};

export function useProjectTemplateActivityMaterials({
  projectTemplateActivityId,
}: UseProjectTemplateActivityMaterialsOptions) {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const [
    isMaterialDialogOpen,
    setIsMaterialDialogOpen,
  ] = useState(false);

  const [
    editingMaterial,
    setEditingMaterial,
  ] =
    useState<ProjectTemplateActivityMaterial | null>(
      null
    );

  const activityMaterials = useMemo(
    () =>
      companyData.projectTemplateActivityMaterials.filter(
        material =>
          material.projectTemplateActivityId ===
          projectTemplateActivityId
      ),
    [
      companyData.projectTemplateActivityMaterials,
      projectTemplateActivityId,
    ]
  );

  /*
   * La adăugare oferim doar template-uri active
   * care nu sunt deja asociate activității.
   */
  const availableMaterialTemplates = useMemo(
    () =>
      companyData.materialTemplates.filter(
        materialTemplate =>
          materialTemplate.status === "ACTIVE" &&
          !activityMaterials.some(
            material =>
              material.materialTemplateId ===
              materialTemplate.id
          )
      ),
    [
      companyData.materialTemplates,
      activityMaterials,
    ]
  );

  function openAddMaterialDialog() {
    setEditingMaterial(null);
    setIsMaterialDialogOpen(true);
  }

  function openEditMaterialDialog(
    material: ProjectTemplateActivityMaterial
  ) {
    setEditingMaterial(material);
    setIsMaterialDialogOpen(true);
  }

  function closeMaterialDialog() {
    setEditingMaterial(null);
    setIsMaterialDialogOpen(false);
  }

  function saveMaterial(
    values: SaveProjectTemplateActivityMaterialValues
  ) {
    if (editingMaterial) {
      setCompanyData(currentData => ({
        ...currentData,

        projectTemplateActivityMaterials:
          currentData.projectTemplateActivityMaterials.map(
            material =>
              material.id === editingMaterial.id
                ? {
                    ...material,
                    ...values,
                  }
                : material
          ),
      }));

      closeMaterialDialog();
      return;
    }

    const selectedMaterialTemplate =
      companyData.materialTemplates.find(
        materialTemplate =>
          materialTemplate.id ===
          values.materialTemplateId
      );

    if (
      !selectedMaterialTemplate ||
      selectedMaterialTemplate.status !==
        "ACTIVE"
    ) {
      return;
    }

    const alreadyExists =
      activityMaterials.some(
        material =>
          material.materialTemplateId ===
          values.materialTemplateId
      );

    if (alreadyExists) {
      return;
    }

    const newMaterial:
      ProjectTemplateActivityMaterial = {
      id: crypto.randomUUID(),
      projectTemplateActivityId,
      ...values,
    };

    setCompanyData(currentData => ({
      ...currentData,

      projectTemplateActivityMaterials: [
        ...currentData.projectTemplateActivityMaterials,
        newMaterial,
      ],
    }));

    closeMaterialDialog();
  }

  function deleteMaterial(materialId: string) {
    setCompanyData(currentData => ({
      ...currentData,

      projectTemplateActivityMaterials:
        currentData.projectTemplateActivityMaterials.filter(
          material =>
            material.id !== materialId
        ),
    }));

    if (editingMaterial?.id === materialId) {
      closeMaterialDialog();
    }
  }

  function getMaterialTemplateById(
    materialTemplateId: string
  ) {
    return companyData.materialTemplates.find(
      materialTemplate =>
        materialTemplate.id ===
        materialTemplateId
    );
  }

  return {
    activityMaterials,
    allMaterialTemplates:
      companyData.materialTemplates,
    availableMaterialTemplates,

    isMaterialDialogOpen,
    editingMaterial,

    openAddMaterialDialog,
    openEditMaterialDialog,
    closeMaterialDialog,

    saveMaterial,
    deleteMaterial,

    getMaterialTemplateById,
  };
}