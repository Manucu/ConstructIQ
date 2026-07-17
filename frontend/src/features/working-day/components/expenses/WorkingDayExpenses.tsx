import { Pencil, Trash2 } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import EntityToolbar from "@/components/common/EntityToolbar";
import EntitySelectDialog from "@/components/common/dialogs/EntitySelectDialog";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import type { ExpenseCategory } from "@/features/company/data/expenseCategories";

import { useWorkingDayContext } from "../../context/useWorkingDayContext";
import { useWorkingDayExpenses } from "../../hooks/useWorkingDayExpenses";

import ExpenseDialog from "./ExpenseDialog";

function formatCurrency(
  amount: number,
  currency: string
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getExpenseCategory(
  expenseCategories: ExpenseCategory[],
  expenseCategoryId: string
) {
  return expenseCategories.find(
    (category) =>
      category.id === expenseCategoryId
  );
}

export default function WorkingDayExpenses() {
  const {
    expenseCategories,
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
  } = useWorkingDayExpenses();

  const { isLocked } = useWorkingDayContext();

  const toolbar = isLocked ? undefined : (
    <EntityToolbar
      searchLabel="Search Category"
      addLabel="Add Expense"
      onSearch={openCategorySearchDialog}
      onAdd={openCategorySearchDialog}
    />
  );

  const availableExpenseCategories =
    expenseCategories.filter(
      (category) =>
        category.status === "ACTIVE"
    );

  return (
    <>
      <SectionCard
        title="Expenses"
        icon="💰"
        actions={toolbar}
      >
        {expenseEntries.length === 0 ? (
          <EmptyState
            icon="💰"
            title="No expenses added"
            description="Add the first expense recorded for this working day."
          />
        ) : (
          expenseEntries.map((entry) => {
            const category =
              getExpenseCategory(
                expenseCategories,
                entry.expenseCategoryId
              );

            return (
              <EntityRow
                key={entry.id}
                title={entry.description}
                subtitle={
                  category?.name ??
                  "Unknown Category"
                }
                description={
                  entry.notes ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {entry.notes}
                    </p>
                  ) : undefined
                }
                actions={
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {formatCurrency(
                        entry.amount,
                        entry.currency
                      )}
                    </Badge>

                    <StatusBadge
                      status={entry.status}
                    />

                    {!isLocked && (
                      <>
                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={`Edit ${
                            category?.name ??
                            "expense"
                          }`}
                          onClick={() => {
                            editExpense(entry);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={`Delete ${
                            category?.name ??
                            "expense"
                          }`}
                          onClick={() => {
                            deleteExpense(entry.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </AppButton>
                      </>
                    )}
                  </div>
                }
              />
            );
          })
        )}
      </SectionCard>

      <EntitySelectDialog<ExpenseCategory>
        open={isCategorySearchOpen}
        title="Select Expense Category"
        description="Search and select a company expense category."
        items={availableExpenseCategories}
        searchPlaceholder="Search expense categories..."
        emptyMessage="No active expense categories are available."
        getItemId={(category) => category.id}
        getItemLabel={(category) =>
          category.name
        }
        getItemDescription={(category) =>
          category.description
        }
        onClose={closeCategorySearchDialog}
        onSelect={handleSelectCategory}
      />

      {isExpenseDialogOpen && (
        <ExpenseDialog
          key={
            editingEntry?.id ??
            selectedCategory?.id ??
            "new-expense"
          }
          open={isExpenseDialogOpen}
          category={selectedCategory}
          editingEntry={editingEntry}
          onClose={closeExpenseDialog}
          onSave={saveExpense}
        />
      )}
    </>
  );
}