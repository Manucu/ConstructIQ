import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type { ExpenseCategory } from "@/features/company/data/expenseCategories";
import type { ExpenseEntry } from "../../types/workingDay";

type ExpenseDialogProps = {
  open: boolean;
  category: ExpenseCategory | null;
  editingEntry?: ExpenseEntry | null;
  onClose: () => void;
  onSave: (
    description: string,
    amount: number,
    currency: ExpenseEntry["currency"],
    notes?: string
  ) => void;
};

export default function ExpenseDialog({
  open,
  category,
  editingEntry,
  onClose,
  onSave,
}: ExpenseDialogProps) {
  const [description, setDescription] = useState(
    editingEntry?.description ?? ""
  );
  const [amount, setAmount] = useState(
    editingEntry ? String(editingEntry.amount) : ""
  );
  const [currency, setCurrency] =
    useState<ExpenseEntry["currency"]>(
      editingEntry?.currency ?? "EUR"
    );
  const [notes, setNotes] = useState(editingEntry?.notes ?? "");

  const parsedAmount = Number(amount);

  const isValid =
    description.trim() !== "" &&
    amount.trim() !== "" &&
    Number.isFinite(parsedAmount) &&
    parsedAmount > 0;

  function resetForm() {
    setDescription("");
    setAmount("");
    setCurrency("EUR");
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
      description.trim(),
      parsedAmount,
      currency,
      notes.trim() || undefined
    );

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={editingEntry ? "Edit Expense" : "Add Expense"}
      description={
        category
          ? `${category.name} expense`
          : "No expense category selected."
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
            {editingEntry ? "Save Changes" : "Save Expense"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <div className="rounded-xl border bg-slate-50 p-4">
          <p className="font-medium">
            {category?.name ?? "No category selected"}
          </p>

          {category?.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {category.description}
            </p>
          )}
        </div>

        <AppInput
          label="Description"
          value={description}
          placeholder="Example: Fuel for excavator"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <AppInput
          label={`Amount (${currency})`}
          type="number"
          min="0"
          step="0.01"
          value={amount}
          placeholder="Enter amount"
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />

        <div>
          <label className="text-sm font-medium text-slate-700">
            Currency
          </label>

          <select
            value={currency}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) => {
              setCurrency(
                event.target.value as ExpenseEntry["currency"]
              );
            }}
          >
            <option value="EUR">EUR</option>
            <option value="RON">RON</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

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