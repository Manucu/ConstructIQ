import { useMemo, useState } from "react";

import { useCompanyContext } from "../context/useCompanyContext";

import type {
  ExpenseCategory,
  ExpenseCategoryStatus,
} from "../data/expenseCategories";

export type SaveExpenseCategoryValues = {
  name: string;
  description?: string;
  status: ExpenseCategoryStatus;
};

export function useCompanyExpenseCategories() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const expenseCategories =
    companyData.expenseCategories;

  const [searchValue, setSearchValue] = useState("");

  const [
    isExpenseCategoryDialogOpen,
    setIsExpenseCategoryDialogOpen,
  ] = useState(false);

  const [
    editingExpenseCategory,
    setEditingExpenseCategory,
  ] = useState<ExpenseCategory | null>(null);

  const filteredExpenseCategories = useMemo(() => {
    const normalizedSearch = searchValue
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return expenseCategories;
    }

    return expenseCategories.filter(
      (expenseCategory) =>
        expenseCategory.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        expenseCategory.status
          .toLowerCase()
          .includes(normalizedSearch) ||
        expenseCategory.description
          ?.toLowerCase()
          .includes(normalizedSearch)
    );
  }, [expenseCategories, searchValue]);

  function openAddExpenseCategoryDialog() {
    setEditingExpenseCategory(null);
    setIsExpenseCategoryDialogOpen(true);
  }

  function openEditExpenseCategoryDialog(
    expenseCategory: ExpenseCategory
  ) {
    setEditingExpenseCategory(expenseCategory);
    setIsExpenseCategoryDialogOpen(true);
  }

  function closeExpenseCategoryDialog() {
    setEditingExpenseCategory(null);
    setIsExpenseCategoryDialogOpen(false);
  }

  function saveExpenseCategory(
    values: SaveExpenseCategoryValues
  ) {
    if (editingExpenseCategory) {
      setCompanyData((currentData) => ({
        ...currentData,
        expenseCategories:
          currentData.expenseCategories.map(
            (expenseCategory) =>
              expenseCategory.id ===
              editingExpenseCategory.id
                ? {
                    ...expenseCategory,
                    ...values,
                  }
                : expenseCategory
          ),
      }));

      closeExpenseCategoryDialog();
      return;
    }

    const newExpenseCategory: ExpenseCategory = {
      id: crypto.randomUUID(),
      ...values,
    };

    setCompanyData((currentData) => ({
      ...currentData,
      expenseCategories: [
        ...currentData.expenseCategories,
        newExpenseCategory,
      ],
    }));

    closeExpenseCategoryDialog();
  }

  function toggleExpenseCategoryStatus(
    expenseCategoryId: string
  ) {
    setCompanyData((currentData) => ({
      ...currentData,
      expenseCategories:
        currentData.expenseCategories.map(
          (expenseCategory) =>
            expenseCategory.id === expenseCategoryId
              ? {
                  ...expenseCategory,
                  status:
                    expenseCategory.status === "ACTIVE"
                      ? "INACTIVE"
                      : "ACTIVE",
                }
              : expenseCategory
        ),
    }));
  }

  function deleteExpenseCategory(
    expenseCategoryId: string
  ) {
    setCompanyData((currentData) => ({
      ...currentData,
      expenseCategories:
        currentData.expenseCategories.filter(
          (expenseCategory) =>
            expenseCategory.id !== expenseCategoryId
        ),
    }));
  }

  return {
    expenseCategories,
    filteredExpenseCategories,
    searchValue,
    isExpenseCategoryDialogOpen,
    editingExpenseCategory,

    setSearchValue,

    openAddExpenseCategoryDialog,
    openEditExpenseCategoryDialog,
    closeExpenseCategoryDialog,

    saveExpenseCategory,
    toggleExpenseCategoryStatus,
    deleteExpenseCategory,
  };
}