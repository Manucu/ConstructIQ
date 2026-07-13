import { useMemo, useState } from "react";

import type { ReactNode } from "react";

import {
  WorkingDayContext,
  type WorkingDayContextValue,
} from "./workingDayContextDefinition";

import type {
  ActivityEntry,
  EquipmentEntry,
  ExpenseEntry,
  MaterialEntry,
  WorkerEntry,
  WorkingDay,
} from "../types/workingDay";

import type { WorkingDayPhoto } from "../hooks/useWorkingDayPhotos";

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

  const [activityEntries, setActivityEntries] =
    useState<ActivityEntry[]>(
      initialWorkingDay.activities
    );

  const [materialEntries, setMaterialEntries] =
    useState<MaterialEntry[]>(
      initialWorkingDay.materials
    );

  const [equipmentEntries, setEquipmentEntries] =
    useState<EquipmentEntry[]>(
      initialWorkingDay.equipment
    );

  const [expenseEntries, setExpenseEntries] =
    useState<ExpenseEntry[]>(
      initialWorkingDay.expenses
    );

  const [notes, setNotes] = useState(
    initialWorkingDay.notes ?? ""
  );

  const [photos, setPhotos] =
    useState<WorkingDayPhoto[]>([]);

  const workingDay = useMemo<WorkingDay>(
    () => ({
      ...initialWorkingDay,
      attendance: workerEntries,
      activities: activityEntries,
      materials: materialEntries,
      equipment: equipmentEntries,
      expenses: expenseEntries,
      notes,
    }),
    [
      initialWorkingDay,
      workerEntries,
      activityEntries,
      materialEntries,
      equipmentEntries,
      expenseEntries,
      notes,
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
    ]
  );

  return (
    <WorkingDayContext.Provider value={value}>
      {children}
    </WorkingDayContext.Provider>
  );
}