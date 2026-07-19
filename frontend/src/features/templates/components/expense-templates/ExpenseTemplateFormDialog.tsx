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
  TemplateTextareaField,
  parseOptionalNonNegativeNumber,
} from "@/features/templates/components/shared/forms";

import {
  expenseTemplateUnits,
  type ExpenseTemplate,
  type ExpenseTemplateStatus,
  type ExpenseTemplateUnit,
} from "@/features/templates/data/expenseTemplates";

import type {
  SaveExpenseTemplateValues,
} from "@/features/templates/hooks/useExpenseTemplates";

type ExpenseTemplateFormDialogProps = {
  open: boolean;
  editingExpenseTemplate:
    | ExpenseTemplate
    | null;
  onClose: () => void;
  onSave: (
    values: SaveExpenseTemplateValues
  ) => boolean;
  isNameAvailable: (
    name: string,
    ignoredExpenseTemplateId?: string
  ) => boolean;
};

const expenseCategorySuggestions = [
  "Permits",
  "Insurance",
  "Transport",
  "Accommodation",
  "Utilities",
  "Waste",
  "Professional Fees",
  "Other",
];

const unitOptions =
  expenseTemplateUnits.map(unit => ({
    value: unit,
    label:
      unit.charAt(0).toUpperCase() +
      unit.slice(1),
  }));

export default function ExpenseTemplateFormDialog({
  open,
  editingExpenseTemplate,
  onClose,
  onSave,
  isNameAvailable,
}: ExpenseTemplateFormDialogProps) {
  const [name, setName] = useState(
    editingExpenseTemplate?.name ?? ""
  );

  const [category, setCategory] =
    useState(
      editingExpenseTemplate?.category ??
        ""
    );

  const [unit, setUnit] =
    useState<ExpenseTemplateUnit>(
      editingExpenseTemplate?.unit ??
        "fixed"
    );

  const [
    estimatedUnitCost,
    setEstimatedUnitCost,
  ] = useState(
    editingExpenseTemplate
      ?.estimatedUnitCost !== undefined
      ? String(
          editingExpenseTemplate
            .estimatedUnitCost
        )
      : ""
  );

  const [status, setStatus] =
    useState<ExpenseTemplateStatus>(
      editingExpenseTemplate?.status ??
        "ACTIVE"
    );

  const [description, setDescription] =
    useState(
      editingExpenseTemplate
        ?.description ?? ""
    );

  const [saveError, setSaveError] =
    useState<string | null>(null);

  const parsedCost =
    parseOptionalNonNegativeNumber(
      estimatedUnitCost
    );

  const hasAvailableName =
    name.trim() !== "" &&
    isNameAvailable(
      name,
      editingExpenseTemplate?.id
    );

  const isValid =
    name.trim() !== "" &&
    category.trim() !== "" &&
    parsedCost.isValid &&
    hasAvailableName;

  function handleSave() {
    if (!isValid) {
      return;
    }

    const saved = onSave({
      name,
      category,
      unit,
      estimatedUnitCost:
        parsedCost.value,
      status,
      description,
    });

    if (!saved) {
      setSaveError(
        "An expense template with this name already exists."
      );
    }
  }

  return (
    <TemplateDialog
      open={open}
      title={
        editingExpenseTemplate
          ? "Edit Expense Template"
          : "Add Expense Template"
      }
      description={
        editingExpenseTemplate
          ? `Update ${editingExpenseTemplate.name}.`
          : "Create a reusable indirect expense definition for project estimates."
      }
      saveLabel={
        editingExpenseTemplate
          ? "Save Changes"
          : "Add Expense Template"
      }
      isValid={isValid}
      error={saveError}
      onClose={onClose}
      onSave={handleSave}
    >
      <datalist id="expense-category-suggestions">
        {expenseCategorySuggestions.map(
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
          label="Expense Name"
          value={name}
          placeholder="Example: Building Permit"
          autoFocus
          error={
            name.trim() !== "" &&
            !hasAvailableName
              ? "This expense name is already in use."
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
          list="expense-category-suggestions"
          placeholder="Example: Permits"
          onChange={setCategory}
        />
      </TemplateFormGrid>

      <TemplateFormGrid>
        <TemplateSelectField
          label="Unit"
          value={unit}
          options={unitOptions}
          onChange={setUnit}
        />

        <TemplateNumberField
          label="Estimated Unit Cost"
          value={estimatedUnitCost}
          placeholder="Example: 500"
          error={
            parsedCost.isValid
              ? null
              : "The estimated unit cost must be zero or greater."
          }
          onChange={
            setEstimatedUnitCost
          }
        />
      </TemplateFormGrid>

      <TemplateStatusField
        value={status}
        onChange={setStatus}
      />

      <TemplateTextareaField
        label="Description"
        value={description}
        placeholder="Add notes about when this expense applies."
        onChange={setDescription}
      />
    </TemplateDialog>
  );
}
