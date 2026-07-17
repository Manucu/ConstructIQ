import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type {
  ExpenseCategory,
  ExpenseCategoryStatus,
} from "../../data/expenseCategories";

import type { SaveExpenseCategoryValues } from "../../hooks/useCompanyExpenseCategories";

type ExpenseCategoryFormDialogProps = {
  open: boolean;
  editingExpenseCategory: ExpenseCategory | null;
  onClose: () => void;
  onSave: (values: SaveExpenseCategoryValues) => void;
};

export default function ExpenseCategoryFormDialog({
  open,
  editingExpenseCategory,
  onClose,
  onSave,
}: ExpenseCategoryFormDialogProps) {
  const [name, setName] = useState(
    editingExpenseCategory?.name ?? ""
  );

  const [description, setDescription] = useState(
    editingExpenseCategory?.description ?? ""
  );

  const [status, setStatus] =
    useState<ExpenseCategoryStatus>(
      editingExpenseCategory?.status ?? "ACTIVE"
    );

  const isValid = name.trim() !== "";

  function resetForm() {
    setName("");
    setDescription("");
    setStatus("ACTIVE");
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
      description: description.trim() || undefined,
      status,
    });

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={
        editingExpenseCategory
          ? "Edit Expense Category"
          : "Add Expense Category"
      }
      description={
        editingExpenseCategory
          ? `Update ${editingExpenseCategory.name}.`
          : "Add a reusable category for project expenses."
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
            {editingExpenseCategory
              ? "Save Changes"
              : "Add Expense Category"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <AppInput
          label="Category Name"
          value={name}
          placeholder="Example: Fuel"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <div>
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            placeholder="Describe when this expense category should be used..."
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-colors focus:border-blue-700"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
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
                event.target.value as ExpenseCategoryStatus
              );
            }}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            Active categories will be available when expenses are added
            to a Working Day, invoice or project.
          </p>
        </div>
      </div>
    </AppModal>
  );
}