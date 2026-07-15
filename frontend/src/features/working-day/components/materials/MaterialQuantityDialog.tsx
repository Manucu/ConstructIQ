import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type { CompanyMaterial } from "@/features/company/data/materials";

import type { MaterialEntry } from "../../types/workingDay";

type MaterialQuantityDialogProps = {
  open: boolean;
  material: CompanyMaterial | null;
  editingEntry?: MaterialEntry | null;
  onClose: () => void;
  onSave: (quantity: number, notes?: string) => void;
};

export default function MaterialQuantityDialog({
  open,
  material,
  editingEntry,
  onClose,
  onSave,
}: MaterialQuantityDialogProps) {
  const [quantity, setQuantity] = useState(
    editingEntry ? String(editingEntry.quantity) : ""
  );

  const [notes, setNotes] = useState(
    editingEntry?.notes ?? ""
  );

  const parsedQuantity = Number(quantity);

  const isValid =
    material !== null &&
    quantity.trim() !== "" &&
    Number.isFinite(parsedQuantity) &&
    parsedQuantity > 0;

  function resetForm() {
    setQuantity("");
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
      parsedQuantity,
      notes.trim() || undefined
    );

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={
        editingEntry
          ? "Edit Material Quantity"
          : "Add Material"
      }
      description={
        material
          ? `${material.name} • ${material.code} • ${material.unit}`
          : "No material selected."
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
            {editingEntry
              ? "Save Changes"
              : "Save Material"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <div className="rounded-xl border bg-slate-50 p-4">
          <p className="font-medium">
            {material?.name ?? "No material selected"}
          </p>

          {material && (
            <p className="mt-1 text-sm text-muted-foreground">
              {material.code} • {material.category} • {material.unit}
            </p>
          )}
        </div>

        <AppInput
          label={`Quantity${material ? ` (${material.unit})` : ""}`}
          type="number"
          min="0"
          step="0.01"
          value={quantity}
          placeholder="Enter quantity"
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />

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