import { createContext } from "react";

import type {
  Dispatch,
  SetStateAction,
} from "react";

import type {
  ActivityEntry,
  EquipmentEntry,
  ExpenseEntry,
  MaterialEntry,
  WorkerEntry,
  WorkingDay,
  ApprovalStatus,
} from "../types/workingDay";

import type { WorkingDayPhoto } from "../hooks/useWorkingDayPhotos";
import type { WorkingDayDocumentItem } from "../hooks/useWorkingDayDocuments";

export type WorkingDayContextValue = {
  workingDay: WorkingDay;

  workerEntries: WorkerEntry[];
  setWorkerEntries: Dispatch<SetStateAction<WorkerEntry[]>>;

  activityEntries: ActivityEntry[];
  setActivityEntries: Dispatch<
    SetStateAction<ActivityEntry[]>
  >;

  materialEntries: MaterialEntry[];
  setMaterialEntries: Dispatch<
    SetStateAction<MaterialEntry[]>
  >;

  equipmentEntries: EquipmentEntry[];
  setEquipmentEntries: Dispatch<
    SetStateAction<EquipmentEntry[]>
  >;

  expenseEntries: ExpenseEntry[];
  setExpenseEntries: Dispatch<
    SetStateAction<ExpenseEntry[]>
  >;

  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;

  photos: WorkingDayPhoto[];
  setPhotos: Dispatch<SetStateAction<WorkingDayPhoto[]>>;

  documents: WorkingDayDocumentItem[];
  setDocuments: Dispatch<
    SetStateAction<WorkingDayDocumentItem[]>>;

  approvalStatus: ApprovalStatus;
  setApprovalStatus: Dispatch<SetStateAction<ApprovalStatus>>;  

  isLocked: boolean;
};

export const WorkingDayContext =
  createContext<WorkingDayContextValue | null>(null);