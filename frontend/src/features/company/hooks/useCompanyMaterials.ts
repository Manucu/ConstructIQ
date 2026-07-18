import { useMemo, useState } from "react";

import { useCompanyContext } from "../context/useCompanyContext";

import type {
  CompanyMaterial,
  CompanyMaterialStatus,
} from "../data/materials";

import type {
  MaterialCategory,
  UnitOfMeasure,
} from "../../templates/data/materialTemplates";

export type SaveMaterialValues = {
  code: string;
  name: string;
  category: MaterialCategory;
  unit: UnitOfMeasure;
  status: CompanyMaterialStatus;
  estimatedUnitCost?: number;
  templateId?: string;
  fromTemplate: boolean;
};

export function useCompanyMaterials() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const materials = companyData.materials;

  const [searchValue, setSearchValue] = useState("");
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] =
    useState(false);

  const [editingMaterial, setEditingMaterial] =
    useState<CompanyMaterial | null>(null);

  const filteredMaterials = useMemo(() => {
    const normalizedSearch = searchValue
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return materials;
    }

    return materials.filter((material) => {
      return (
        material.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        material.code
          .toLowerCase()
          .includes(normalizedSearch) ||
        material.category
          .toLowerCase()
          .includes(normalizedSearch) ||
        material.unit
          .toLowerCase()
          .includes(normalizedSearch) ||
        material.status
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [materials, searchValue]);

  function openAddMaterialDialog() {
    setEditingMaterial(null);
    setIsMaterialDialogOpen(true);
  }

  function openEditMaterialDialog(
    material: CompanyMaterial
  ) {
    setEditingMaterial(material);
    setIsMaterialDialogOpen(true);
  }

  function closeMaterialDialog() {
    setEditingMaterial(null);
    setIsMaterialDialogOpen(false);
  }

  function saveMaterial(values: SaveMaterialValues) {
    if (editingMaterial) {
      setCompanyData((currentData) => ({
        ...currentData,
        materials: currentData.materials.map(
          (material) =>
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

    const newMaterial: CompanyMaterial = {
      id: crypto.randomUUID(),
      ...values,
    };

    setCompanyData((currentData) => ({
      ...currentData,
      materials: [
        ...currentData.materials,
        newMaterial,
      ],
    }));

    closeMaterialDialog();
  }

  function toggleMaterialStatus(
    materialId: string
  ) {
    setCompanyData((currentData) => ({
      ...currentData,
      materials: currentData.materials.map(
        (material) =>
          material.id === materialId
            ? {
                ...material,
                status:
                  material.status === "ACTIVE"
                    ? "INACTIVE"
                    : "ACTIVE",
              }
            : material
      ),
    }));
  }

  function deleteMaterial(materialId: string) {
    setCompanyData((currentData) => ({
      ...currentData,
      materials: currentData.materials.filter(
        (material) =>
          material.id !== materialId
      ),
    }));
  }

  return {
    materials,
    filteredMaterials,
    searchValue,
    isMaterialDialogOpen,
    editingMaterial,

    setSearchValue,

    openAddMaterialDialog,
    openEditMaterialDialog,
    closeMaterialDialog,

    saveMaterial,
    toggleMaterialStatus,
    deleteMaterial,
  };
}