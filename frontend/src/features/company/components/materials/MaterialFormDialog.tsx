import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type {
  CompanyMaterial,
  CompanyMaterialStatus,
} from "../../data/materials";

import type {
  MaterialCategory,
  UnitOfMeasure,
} from "../../../templates/data/materialTemplates";

import type { SaveMaterialValues } from "../../hooks/useCompanyMaterials";

type MaterialFormDialogProps = {
  open: boolean;
  editingMaterial: CompanyMaterial | null;
  onClose: () => void;
  onSave: (values: SaveMaterialValues) => void;
};

const materialCategories: MaterialCategory[] = [
  "Concrete",
  "Steel",
  "Masonry",
  "Wood",
  "Insulation",
  "Roof",
  "Electrical",
  "Plumbing",
  "Finishing",
  "Other",
];

const unitsOfMeasure: UnitOfMeasure[] = [
  "kg",
  "m",
  "m²",
  "m³",
  "pcs",
  "bag",
  "liter",
  "ton",
];

export default function MaterialFormDialog({
  open,
  editingMaterial,
  onClose,
  onSave,
}: MaterialFormDialogProps) {
  const [code, setCode] = useState(
    editingMaterial?.code ?? ""
  );

  const [name, setName] = useState(
    editingMaterial?.name ?? ""
  );

  const [category, setCategory] =
    useState<MaterialCategory>(
      editingMaterial?.category ?? "Other"
    );

  const [unit, setUnit] =
    useState<UnitOfMeasure>(
      editingMaterial?.unit ?? "pcs"
    );

  const [status, setStatus] =
    useState<CompanyMaterialStatus>(
      editingMaterial?.status ?? "ACTIVE"
    );

  const [estimatedUnitCost, setEstimatedUnitCost] =
    useState(
      editingMaterial?.estimatedUnitCost !== undefined
        ? String(editingMaterial.estimatedUnitCost)
        : ""
    );

  const parsedEstimatedUnitCost =
    estimatedUnitCost.trim() === ""
      ? undefined
      : Number(estimatedUnitCost);

  const isEstimatedCostValid =
    parsedEstimatedUnitCost === undefined ||
    (Number.isFinite(parsedEstimatedUnitCost) &&
      parsedEstimatedUnitCost >= 0);

  const isValid =
    code.trim() !== "" &&
    name.trim() !== "" &&
    isEstimatedCostValid;

  function resetForm() {
    setCode("");
    setName("");
    setCategory("Other");
    setUnit("pcs");
    setStatus("ACTIVE");
    setEstimatedUnitCost("");
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
      code: code.trim(),
      name: name.trim(),
      category,
      unit,
      status,
      estimatedUnitCost: parsedEstimatedUnitCost,
      templateId: editingMaterial?.templateId,
      fromTemplate: editingMaterial?.fromTemplate ?? false,
    });

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={
        editingMaterial
          ? "Edit Material"
          : "Add Material"
      }
      description={
        editingMaterial
          ? `Update ${editingMaterial.name}.`
          : "Add a new material to the company catalog."
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
            {editingMaterial
              ? "Save Changes"
              : "Add Material"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <AppInput
            label="Material Code"
            value={code}
            placeholder="Example: CON-C25"
            onChange={(event) => {
              setCode(event.target.value);
            }}
          />

          <AppInput
            label="Material Name"
            value={name}
            placeholder="Example: Concrete C25/30"
            onChange={(event) => {
              setName(event.target.value);
            }}
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
              onChange={(event) => {
                setCategory(
                  event.target.value as MaterialCategory
                );
              }}
            >
              {materialCategories.map(
                (materialCategory) => (
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
              onChange={(event) => {
                setUnit(
                  event.target.value as UnitOfMeasure
                );
              }}
            >
              {unitsOfMeasure.map((unitValue) => (
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

        <div>
          <label className="text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) => {
              setStatus(
                event.target
                  .value as CompanyMaterialStatus
              );
            }}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">
              Inactive
            </option>
          </select>
        </div>

        <AppInput
          label="Estimated Unit Cost"
          type="number"
          min="0"
          step="0.01"
          value={estimatedUnitCost}
          placeholder="Example: 95"
          onChange={(event) => {
            setEstimatedUnitCost(
              event.target.value
            );
          }}
        />

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            The estimated unit cost is used only
            for planning and budgeting. The real
            project cost will come from approved
            invoice lines.
          </p>
        </div>

        {editingMaterial?.fromTemplate && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-700">
              This material was created from the
              template catalog.
            </p>
          </div>
        )}
      </div>
    </AppModal>
  );
}