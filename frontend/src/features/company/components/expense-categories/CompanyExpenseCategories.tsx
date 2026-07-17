import {
  CircleDollarSign,
  Pencil,
  Power,
  PowerOff,
  Trash2,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import SearchInput from "@/components/common/SearchInput";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import { useCompanyExpenseCategories } from "../../hooks/useCompanyExpenseCategories";

import ExpenseCategoryFormDialog from "./ExpenseCategoryFormDialog";

export default function CompanyExpenseCategories() {
  const {
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
  } = useCompanyExpenseCategories();

  return (
    <>
      <SectionCard
        title="Expense Categories"
        icon="💶"
        actions={
          <AppButton
            type="button"
            onClick={openAddExpenseCategoryDialog}
          >
            <CircleDollarSign className="mr-2 h-4 w-4" />
            Add Expense Category
          </AppButton>
        }
      >
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          label="Search expense categories"
          placeholder="Search by name, description or status..."
        />

        {filteredExpenseCategories.length === 0 ? (
          <EmptyState
            icon="💶"
            title="No expense categories found"
            description={
              searchValue.trim()
                ? "No expense categories match the current search."
                : "Add the first reusable expense category."
            }
            action={
              !searchValue.trim() ? (
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={openAddExpenseCategoryDialog}
                >
                  <CircleDollarSign className="mr-2 h-4 w-4" />
                  Add First Expense Category
                </AppButton>
              ) : undefined
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredExpenseCategories.map(
              (expenseCategory) => (
                <EntityRow
                  key={expenseCategory.id}
                  title={expenseCategory.name}
                  subtitle="Reusable expense category"
                  description={
                    <div className="mt-2 space-y-2">
                      {expenseCategory.description && (
                        <p className="text-sm text-muted-foreground">
                          {expenseCategory.description}
                        </p>
                      )}

                      <Badge variant="secondary">
                        Available for Working Day expenses
                      </Badge>
                    </div>
                  }
                  actions={
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge
                        status={expenseCategory.status}
                      />

                      <AppButton
                        type="button"
                        size="icon"
                        variant="ghost"
                        aria-label={`Edit ${expenseCategory.name}`}
                        onClick={() => {
                          openEditExpenseCategoryDialog(
                            expenseCategory
                          );
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </AppButton>

                      <AppButton
                        type="button"
                        size="icon"
                        variant="ghost"
                        aria-label={
                          expenseCategory.status === "ACTIVE"
                            ? `Deactivate ${expenseCategory.name}`
                            : `Activate ${expenseCategory.name}`
                        }
                        onClick={() => {
                          toggleExpenseCategoryStatus(
                            expenseCategory.id
                          );
                        }}
                      >
                        {expenseCategory.status === "ACTIVE" ? (
                          <PowerOff className="h-4 w-4" />
                        ) : (
                          <Power className="h-4 w-4" />
                        )}
                      </AppButton>

                      <AppButton
                        type="button"
                        size="icon"
                        variant="ghost"
                        aria-label={`Delete ${expenseCategory.name}`}
                        onClick={() => {
                          deleteExpenseCategory(
                            expenseCategory.id
                          );
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </AppButton>
                    </div>
                  }
                />
              )
            )}
          </div>
        )}
      </SectionCard>

      {isExpenseCategoryDialogOpen && (
        <ExpenseCategoryFormDialog
          key={
            editingExpenseCategory?.id ??
            "new-expense-category"
          }
          open={isExpenseCategoryDialogOpen}
          editingExpenseCategory={editingExpenseCategory}
          onClose={closeExpenseCategoryDialog}
          onSave={saveExpenseCategory}
        />
      )}
    </>
  );
}