import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type { Equipment } from "@/features/company/data/equipment";

type EquipmentHoursDialogProps = {
  open: boolean;
  equipment: Equipment | null;
  onClose: () => void;
  onSave: (hoursUsed: number, notes?: string) => void;
};

export default function EquipmentHoursDialog({
  open,
  equipment,
  onClose,
  onSave,
}: EquipmentHoursDialogProps) {
  const [hoursUsed, setHoursUsed] = useState("");
  const [notes, setNotes] = useState("");

  const parsedHours = Number(hoursUsed);

  const isValid =
    hoursUsed.trim() !== "" &&
    Number.isFinite(parsedHours) &&
    parsedHours > 0;

  function resetForm() {
    setHoursUsed("");
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

    onSave(parsedHours, notes.trim() || undefined);
    resetForm();
  }

  return (
    <AppModal
      open={open}
      title="Add Equipment"
      description={
        equipment
          ? `Add ${equipment.name} to this working day.`
          : undefined
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
            Save Equipment
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <div className="rounded-xl border bg-slate-50 p-4">
          <p className="font-medium">
            {equipment?.name ?? "No equipment selected"}
          </p>

          {equipment && (
            <p className="mt-1 text-sm text-muted-foreground">
              {equipment.category}
            </p>
          )}
        </div>

        <AppInput
          label="Hours Used"
          type="number"
          min="0"
          step="0.5"
          value={hoursUsed}
          placeholder="Enter hours"
          onChange={(event) =>
            setHoursUsed(event.target.value)
          }
        />

        <AppInput
          label="Notes"
          value={notes}
          placeholder="Optional notes"
          onChange={(event) =>
            setNotes(event.target.value)
          }
        />
      </div>
    </AppModal>
  );
}