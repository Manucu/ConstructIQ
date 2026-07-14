import type {
  ActivityEntry,
  ApprovalStatus,
  EquipmentEntry,
  ExpenseEntry,
  MaterialEntry,
  WorkerEntry,
} from "@/features/working-day/types/workingDay";

const STORAGE_KEY = "working-day";

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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Could not save the working day:", error);
  }
}

export function loadWorkingDay(): WorkingDayStorage | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as WorkingDayStorage;
  } catch (error) {
    console.error("Could not load the working day:", error);
    return null;
  }
}

export function clearWorkingDay() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Could not clear the working day:", error);
  }
}