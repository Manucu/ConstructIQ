import { useState } from "react";

import {
  materials,
  type CompanyMaterial,
} from "@/features/company/data/materials";

import type {
  MaterialEntry,
  WorkingDay,
} from "../types/workingDay";

type UseWorkingDayMaterialsParams = {
  workingDay: WorkingDay;
};

export function useWorkingDayMaterials({
  workingDay,
}: UseWorkingDayMaterialsParams) {
  const [materialEntries, setMaterialEntries] = useState<MaterialEntry[]>(
    workingDay.materials
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);

  const [selectedMaterial, setSelectedMaterial] =
    useState<CompanyMaterial | null>(null);

  const [editingEntry, setEditingEntry] =
    useState<MaterialEntry | null>(null);

  function openSearchDialog() {
    setEditingEntry(null);
    setIsSearchOpen(true);
  }

  function closeSearchDialog() {
    setIsSearchOpen(false);
  }

  function handleSelectMaterial(material: CompanyMaterial) {
    setEditingEntry(null);
    setSelectedMaterial(material);
    setIsSearchOpen(false);
    setIsQuantityOpen(true);
  }

  function closeQuantityDialog() {
    setIsQuantityOpen(false);
    setSelectedMaterial(null);
    setEditingEntry(null);
  }

  function saveMaterial(quantity: number, notes?: string) {
    if (!selectedMaterial) {
      return;
    }

    if (editingEntry) {
      setMaterialEntries((currentEntries) =>
        currentEntries.map((entry) =>
          entry.id === editingEntry.id
            ? {
                ...entry,
                materialId: selectedMaterial.id,
                quantity,
                unit: selectedMaterial.unit,
                notes,
              }
            : entry
        )
      );

      closeQuantityDialog();
      return;
    }

    const newEntry: MaterialEntry = {
      id: crypto.randomUUID(),
      materialId: selectedMaterial.id,
      quantity,
      unit: selectedMaterial.unit,
      notes,
    };

    setMaterialEntries((currentEntries) => [
      ...currentEntries,
      newEntry,
    ]);

    closeQuantityDialog();
  }

  function deleteMaterial(entryId: string) {
    setMaterialEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryId)
    );
  }

  function editMaterial(entry: MaterialEntry) {
    const material = materials.find(
      (item) => item.id === entry.materialId
    );

    if (!material) {
      return;
    }

    setEditingEntry(entry);
    setSelectedMaterial(material);
    setIsQuantityOpen(true);
  }

  return {
    materialEntries,
    selectedMaterial,
    editingEntry,
    isSearchOpen,
    isQuantityOpen,

    openSearchDialog,
    closeSearchDialog,
    closeQuantityDialog,

    handleSelectMaterial,
    saveMaterial,
    deleteMaterial,
    editMaterial,
  };
}