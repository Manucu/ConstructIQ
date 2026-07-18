import { useMemo, useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type {
  MaterialTemplate,
} from "../../data/materialTemplates";

import type {
  ProjectTemplateActivityMaterial,
} from "../materials-templates/projectTemplateActivityMaterials";

import type {
  SaveProjectTemplateActivityMaterialValues,
} from "../../hooks/useProjectTemplateActivityMaterials";

type ProjectTemplateActivityMaterialFormDialogProps = {
  open: boolean;

  editingMaterial:
    | ProjectTemplateActivityMaterial
    | null;

  materialTemplates: MaterialTemplate[];

  onClose: () => void;

  onSave: (
    values: SaveProjectTemplateActivityMaterialValues
  ) => void;
};

function parsePositiveNumber(value: string) {
  const parsedValue = Number(value);

  if (
    !Number.isFinite(parsedValue) ||
    parsedValue <= 0
  ) {
    return undefined;
  }

  return parsedValue;
}

function parseOptionalNonNegativeNumber(
  value: string
) {
  if (!value.trim()) {
    return undefined;
  }

  const parsedValue = Number(value);

  if (
    !Number.isFinite(parsedValue) ||
    parsedValue < 0
  ) {
    return undefined;
  }

  return parsedValue;
}

export default function ProjectTemplateActivityMaterialFormDialog({
  open,
  editingMaterial,
  materialTemplates,
  onClose,
  onSave,
}: ProjectTemplateActivityMaterialFormDialogProps) {
  const [
    materialTemplateId,
    setMaterialTemplateId,
  ] = useState(
    editingMaterial?.materialTemplateId ?? ""
  );

  const [
    estimatedQuantity,
    setEstimatedQuantity,
  ] = useState(
    editingMaterial?.estimatedQuantity.toString() ??
      ""
  );

  const [
    estimatedUnitCost,
    setEstimatedUnitCost,
  ] = useState(
    editingMaterial?.estimatedUnitCost?.toString() ??
      ""
  );

  const [notes, setNotes] = useState(
    editingMaterial?.notes ?? ""
  );

  const selectedMaterialTemplate =
    useMemo(
      () =>
        materialTemplates.find(
          materialTemplate =>
            materialTemplate.id ===
            materialTemplateId
        ),
      [
        materialTemplateId,
        materialTemplates,
      ]
    );

  const parsedQuantity =
    parsePositiveNumber(estimatedQuantity);

  const parsedUnitCost =
    parseOptionalNonNegativeNumber(
      estimatedUnitCost
    );

  const hasValidUnitCost =
    estimatedUnitCost.trim() === "" ||
    parsedUnitCost !== undefined;

  const isValid =
    materialTemplateId !== "" &&
    parsedQuantity !== undefined &&
    hasValidUnitCost;

  function handleMaterialTemplateChange(
    value: string
  ) {
    setMaterialTemplateId(value);

    const materialTemplate =
      materialTemplates.find(
        currentMaterialTemplate =>
          currentMaterialTemplate.id === value
      );

    setEstimatedUnitCost(
      materialTemplate?.defaultEstimatedUnitCost
        ?.toString() ?? ""
    );
  }

  function handleSave() {
    if (!isValid || parsedQuantity === undefined) {
      return;
    }

    onSave({
      materialTemplateId,
      estimatedQuantity: parsedQuantity,
      estimatedUnitCost: parsedUnitCost,
      notes: notes.trim() || undefined,
    });
  }

  return (
    <AppModal
      open={open}
      title={
        editingMaterial
          ? "Edit Suggested Material"
          : "Add Suggested Material"
      }
      description="Define the estimated material requirement for this activity."
      onClose={onClose}
      footer={
        <>
          <AppButton
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </AppButton>

          <AppButton
            type="button"
            disabled={!isValid}
            onClick={handleSave}
          >
            {editingMaterial
              ? "Save Changes"
              : "Add Material"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Material
          </label>

          <select
            value={materialTemplateId}
            disabled={Boolean(editingMaterial)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700 disabled:bg-slate-100"
            onChange={event =>
              handleMaterialTemplateChange(
                event.target.value
              )
            }
          >
            <option value="">
              Select material...
            </option>

            {materialTemplates.map(
              materialTemplate => (
                <option
                  key={materialTemplate.id}
                  value={materialTemplate.id}
                >
                  {materialTemplate.name}
                </option>
              )
            )}
          </select>
        </div>

        {selectedMaterialTemplate && (
          <div className="rounded-xl border bg-slate-50 p-4">
            <p className="font-medium text-slate-900">
              {selectedMaterialTemplate.name}
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Code: {selectedMaterialTemplate.code}
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Unit: {selectedMaterialTemplate.unit}
            </p>
          </div>
        )}

        <AppInput
          label="Estimated Quantity"
          type="number"
          min="0.01"
          step="0.01"
          value={estimatedQuantity}
          onChange={event =>
            setEstimatedQuantity(
              event.target.value
            )
          }
        />

        <AppInput
          label="Estimated Unit Cost"
          type="number"
          min="0"
          step="0.01"
          value={estimatedUnitCost}
          onChange={event =>
            setEstimatedUnitCost(
              event.target.value
            )
          }
        />

        <div>
          <label className="text-sm font-medium text-slate-700">
            Notes
          </label>

          <textarea
            rows={4}
            value={notes}
            placeholder="Optional notes..."
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={event =>
              setNotes(event.target.value)
            }
          />
        </div>
      </div>
    </AppModal>
  );
}