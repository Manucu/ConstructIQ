import { useState } from "react";

import {
  expenseCategories,
  type ExpenseCategory,
} from "@/features/company/data/expenseCategories";

import { useWorkingDayContext } from "../context/useWorkingDayContext";

import type { ExpenseEntry } from "../types/workingDay";

export function useWorkingDayExpenses() {
  const {
    expenseEntries,
    setExpenseEntries,
  } = useWorkingDayContext();

  const [isCategorySearchOpen, setIsCategorySearchOpen] =
    useState(false);

  const [isExpenseDialogOpen, setIsExpenseDialogOpen] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory | null>(null);

  const [editingEntry, setEditingEntry] =
    useState<ExpenseEntry | null>(null);

  function openCategorySearchDialog() {
    setEditingEntry(null);
    setSelectedCategory(null);
    setIsCategorySearchOpen(true);
  }

  function closeCategorySearchDialog() {
    setIsCategorySearchOpen(false);
  }

  function handleSelectCategory(category: ExpenseCategory) {
    setEditingEntry(null);
    setSelectedCategory(category);
    setIsCategorySearchOpen(false);
    setIsExpenseDialogOpen(true);
  }

  function closeExpenseDialog() {
    setIsExpenseDialogOpen(false);
    setSelectedCategory(null);
    setEditingEntry(null);
  }

  function saveExpense(
    description: string,
    amount: number,
    currency: ExpenseEntry["currency"],
    notes?: string
  ) {
    if (!selectedCategory) {
      return;
    }

    if (editingEntry) {
      setExpenseEntries((currentEntries) =>
        currentEntries.map((entry) =>
          entry.id === editingEntry.id
            ? {
                ...entry,
                expenseCategoryId: selectedCategory.id,
                description,
                amount,
                currency,
                notes,
              }
            : entry
        )
      );

      closeExpenseDialog();
      return;
    }

    const newEntry: ExpenseEntry = {
      id: crypto.randomUUID(),
      expenseCategoryId: selectedCategory.id,
      description,
      amount,
      currency,
      status: "PENDING",
      notes,
    };

    setExpenseEntries((currentEntries) => [
      ...currentEntries,
      newEntry,
    ]);

    closeExpenseDialog();
  }

  function deleteExpense(entryId: string) {
    setExpenseEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryId)
    );
  }

  function editExpense(entry: ExpenseEntry) {
    const category = expenseCategories.find(
      (item) => item.id === entry.expenseCategoryId
    );

    if (!category) {
      return;
    }

    setEditingEntry(entry);
    setSelectedCategory(category);
    setIsExpenseDialogOpen(true);
  }

  return {
    expenseEntries,
    selectedCategory,
    editingEntry,

    isCategorySearchOpen,
    isExpenseDialogOpen,

    openCategorySearchDialog,
    closeCategorySearchDialog,
    closeExpenseDialog,

    handleSelectCategory,
    saveExpense,
    deleteExpense,
    editExpense,
  };
}