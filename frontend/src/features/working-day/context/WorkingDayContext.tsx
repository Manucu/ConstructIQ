import { useEffect, useMemo, useState } from "react";

import type { ReactNode } from "react";

import {
  WorkingDayContext,
  type WorkingDayContextValue,
} from "./workingDayContextDefinition";

import type { WorkingDayDocumentItem } from "../hooks/useWorkingDayDocuments";
import type { WorkingDayPhoto } from "../hooks/useWorkingDayPhotos";

import type {
  ActivityEntry,
  ApprovalStatus,
  EquipmentEntry,
  ExpenseEntry,
  MaterialEntry,
  WorkerEntry,
  WorkingDay,
} from "../types/workingDay";

import { saveWorkingDay } from "@/utils/localStorage";

type WorkingDayProviderProps = {
  initialWorkingDay: WorkingDay;
  children: ReactNode;
};

export function WorkingDayProvider({
  initialWorkingDay,
  children,
}: WorkingDayProviderProps) {
  const [workerEntries, setWorkerEntries] = useState<WorkerEntry[]>(
    initialWorkingDay.attendance
  );

  const [activityEntries, setActivityEntries] = useState<ActivityEntry[]>(
    initialWorkingDay.activities
  );

  const [materialEntries, setMaterialEntries] = useState<MaterialEntry[]>(
    initialWorkingDay.materials
  );

  const [equipmentEntries, setEquipmentEntries] =
    useState<EquipmentEntry[]>(initialWorkingDay.equipment);

  const [expenseEntries, setExpenseEntries] = useState<ExpenseEntry[]>(
    initialWorkingDay.expenses
  );

  const [notes, setNotes] = useState(initialWorkingDay.notes ?? "");

  const [photos, setPhotos] = useState<WorkingDayPhoto[]>([]);

  const [documents, setDocuments] = useState<WorkingDayDocumentItem[]>(
    initialWorkingDay.documents.map((document) => ({
      id: document.id,
      name: document.name,
      url: document.fileUrl,
      category: document.category,
      uploadedBy: document.uploadedBy,
      uploadedAt: document.uploadedAt,
      isLocal: false,
    }))
  );

  const [approvalStatus, setApprovalStatus] =
    useState<ApprovalStatus>(initialWorkingDay.approval.status);

  const isLocked = approvalStatus === "APPROVED";

  const workingDay = useMemo<WorkingDay>(
    () => ({
      ...initialWorkingDay,
      attendance: workerEntries,
      activities: activityEntries,
      materials: materialEntries,
      equipment: equipmentEntries,
      expenses: expenseEntries,
      notes,
      approval: {
        ...initialWorkingDay.approval,
        status: approvalStatus,
      },
    }),
    [
      initialWorkingDay,
      workerEntries,
      activityEntries,
      materialEntries,
      equipmentEntries,
      expenseEntries,
      notes,
      approvalStatus,
    ]
  );

  const value = useMemo<WorkingDayContextValue>(
    () => ({
      workingDay,

      workerEntries,
      setWorkerEntries,

      activityEntries,
      setActivityEntries,

      materialEntries,
      setMaterialEntries,

      equipmentEntries,
      setEquipmentEntries,

      expenseEntries,
      setExpenseEntries,

      notes,
      setNotes,

      photos,
      setPhotos,

      documents,
      setDocuments,

      approvalStatus,
      setApprovalStatus,

      isLocked,
    }),
    [
      workingDay,
      workerEntries,
      activityEntries,
      materialEntries,
      equipmentEntries,
      expenseEntries,
      notes,
      photos,
      documents,
      approvalStatus,
      isLocked,
    ]
  );

  useEffect(() => {
    saveWorkingDay({
      workerEntries,
      activityEntries,
      materialEntries,
      equipmentEntries,
      expenseEntries,
      notes,
      approvalStatus,
    });
  }, [
    workerEntries,
    activityEntries,
    materialEntries,
    equipmentEntries,
    expenseEntries,
    notes,
    approvalStatus,
  ]);

  return (
    <WorkingDayContext.Provider value={value}>
      {children}
    </WorkingDayContext.Provider>
  );
}