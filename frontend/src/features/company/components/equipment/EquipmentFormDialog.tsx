import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type {
  Equipment,
  EquipmentCategory,
  EquipmentStatus,
} from "../../data/equipment";

import type { SaveEquipmentValues } from "../../hooks/useCompanyEquipment";

type EquipmentFormDialogProps = {
  open: boolean;
  editingEquipment: Equipment | null;
  onClose: () => void;
  onSave: (values: SaveEquipmentValues) => void;
};

const equipmentCategories: EquipmentCategory[] = [
  "Excavation",
  "Lifting",
  "Concrete",
  "Transport",
  "Power",
  "Tools",
  "Other",
];

export default function EquipmentFormDialog({
  open,
  editingEquipment,
  onClose,
  onSave,
}: EquipmentFormDialogProps) {
  const [name, setName] = useState(
    editingEquipment?.name ?? ""
  );

  const [category, setCategory] =
    useState<EquipmentCategory>(
      editingEquipment?.category ?? "Other"
    );

  const [status, setStatus] =
    useState<EquipmentStatus>(
      editingEquipment?.status ?? "ACTIVE"
    );

  const [internalHourlyRate, setInternalHourlyRate] =
    useState(
      editingEquipment?.internalHourlyRate !== undefined
        ? String(editingEquipment.internalHourlyRate)
        : ""
    );

  const parsedHourlyRate =
    internalHourlyRate.trim() === ""
      ? undefined
      : Number(internalHourlyRate);

  const isHourlyRateValid =
    parsedHourlyRate === undefined ||
    (Number.isFinite(parsedHourlyRate) &&
      parsedHourlyRate >= 0);

  const isValid =
    name.trim() !== "" &&
    isHourlyRateValid;

  function resetForm() {
    setName("");
    setCategory("Other");
    setStatus("ACTIVE");
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
      name: name.trim(),
      category,
      status,
      internalHourlyRate: parsedHourlyRate,
    });

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={
        editingEquipment
          ? "Edit Equipment"
          : "Add Equipment"
      }
      description={
        editingEquipment
          ? `Update ${editingEquipment.name}.`
          : "Add new equipment to the company catalog."
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
            {editingEquipment
              ? "Save Changes"
              : "Add Equipment"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <AppInput
          label="Equipment Name"
          value={name}
          placeholder="Example: Excavator CAT 320"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <div>
          <label className="text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            value={category}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) => {
              setCategory(
                event.target.value as EquipmentCategory
              );
            }}
          >
            {equipmentCategories.map(
              (equipmentCategory) => (
                <option
                  key={equipmentCategory}
                  value={equipmentCategory}
                >
                  {equipmentCategory}
                </option>
              )
            )}
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
              setStatus(
                event.target.value as EquipmentStatus
              );
            }}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <AppInput
          label="Internal Hourly Rate"
          type="number"
          min="0"
          step="0.01"
          value={internalHourlyRate}
          placeholder="Example: 45"
          onChange={(event) => {
            setInternalHourlyRate(
              event.target.value
            );
          }}
        />

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-900">
            The internal hourly rate is confidential and should only
            be visible to the Owner and authorized financial roles.
          </p>
        </div>
      </div>
    </AppModal>
  );
}