import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type {
  Worker,
  WorkerRole,
  WorkerStatus,
} from "../../data/workers";

import type { SaveWorkerValues } from "../../hooks/useCompanyWorkers";

type WorkerFormDialogProps = {
  open: boolean;
  editingWorker: Worker | null;
  onClose: () => void;
  onSave: (values: SaveWorkerValues) => void;
};

const workerRoles: WorkerRole[] = [
  "Site Engineer",
  "Foreman",
  "Mason",
  "Steel Fixer",
  "Carpenter",
  "Electrician",
  "Plumber",
  "Painter",
  "Equipment Operator",
  "General Laborer",
];

export default function WorkerFormDialog({
  open,
  editingWorker,
  onClose,
  onSave,
}: WorkerFormDialogProps) {
  const [firstName, setFirstName] = useState(
    editingWorker?.firstName ?? ""
  );

  const [lastName, setLastName] = useState(
    editingWorker?.lastName ?? ""
  );

  const [role, setRole] = useState<WorkerRole>(
    editingWorker?.role ?? "General Laborer"
  );

  const [status, setStatus] = useState<WorkerStatus>(
    editingWorker?.status ?? "ACTIVE"
  );

  const [phone, setPhone] = useState(
    editingWorker?.phone ?? ""
  );

  const [internalHourlyRate, setInternalHourlyRate] = useState(
    editingWorker
      ? String(editingWorker.internalHourlyRate)
      : ""
  );

  const parsedHourlyRate = Number(internalHourlyRate);

  const isValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    internalHourlyRate.trim() !== "" &&
    Number.isFinite(parsedHourlyRate) &&
    parsedHourlyRate >= 0;

  function resetForm() {
    setFirstName("");
    setLastName("");
    setRole("General Laborer");
    setStatus("ACTIVE");
    setPhone("");
    setInternalHourlyRate("");
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
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role,
      status,
      phone: phone.trim() || undefined,
      internalHourlyRate: parsedHourlyRate,
    });

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={editingWorker ? "Edit Worker" : "Add Worker"}
      description={
        editingWorker
          ? `Update ${editingWorker.firstName} ${editingWorker.lastName}.`
          : "Add a new worker to the company workforce."
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
            {editingWorker ? "Save Changes" : "Add Worker"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <AppInput
            label="First Name"
            value={firstName}
            placeholder="Example: Gheorghe"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />

          <AppInput
            label="Last Name"
            value={lastName}
            placeholder="Example: Mihai"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Role
          </label>

          <select
            value={role}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) => {
              setRole(event.target.value as WorkerRole);
            }}
          >
            {workerRoles.map((workerRole) => (
              <option key={workerRole} value={workerRole}>
                {workerRole}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) => {
              setStatus(event.target.value as WorkerStatus);
            }}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <AppInput
          label="Phone"
          type="tel"
          value={phone}
          placeholder="+40 700 000 000"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />

        <AppInput
          label="Internal Hourly Rate"
          type="number"
          min="0"
          step="0.01"
          value={internalHourlyRate}
          placeholder="Enter hourly rate"
          onChange={(event) => {
            setInternalHourlyRate(event.target.value);
          }}
        />

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-900">
            The internal hourly rate is confidential and should only be
            visible to the Owner and authorized financial roles.
          </p>
        </div>
      </div>
    </AppModal>
  );
}