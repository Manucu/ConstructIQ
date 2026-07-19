import {
  useState,
} from "react";

import {
  TemplateDialog,
  TemplateFormGrid,
  TemplateNumberField,
  TemplateStatusField,
  TemplateTextField,
  TemplateTextareaField,
  parseOptionalNonNegativeNumber,
} from "@/features/templates/components/shared/forms";

import type {
  EquipmentTemplate,
  EquipmentTemplateStatus,
} from "@/features/templates/data/equipmentTemplates";

import type {
  SaveEquipmentTemplateValues,
} from "@/features/templates/hooks/useEquipmentTemplates";

type EquipmentTemplateFormDialogProps = {
  open: boolean;
  editingEquipmentTemplate:
    | EquipmentTemplate
    | null;
  onClose: () => void;
  onSave: (
    values: SaveEquipmentTemplateValues
  ) => boolean;
  isNameAvailable: (
    name: string,
    ignoredEquipmentTemplateId?: string
  ) => boolean;
};

const equipmentCategorySuggestions = [
  "Earthmoving",
  "Lifting",
  "Concrete",
  "Transport",
  "Power Tools",
  "Access",
  "Compaction",
  "Other",
];

export default function EquipmentTemplateFormDialog({
  open,
  editingEquipmentTemplate,
  onClose,
  onSave,
  isNameAvailable,
}: EquipmentTemplateFormDialogProps) {
  const [name, setName] = useState(
    editingEquipmentTemplate?.name ?? ""
  );

  const [category, setCategory] =
    useState(
      editingEquipmentTemplate?.category ??
        ""
    );

  const [
    estimatedHourlyRate,
    setEstimatedHourlyRate,
  ] = useState(
    editingEquipmentTemplate
      ?.estimatedHourlyRate !==
      undefined
      ? String(
          editingEquipmentTemplate
            .estimatedHourlyRate
        )
      : ""
  );

  const [status, setStatus] =
    useState<EquipmentTemplateStatus>(
      editingEquipmentTemplate?.status ??
        "ACTIVE"
    );

  const [description, setDescription] =
    useState(
      editingEquipmentTemplate
        ?.description ?? ""
    );

  const [saveError, setSaveError] =
    useState<string | null>(null);

  const parsedRate =
    parseOptionalNonNegativeNumber(
      estimatedHourlyRate
    );

  const hasAvailableName =
    name.trim() !== "" &&
    isNameAvailable(
      name,
      editingEquipmentTemplate?.id
    );

  const isValid =
    name.trim() !== "" &&
    category.trim() !== "" &&
    parsedRate.isValid &&
    hasAvailableName;

  function handleSave() {
    if (!isValid) {
      return;
    }

    const saved = onSave({
      name,
      category,
      estimatedHourlyRate:
        parsedRate.value,
      status,
      description,
    });

    if (!saved) {
      setSaveError(
        "An equipment template with this name already exists."
      );
    }
  }

  return (
    <TemplateDialog
      open={open}
      title={
        editingEquipmentTemplate
          ? "Edit Equipment Template"
          : "Add Equipment Template"
      }
      description={
        editingEquipmentTemplate
          ? `Update ${editingEquipmentTemplate.name}.`
          : "Create a reusable equipment definition for project estimates."
      }
      saveLabel={
        editingEquipmentTemplate
          ? "Save Changes"
          : "Add Equipment Template"
      }
      isValid={isValid}
      error={saveError}
      onClose={onClose}
      onSave={handleSave}
    >
      <datalist id="equipment-category-suggestions">
        {equipmentCategorySuggestions.map(
          suggestion => (
            <option
              key={suggestion}
              value={suggestion}
            />
          )
        )}
      </datalist>

      <TemplateFormGrid>
        <TemplateTextField
          label="Equipment Name"
          value={name}
          placeholder="Example: Tower Crane"
          autoFocus
          error={
            name.trim() !== "" &&
            !hasAvailableName
              ? "This equipment name is already in use."
              : null
          }
          onChange={value => {
            setName(value);
            setSaveError(null);
          }}
        />

        <TemplateTextField
          label="Category"
          value={category}
          list="equipment-category-suggestions"
          placeholder="Example: Lifting"
          onChange={setCategory}
        />
      </TemplateFormGrid>

      <TemplateNumberField
        label="Estimated Hourly Rate"
        value={estimatedHourlyRate}
        placeholder="Example: 85"
        error={
          parsedRate.isValid
            ? null
            : "The estimated hourly rate must be zero or greater."
        }
        onChange={
          setEstimatedHourlyRate
        }
      />

      <TemplateStatusField
        value={status}
        onChange={setStatus}
      />

      <TemplateTextareaField
        label="Description"
        value={description}
        placeholder="Add notes about capacity, use cases or operating requirements."
        onChange={setDescription}
      />
    </TemplateDialog>
  );
}
