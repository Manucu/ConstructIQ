import { useEffect, useMemo, useState } from "react";

import type { ReactNode } from "react";

import {
  WorkingDayContext,
  type WorkingDayContextValue,
} from "./workingDayContextDefinition";

import type { WorkingDayDocumentItem } from "../hooks/useWorkingDayDocuments";
import type { WorkingDayPhoto } from "../hooks/useWorkingDayPhotos";

import {
  loadWorkingDay,
  saveWorkingDay,
} from "@/utils/localStorage";

import type {
  ActivityEntry,
  ApprovalStatus,
  EquipmentEntry,
  ExpenseEntry,
  MaterialEntry,
  WorkerEntry,
  WorkingDay,
} from "../types/workingDay";

type WorkingDayProviderProps = {
  initialWorkingDay: WorkingDay;
  children: ReactNode;
};

export function WorkingDayProvider({
  initialWorkingDay,
  children,
}: WorkingDayProviderProps) {
  const storedData = useMemo(() => loadWorkingDay(), []);

  const [workerEntries, setWorkerEntries] = useState<WorkerEntry[]>(
    () => storedData?.workerEntries ?? initialWorkingDay.attendance
  );

  const [activityEntries, setActivityEntries] = useState<ActivityEntry[]>(
    () => storedData?.activityEntries ?? initialWorkingDay.activities
  );

  const [materialEntries, setMaterialEntries] = useState<MaterialEntry[]>(
    () => storedData?.materialEntries ?? initialWorkingDay.materials
  );

  const [equipmentEntries, setEquipmentEntries] =
    useState<EquipmentEntry[]>(
      () => storedData?.equipmentEntries ?? initialWorkingDay.equipment
    );

  const [expenseEntries, setExpenseEntries] = useState<ExpenseEntry[]>(
    () => storedData?.expenseEntries ?? initialWorkingDay.expenses
  );

  const [notes, setNotes] = useState(
    () => storedData?.notes ?? initialWorkingDay.notes ?? ""
  );

  const [photos, setPhotos] = useState<WorkingDayPhoto[]>([]);

  const [documents, setDocuments] = useState<WorkingDayDocumentItem[]>(
    () =>
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
    useState<ApprovalStatus>(
      () =>
        storedData?.approvalStatus ??
        initialWorkingDay.approval.status
    );

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