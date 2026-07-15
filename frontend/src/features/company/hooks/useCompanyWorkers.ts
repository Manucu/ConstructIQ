import { useMemo, useState } from "react";

import { useCompanyContext } from "../context/useCompanyContext";

import type {
  Worker,
  WorkerRole,
  WorkerStatus,
} from "../data/workers";

export type SaveWorkerValues = {
  firstName: string;
  lastName: string;
  role: WorkerRole;
  status: WorkerStatus;
  phone?: string;
  internalHourlyRate: number;
};

export function useCompanyWorkers() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const workers = companyData.workers;

  const [searchValue, setSearchValue] = useState("");
  const [isWorkerDialogOpen, setIsWorkerDialogOpen] =
    useState(false);

  const [editingWorker, setEditingWorker] =
    useState<Worker | null>(null);

  const filteredWorkers = useMemo(() => {
    const normalizedSearch = searchValue
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return workers;
    }

    return workers.filter((worker) => {
      const fullName =
        `${worker.firstName} ${worker.lastName}`.toLowerCase();

      return (
        fullName.includes(normalizedSearch) ||
        worker.role.toLowerCase().includes(normalizedSearch) ||
        worker.status.toLowerCase().includes(normalizedSearch) ||
        worker.phone
          ?.toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [searchValue, workers]);

  function openAddWorkerDialog() {
    setEditingWorker(null);
    setIsWorkerDialogOpen(true);
  }

  function openEditWorkerDialog(worker: Worker) {
    setEditingWorker(worker);
    setIsWorkerDialogOpen(true);
  }

  function closeWorkerDialog() {
    setEditingWorker(null);
    setIsWorkerDialogOpen(false);
  }

  function saveWorker(values: SaveWorkerValues) {
    if (editingWorker) {
      setCompanyData((currentData) => ({
        ...currentData,
        workers: currentData.workers.map((worker) =>
          worker.id === editingWorker.id
            ? {
                ...worker,
                ...values,
              }
            : worker
        ),
      }));

      closeWorkerDialog();
      return;
    }

    const newWorker: Worker = {
      id: crypto.randomUUID(),
      ...values,
    };

    setCompanyData((currentData) => ({
      ...currentData,
      workers: [
        ...currentData.workers,
        newWorker,
      ],
    }));

    closeWorkerDialog();
  }

  function toggleWorkerStatus(workerId: string) {
    setCompanyData((currentData) => ({
      ...currentData,
      workers: currentData.workers.map((worker) =>
        worker.id === workerId
          ? {
              ...worker,
              status:
                worker.status === "ACTIVE"
                  ? "INACTIVE"
                  : "ACTIVE",
            }
          : worker
      ),
    }));
  }

  function deleteWorker(workerId: string) {
    setCompanyData((currentData) => ({
      ...currentData,
      workers: currentData.workers.filter(
        (worker) => worker.id !== workerId
      ),
    }));
  }

  return {
    workers,
    filteredWorkers,
    searchValue,
    isWorkerDialogOpen,
    editingWorker,

    setSearchValue,

    openAddWorkerDialog,
    openEditWorkerDialog,
    closeWorkerDialog,

    saveWorker,
    toggleWorkerStatus,
    deleteWorker,
  };
}