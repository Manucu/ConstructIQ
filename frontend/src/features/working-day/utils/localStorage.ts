import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
} from "@/utils/storage";

import type {
  ActivityEntry,
  ApprovalStatus,
  EquipmentEntry,
  ExpenseEntry,
  MaterialEntry,
  WorkerEntry,
} from "../types/workingDay";

const WORKING_DAY_STORAGE_KEY = "constructiq-working-day";

export type WorkingDayStorage = {
  workerEntries: WorkerEntry[];
  activityEntries: ActivityEntry[];
  materialEntries: MaterialEntry[];
  equipmentEntries: EquipmentEntry[];
  expenseEntries: ExpenseEntry[];
  notes: string;
  approvalStatus: ApprovalStatus;
};

export function saveWorkingDay(data: WorkingDayStorage) {
  saveToStorage(WORKING_DAY_STORAGE_KEY, data);
}

export function loadWorkingDay() {
  return loadFromStorage<WorkingDayStorage>(
    WORKING_DAY_STORAGE_KEY
  );
}

export function clearWorkingDay() {
  removeFromStorage(WORKING_DAY_STORAGE_KEY);
}