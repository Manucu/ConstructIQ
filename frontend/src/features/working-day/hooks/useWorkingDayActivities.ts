import { useState } from "react";

import { useCompanyContext } from "@/features/company/context/useCompanyContext";
import type { ActivityTemplate } from "@/features/templates/data/activityTemplates";

import { useWorkingDayContext } from "../context/useWorkingDayContext";

import type {
  ActivityEntry,
  ActivityStatus,
} from "../types/workingDay";

type SaveActivityParams = {
  workersAssigned: number;
  hoursWorked: number;
  progressPercentage?: number;
  status: ActivityStatus;
  notes?: string;
};

export function useWorkingDayActivities() {
  const { companyData } = useCompanyContext();

  const activityTemplates = companyData.activityTemplates;

  const {
    activityEntries,
    setActivityEntries,
  } = useWorkingDayContext();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isActivityDialogOpen, setIsActivityDialogOpen] =
    useState(false);

  const [selectedActivity, setSelectedActivity] =
    useState<ActivityTemplate | null>(null);

  const [editingEntry, setEditingEntry] =
    useState<ActivityEntry | null>(null);

  function openSearchDialog() {
    setEditingEntry(null);
    setSelectedActivity(null);
    setIsSearchOpen(true);
  }

  function closeSearchDialog() {
    setIsSearchOpen(false);
  }

  function handleSelectActivity(
    activity: ActivityTemplate
  ) {
    setEditingEntry(null);
    setSelectedActivity(activity);
    setIsSearchOpen(false);
    setIsActivityDialogOpen(true);
  }

  function closeActivityDialog() {
    setIsActivityDialogOpen(false);
    setSelectedActivity(null);
    setEditingEntry(null);
  }

  function saveActivity({
    workersAssigned,
    hoursWorked,
    progressPercentage,
    status,
    notes,
  }: SaveActivityParams) {
    if (!selectedActivity) {
      return;
    }

    if (editingEntry) {
      setActivityEntries((currentEntries) =>
        currentEntries.map((entry) =>
          entry.id === editingEntry.id
            ? {
                ...entry,
                activityTemplateId:
                  selectedActivity.id,
                workersAssigned,
                hoursWorked,
                progressPercentage,
                status,
                notes,
              }
            : entry
        )
      );

      closeActivityDialog();
      return;
    }

    const alreadyAdded = activityEntries.some(
      (entry) =>
        entry.activityTemplateId ===
        selectedActivity.id
    );

    if (alreadyAdded) {
      closeActivityDialog();
      return;
    }

    const newEntry: ActivityEntry = {
      id: crypto.randomUUID(),
      activityTemplateId: selectedActivity.id,
      workersAssigned,
      hoursWorked,
      progressPercentage,
      status,
      notes,
    };

    setActivityEntries((currentEntries) => [
      ...currentEntries,
      newEntry,
    ]);

    closeActivityDialog();
  }

  function deleteActivity(entryId: string) {
    setActivityEntries((currentEntries) =>
      currentEntries.filter(
        (entry) => entry.id !== entryId
      )
    );
  }

  function editActivity(entry: ActivityEntry) {
    const activity = activityTemplates.find(
      (item) =>
        item.id === entry.activityTemplateId
    );

    if (!activity) {
      return;
    }

    setEditingEntry(entry);
    setSelectedActivity(activity);
    setIsActivityDialogOpen(true);
  }

  return {
    activityTemplates,
    activityEntries,
    selectedActivity,
    editingEntry,

    isSearchOpen,
    isActivityDialogOpen,

    openSearchDialog,
    closeSearchDialog,
    closeActivityDialog,

    handleSelectActivity,
    saveActivity,
    deleteActivity,
    editActivity,
  };
}