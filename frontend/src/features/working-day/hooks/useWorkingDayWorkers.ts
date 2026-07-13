import { useState } from "react";

import {
  workers,
  type Worker,
} from "@/features/company/data/workers";

import { useWorkingDayContext } from "../context/useWorkingDayContext";

import type { WorkerEntry } from "../types/workingDay";

export function useWorkingDayWorkers() {
  const {
    workerEntries,
    setWorkerEntries,
  } = useWorkingDayContext();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWorkerDialogOpen, setIsWorkerDialogOpen] = useState(false);

  const [selectedWorker, setSelectedWorker] =
    useState<Worker | null>(null);

  const [editingEntry, setEditingEntry] =
    useState<WorkerEntry | null>(null);

  function openSearchDialog() {
    setEditingEntry(null);
    setSelectedWorker(null);
    setIsSearchOpen(true);
  }

  function closeSearchDialog() {
    setIsSearchOpen(false);
  }

  function handleSelectWorker(worker: Worker) {
    setEditingEntry(null);
    setSelectedWorker(worker);
    setIsSearchOpen(false);
    setIsWorkerDialogOpen(true);
  }

  function closeWorkerDialog() {
    setIsWorkerDialogOpen(false);
    setSelectedWorker(null);
    setEditingEntry(null);
  }

  function saveWorker(
    present: boolean,
    hoursWorked: number,
    overtimeHours: number,
    startTime?: string,
    endTime?: string,
    activityTemplateId?: string,
    notes?: string
  ) {
    if (!selectedWorker) {
      return;
    }

    if (editingEntry) {
      setWorkerEntries((currentEntries) =>
        currentEntries.map((entry) =>
          entry.id === editingEntry.id
            ? {
                ...entry,
                workerId: selectedWorker.id,
                present,
                hoursWorked,
                overtimeHours,
                startTime,
                endTime,
                activityTemplateId,
                notes,
              }
            : entry
        )
      );

      closeWorkerDialog();
      return;
    }

    const alreadyAdded = workerEntries.some(
      (entry) => entry.workerId === selectedWorker.id
    );

    if (alreadyAdded) {
      closeWorkerDialog();
      return;
    }

    const newEntry: WorkerEntry = {
      id: crypto.randomUUID(),
      workerId: selectedWorker.id,
      present,
      hoursWorked,
      overtimeHours,
      startTime,
      endTime,
      activityTemplateId,
      notes,
    };

    setWorkerEntries((currentEntries) => [
      ...currentEntries,
      newEntry,
    ]);

    closeWorkerDialog();
  }

  function deleteWorker(entryId: string) {
    setWorkerEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryId)
    );
  }

  function editWorker(entry: WorkerEntry) {
    const worker = workers.find(
      (item) => item.id === entry.workerId
    );

    if (!worker) {
      return;
    }

    setEditingEntry(entry);
    setSelectedWorker(worker);
    setIsWorkerDialogOpen(true);
  }

  return {
    workerEntries,
    selectedWorker,
    editingEntry,

    isSearchOpen,
    isWorkerDialogOpen,

    openSearchDialog,
    closeSearchDialog,
    closeWorkerDialog,

    handleSelectWorker,
    saveWorker,
    deleteWorker,
    editWorker,
  };
}