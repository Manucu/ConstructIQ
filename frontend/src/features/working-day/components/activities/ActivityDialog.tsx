import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type { ActivityTemplate } from "@/features/company/data/activityTemplates";

import type {
  ActivityEntry,
  ActivityStatus,
} from "../../types/workingDay";

type SaveActivityParams = {
  workersAssigned: number;
  hoursWorked: number;
  progressPercentage?: number;
  status: ActivityStatus;
  notes?: string;
};

type ActivityDialogProps = {
  open: boolean;
  activity: ActivityTemplate | null;
  editingEntry?: ActivityEntry | null;
  onClose: () => void;
  onSave: (values: SaveActivityParams) => void;
};

export default function ActivityDialog({
  open,
  activity,
  editingEntry,
  onClose,
  onSave,
}: ActivityDialogProps) {
  const [workersAssigned, setWorkersAssigned] = useState(
    editingEntry ? String(editingEntry.workersAssigned) : ""
  );

  const [hoursWorked, setHoursWorked] = useState(
    editingEntry ? String(editingEntry.hoursWorked) : ""
  );

  const [progressPercentage, setProgressPercentage] = useState(
    editingEntry?.progressPercentage !== undefined
      ? String(editingEntry.progressPercentage)
      : ""
  );

  const [status, setStatus] = useState<ActivityStatus>(
    editingEntry?.status ?? "PLANNED"
  );

  const [notes, setNotes] = useState(
    editingEntry?.notes ?? ""
  );

  const parsedWorkersAssigned = Number(workersAssigned);
  const parsedHoursWorked = Number(hoursWorked);
  const parsedProgressPercentage =
    progressPercentage.trim() === ""
      ? undefined
      : Number(progressPercentage);

  const isWorkersValid =
    workersAssigned.trim() !== "" &&
    Number.isInteger(parsedWorkersAssigned) &&
    parsedWorkersAssigned > 0;

  const isHoursValid =
    hoursWorked.trim() !== "" &&
    Number.isFinite(parsedHoursWorked) &&
    parsedHoursWorked >= 0;

  const isProgressValid =
    parsedProgressPercentage === undefined ||
    (Number.isFinite(parsedProgressPercentage) &&
      parsedProgressPercentage >= 0 &&
      parsedProgressPercentage <= 100);

  const isValid =
    activity !== null &&
    isWorkersValid &&
    isHoursValid &&
    isProgressValid;

  function resetForm() {
    setWorkersAssigned("");
    setHoursWorked("");
    setProgressPercentage("");
    setStatus("PLANNED");
    setNotes("");
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleSave() {
    if (!isValid) {
      return;
    }

    onSave({
      workersAssigned: parsedWorkersAssigned,
      hoursWorked: parsedHoursWorked,
      progressPercentage: parsedProgressPercentage,
      status,
      notes: notes.trim() || undefined,
    });

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={editingEntry ? "Edit Activity" : "Add Activity"}
      description={
        activity
          ? `${activity.name} • ${activity.category}`
          : "No activity selected."
      }
      onClose={handleClose}
      footer={
        <>
          <AppButton
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </AppButton>

          <AppButton
            type="button"
            disabled={!isValid}
            onClick={handleSave}
          >
            {editingEntry ? "Save Changes" : "Save Activity"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <div className="rounded-xl border bg-slate-50 p-4">
          <p className="font-medium">
            {activity?.name ?? "No activity selected"}
          </p>

          {activity && (
            <>
              <p className="mt-1 text-sm text-muted-foreground">
                {activity.category}
              </p>

              {activity.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {activity.description}
                </p>
              )}
            </>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AppInput
            label="Workers Assigned"
            type="number"
            min="1"
            step="1"
            value={workersAssigned}
            placeholder="Enter workers"
            onChange={(event) => {
              setWorkersAssigned(event.target.value);
            }}
          />

          <AppInput
            label="Hours Worked"
            type="number"
            min="0"
            step="0.5"
            value={hoursWorked}
            placeholder="Enter hours"
            onChange={(event) => {
              setHoursWorked(event.target.value);
            }}
          />
        </div>

        <AppInput
          label="Progress Percentage"
          type="number"
          min="0"
          max="100"
          step="1"
          value={progressPercentage}
          placeholder="0 - 100"
          onChange={(event) => {
            setProgressPercentage(event.target.value);
          }}
        />

        <div>
          <label className="text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) => {
              setStatus(event.target.value as ActivityStatus);
            }}
          >
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="BLOCKED">Blocked</option>
          </select>
        </div>

        <AppInput
          label="Notes"
          value={notes}
          placeholder="Optional notes"
          onChange={(event) => {
            setNotes(event.target.value);
          }}
        />
      </div>
    </AppModal>
  );
}