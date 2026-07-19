import {
  useState,
} from "react";

import {
  TemplateDialog,
  TemplateFormGrid,
  TemplateNumberField,
  TemplateSelectField,
  TemplateStatusField,
  TemplateTextField,
  parseOptionalNonNegativeNumber,
} from "@/features/templates/components/shared/forms";

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

const categoryOptions =
  materialCategories.map(category => ({
    value: category,
    label: category,
  }));

const unitOptions =
  unitsOfMeasure.map(unit => ({
    value: unit,
    label: unit,
  }));

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
      editingMaterialTemplate?.unit ??
        "pcs"
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
      ?.defaultEstimatedUnitCost !==
      undefined
      ? String(
          editingMaterialTemplate
            .defaultEstimatedUnitCost
        )
      : ""
  );

  const [saveError, setSaveError] =
    useState<string | null>(null);

  const parsedCost =
    parseOptionalNonNegativeNumber(
      defaultEstimatedUnitCost
    );

  const hasAvailableCode =
    code.trim() !== "" &&
    isCodeAvailable(
      code,
      editingMaterialTemplate?.id
    );

  const isValid =
    code.trim() !== "" &&
    name.trim() !== "" &&
    parsedCost.isValid &&
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
        parsedCost.value,
    });

    if (!saved) {
      setSaveError(
        "A material template with this code already exists."
      );
    }
  }

  return (
    <TemplateDialog
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
      saveLabel={
        editingMaterialTemplate
          ? "Save Changes"
          : "Add Material Template"
      }
      isValid={isValid}
      error={saveError}
      onClose={onClose}
      onSave={handleSave}
    >
      <TemplateFormGrid>
        <TemplateTextField
          label="Material Code"
          value={code}
          placeholder="Example: CON-C25"
          autoFocus
          error={
            code.trim() !== "" &&
            !hasAvailableCode
              ? "This material code is already in use."
              : null
          }
          onChange={value => {
            setCode(value);
            setSaveError(null);
          }}
        />

        <TemplateTextField
          label="Material Name"
          value={name}
          placeholder="Example: Concrete C25/30"
          onChange={setName}
        />
      </TemplateFormGrid>

      <TemplateFormGrid>
        <TemplateSelectField
          label="Category"
          value={category}
          options={categoryOptions}
          onChange={setCategory}
        />

        <TemplateSelectField
          label="Unit of Measure"
          value={unit}
          options={unitOptions}
          onChange={setUnit}
        />
      </TemplateFormGrid>

      <TemplateNumberField
        label="Default Estimated Unit Cost"
        value={defaultEstimatedUnitCost}
        placeholder="Example: 95"
        error={
          parsedCost.isValid
            ? null
            : "The default estimated unit cost must be zero or greater."
        }
        onChange={
          setDefaultEstimatedUnitCost
        }
      />

      <TemplateStatusField
        value={status}
        onChange={setStatus}
      />
    </TemplateDialog>
  );
}
