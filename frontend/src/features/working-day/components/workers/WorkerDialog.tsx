import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import { activityTemplates } from "@/features/templates/data/activityTemplates";
import type { Worker } from "@/features/company/data/workers";

import type { WorkerEntry } from "../../types/workingDay";

type WorkerDialogProps = {
  open: boolean;
  worker: Worker | null;
  editingEntry?: WorkerEntry | null;
  onClose: () => void;
  onSave: (
    present: boolean,
    hoursWorked: number,
    overtimeHours: number,
    startTime?: string,
    endTime?: string,
    activityTemplateId?: string,
    notes?: string
  ) => void;
};

export default function WorkerDialog({
  open,
  worker,
  editingEntry,
  onClose,
  onSave,
}: WorkerDialogProps) {
  const [present, setPresent] = useState(
    editingEntry?.present ?? true
  );

  const [hoursWorked, setHoursWorked] = useState(
    editingEntry ? String(editingEntry.hoursWorked) : ""
  );

  const [overtimeHours, setOvertimeHours] = useState(
    editingEntry ? String(editingEntry.overtimeHours ?? 0) : "0"
  );

  const [startTime, setStartTime] = useState(
    editingEntry?.startTime ?? ""
  );

  const [endTime, setEndTime] = useState(
    editingEntry?.endTime ?? ""
  );

  const [activityTemplateId, setActivityTemplateId] = useState(
    editingEntry?.activityTemplateId ?? ""
  );

  const [notes, setNotes] = useState(
    editingEntry?.notes ?? ""
  );

  const parsedHoursWorked = Number(hoursWorked);
  const parsedOvertimeHours = Number(overtimeHours);

  const isValid =
    worker !== null &&
    Number.isFinite(parsedHoursWorked) &&
    parsedHoursWorked >= 0 &&
    Number.isFinite(parsedOvertimeHours) &&
    parsedOvertimeHours >= 0;

  function resetForm() {
    setPresent(true);
    setHoursWorked("");
    setOvertimeHours("0");
    setStartTime("");
    setEndTime("");
    setActivityTemplateId("");
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

    onSave(
      present,
      parsedHoursWorked,
      parsedOvertimeHours,
      startTime.trim() || undefined,
      endTime.trim() || undefined,
      activityTemplateId || undefined,
      notes.trim() || undefined
    );

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={editingEntry ? "Edit Worker" : "Add Worker"}
      description={
        worker
          ? `${worker.firstName} ${worker.lastName} • ${worker.role}`
          : "No worker selected."
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
            {editingEntry ? "Save Changes" : "Save Worker"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <div className="rounded-xl border bg-slate-50 p-4">
          <p className="font-medium">
            {worker
              ? `${worker.firstName} ${worker.lastName}`
              : "No worker selected"}
          </p>

          {worker && (
            <p className="mt-1 text-sm text-muted-foreground">
              {worker.role}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Attendance status
          </label>

          <select
            value={present ? "PRESENT" : "ABSENT"}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) => {
              setPresent(event.target.value === "PRESENT");
            }}
          >
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AppInput
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(event) => {
              setStartTime(event.target.value);
            }}
          />

          <AppInput
            label="End Time"
            type="time"
            value={endTime}
            onChange={(event) => {
              setEndTime(event.target.value);
            }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
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

          <AppInput
            label="Overtime Hours"
            type="number"
            min="0"
            step="0.5"
            value={overtimeHours}
            placeholder="Enter overtime"
            onChange={(event) => {
              setOvertimeHours(event.target.value);
            }}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Assigned Activity
          </label>

          <select
            value={activityTemplateId}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) => {
              setActivityTemplateId(event.target.value);
            }}
          >
            <option value="">No activity assigned</option>

            {activityTemplates
              .filter((activity) => activity.status === "ACTIVE")
              .map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
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