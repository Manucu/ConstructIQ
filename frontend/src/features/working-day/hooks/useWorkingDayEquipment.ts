import { useState } from "react";

import {
  equipment,
  type Equipment,
} from "@/features/company/data/equipment";

import type {
  EquipmentEntry,
  WorkingDay,
} from "../types/workingDay";

type UseWorkingDayEquipmentParams = {
  workingDay: WorkingDay;
};

export function useWorkingDayEquipment({
  workingDay,
}: UseWorkingDayEquipmentParams) {
  const [equipmentEntries, setEquipmentEntries] = useState<EquipmentEntry[]>(
    workingDay.equipment
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHoursOpen, setIsHoursOpen] = useState(false);

  const [selectedEquipment, setSelectedEquipment] =
    useState<Equipment | null>(null);

  const [editingEntry, setEditingEntry] =
    useState<EquipmentEntry | null>(null);

  function openSearchDialog() {
    setEditingEntry(null);
    setIsSearchOpen(true);
  }

  function closeSearchDialog() {
    setIsSearchOpen(false);
  }

  function handleSelectEquipment(item: Equipment) {
    setEditingEntry(null);
    setSelectedEquipment(item);
    setIsSearchOpen(false);
    setIsHoursOpen(true);
  }

  function closeHoursDialog() {
    setIsHoursOpen(false);
    setSelectedEquipment(null);
    setEditingEntry(null);
  }

  function saveEquipment(hoursUsed: number, notes?: string) {
    if (!selectedEquipment) {
      return;
    }

    if (editingEntry) {
      setEquipmentEntries((currentEntries) =>
        currentEntries.map((entry) =>
          entry.id === editingEntry.id
            ? {
                ...entry,
                equipmentId: selectedEquipment.id,
                hoursUsed,
                notes,
              }
            : entry
        )
      );

      closeHoursDialog();
      return;
    }

    const newEntry: EquipmentEntry = {
      id: crypto.randomUUID(),
      equipmentId: selectedEquipment.id,
      hoursUsed,
      notes,
    };

    setEquipmentEntries((currentEntries) => [
      ...currentEntries,
      newEntry,
    ]);

    closeHoursDialog();
  }

  function deleteEquipment(entryId: string) {
    setEquipmentEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryId)
    );
  }

  function editEquipment(entry: EquipmentEntry) {
    const item = equipment.find(
      (equipmentItem) => equipmentItem.id === entry.equipmentId
    );

    if (!item) {
      return;
    }

    setEditingEntry(entry);
    setSelectedEquipment(item);
    setIsHoursOpen(true);
  }

  return {
    equipmentEntries,
    selectedEquipment,
    editingEntry,
    isSearchOpen,
    isHoursOpen,

    openSearchDialog,
    closeSearchDialog,
    closeHoursDialog,

    handleSelectEquipment,
    saveEquipment,
    deleteEquipment,
    editEquipment,
  };
}