import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import {
  materialCategories,
  unitsOfMeasure,
  type MaterialCategory,
  type MaterialTemplate,
  type MaterialTemplateStatus,
  type UnitOfMeasure,
} from "@/features/templates/data/materialTemplates";

import type {
  SaveMaterialTemplateValues,
} from "@/features/templates/hooks/useMaterialTemplates";

type MaterialTemplateFormDialogProps = {
  open: boolean;
  editingMaterialTemplate:
    | MaterialTemplate
    | null;
  onClose: () => void;
  onSave: (
    values: SaveMaterialTemplateValues
  ) => boolean;
  isCodeAvailable: (
    code: string,
    ignoredMaterialTemplateId?: string
  ) => boolean;
};

export default function MaterialTemplateFormDialog({
  open,
  editingMaterialTemplate,
  onClose,
  onSave,
  isCodeAvailable,
}: MaterialTemplateFormDialogProps) {
  const [code, setCode] = useState(
    editingMaterialTemplate?.code ?? ""
  );

  const [name, setName] = useState(
    editingMaterialTemplate?.name ?? ""
  );

  const [category, setCategory] =
    useState<MaterialCategory>(
      editingMaterialTemplate?.category ??
        "Other"
    );

  const [unit, setUnit] =
    useState<UnitOfMeasure>(
      editingMaterialTemplate?.unit ?? "pcs"
    );

  const [status, setStatus] =
    useState<MaterialTemplateStatus>(
      editingMaterialTemplate?.status ??
        "ACTIVE"
    );

  const [
    defaultEstimatedUnitCost,
    setDefaultEstimatedUnitCost,
  ] = useState(
    editingMaterialTemplate
      ?.defaultEstimatedUnitCost !== undefined
      ? String(
          editingMaterialTemplate
            .defaultEstimatedUnitCost
        )
      : ""
  );

  const [saveError, setSaveError] =
    useState<string | null>(null);

  const parsedDefaultEstimatedUnitCost =
    defaultEstimatedUnitCost.trim() === ""
      ? undefined
      : Number(defaultEstimatedUnitCost);

  const isCostValid =
    parsedDefaultEstimatedUnitCost ===
      undefined ||
    (Number.isFinite(
      parsedDefaultEstimatedUnitCost
    ) &&
      parsedDefaultEstimatedUnitCost >= 0);

  const hasAvailableCode =
    code.trim() !== "" &&
    isCodeAvailable(
      code,
      editingMaterialTemplate?.id
    );

  const isValid =
    code.trim() !== "" &&
    name.trim() !== "" &&
    isCostValid &&
    hasAvailableCode;

  function handleSave() {
    if (!isValid) {
      return;
    }

    const saved = onSave({
      code,
      name,
      category,
      unit,
      status,
      defaultEstimatedUnitCost:
        parsedDefaultEstimatedUnitCost,
    });

    if (!saved) {
      setSaveError(
        "A material template with this code already exists."
      );
    }
  }

  return (
    <AppModal
      open={open}
      title={
        editingMaterialTemplate
          ? "Edit Material Template"
          : "Add Material Template"
      }
      description={
        editingMaterialTemplate
          ? `Update ${editingMaterialTemplate.name}.`
          : "Create a reusable material definition for project estimates."
      }
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
            {editingMaterialTemplate
              ? "Save Changes"
              : "Add Material Template"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <AppInput
              label="Material Code"
              value={code}
              placeholder="Example: CON-C25"
              onChange={event => {
                setCode(event.target.value);
                setSaveError(null);
              }}
            />

            {code.trim() !== "" &&
              !hasAvailableCode && (
                <p className="mt-2 text-sm text-red-600">
                  This material code is already in use.
                </p>
              )}
          </div>

          <AppInput
            label="Material Name"
            value={name}
            placeholder="Example: Concrete C25/30"
            onChange={event =>
              setName(event.target.value)
            }
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Category
            </label>

            <select
              value={category}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
              onChange={event =>
                setCategory(
                  event.target
                    .value as MaterialCategory
                )
              }
            >
              {materialCategories.map(
                materialCategory => (
                  <option
                    key={materialCategory}
                    value={materialCategory}
                  >
                    {materialCategory}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Unit of Measure
            </label>

            <select
              value={unit}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
              onChange={event =>
                setUnit(
                  event.target
                    .value as UnitOfMeasure
                )
              }
            >
              {unitsOfMeasure.map(unitValue => (
                <option
                  key={unitValue}
                  value={unitValue}
                >
                  {unitValue}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AppInput
          label="Default Estimated Unit Cost"
          type="number"
          min="0"
          step="0.01"
          value={defaultEstimatedUnitCost}
          placeholder="Example: 95"
          onChange={event =>
            setDefaultEstimatedUnitCost(
              event.target.value
            )
          }
        />

        {!isCostValid && (
          <p className="text-sm text-red-600">
            The default estimated unit cost must
            be zero or greater.
          </p>
        )}

        <div>
          <label className="text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={event =>
              setStatus(
                event.target
                  .value as MaterialTemplateStatus
              )
            }
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">
              Inactive
            </option>
          </select>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            This price is a default estimate. When
            the project template is applied, an
            existing company material keeps its own
            operational price. A missing company
            material can be created from this
            template without synchronizing future
            price changes automatically.
          </p>
        </div>

        {saveError && (
          <p className="text-sm text-red-600">
            {saveError}
          </p>
        )}
      </div>
    </AppModal>
  );
}