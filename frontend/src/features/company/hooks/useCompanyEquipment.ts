import { useMemo, useState } from "react";

import { useCompanyContext } from "../context/useCompanyContext";

import type {
  Equipment,
  EquipmentCategory,
  EquipmentStatus,
} from "../data/equipment";

export type SaveEquipmentValues = {
  name: string;
  category: EquipmentCategory;
  status: EquipmentStatus;
  internalHourlyRate?: number;
};

export function useCompanyEquipment() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const equipment = companyData.equipment;

  const [searchValue, setSearchValue] = useState("");
  const [isEquipmentDialogOpen, setIsEquipmentDialogOpen] =
    useState(false);

  const [editingEquipment, setEditingEquipment] =
    useState<Equipment | null>(null);

  const filteredEquipment = useMemo(() => {
    const normalizedSearch = searchValue
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return equipment;
    }

    return equipment.filter((item) => {
      return (
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.category.toLowerCase().includes(normalizedSearch) ||
        item.status.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [equipment, searchValue]);

  function openAddEquipmentDialog() {
    setEditingEquipment(null);
    setIsEquipmentDialogOpen(true);
  }

  function openEditEquipmentDialog(item: Equipment) {
    setEditingEquipment(item);
    setIsEquipmentDialogOpen(true);
  }

  function closeEquipmentDialog() {
    setEditingEquipment(null);
    setIsEquipmentDialogOpen(false);
  }

  function saveEquipment(values: SaveEquipmentValues) {
    if (editingEquipment) {
      setCompanyData((currentData) => ({
        ...currentData,
        equipment: currentData.equipment.map((item) =>
          item.id === editingEquipment.id
            ? {
                ...item,
                ...values,
              }
            : item
        ),
      }));

      closeEquipmentDialog();
      return;
    }

    const newEquipment: Equipment = {
      id: crypto.randomUUID(),
      ...values,
    };

    setCompanyData((currentData) => ({
      ...currentData,
      equipment: [
        ...currentData.equipment,
        newEquipment,
      ],
    }));

    closeEquipmentDialog();
  }

  function toggleEquipmentStatus(equipmentId: string) {
    setCompanyData((currentData) => ({
      ...currentData,
      equipment: currentData.equipment.map((item) =>
        item.id === equipmentId
          ? {
              ...item,
              status:
                item.status === "ACTIVE"
                  ? "INACTIVE"
                  : "ACTIVE",
            }
          : item
      ),
    }));
  }

  function deleteEquipment(equipmentId: string) {
    setCompanyData((currentData) => ({
      ...currentData,
      equipment: currentData.equipment.filter(
        (item) => item.id !== equipmentId
      ),
    }));
  }

  return {
    equipment,
    filteredEquipment,
    searchValue,
    isEquipmentDialogOpen,
    editingEquipment,

    setSearchValue,

    openAddEquipmentDialog,
    openEditEquipmentDialog,
    closeEquipmentDialog,

    saveEquipment,
    toggleEquipmentStatus,
    deleteEquipment,
  };
}