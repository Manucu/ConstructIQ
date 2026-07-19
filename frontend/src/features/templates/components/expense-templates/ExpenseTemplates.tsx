import { CircleDollarSign } from "lucide-react";

import ExpenseTemplateFormDialog from "@/features/templates/components/expense-templates/ExpenseTemplateFormDialog";
import TemplateActions from "@/features/templates/components/shared/TemplateActions";
import TemplateEmptyState from "@/features/templates/components/shared/TemplateEmptyState";
import TemplateListFooter from "@/features/templates/components/shared/TemplateListFooter";
import TemplateSearchBar from "@/features/templates/components/shared/TemplateSearchBar";
import TemplateSectionHeader from "@/features/templates/components/shared/TemplateSectionHeader";
import TemplateStatusButton from "@/features/templates/components/shared/TemplateStatusButton";
import TemplateTableShell from "@/features/templates/components/shared/TemplateTableShell";
import {
  formatCurrency,
  formatUnitLabel,
  formatUsage,
} from "@/features/templates/components/shared/templateFormatters";

import type {
  ExpenseTemplate,
} from "@/features/templates/data/expenseTemplates";

import {
  useExpenseTemplates,
} from "@/features/templates/hooks/useExpenseTemplates";

export default function ExpenseTemplates() {
  const {
    expenseTemplates,
    filteredExpenseTemplates,

    searchValue,
    setSearchValue,

    isExpenseTemplateDialogOpen,
    editingExpenseTemplate,

    openAddExpenseTemplateDialog,
    openEditExpenseTemplateDialog,
    closeExpenseTemplateDialog,

    isExpenseTemplateNameAvailable,
    saveExpenseTemplate,
    toggleExpenseTemplateStatus,
    getExpenseTemplateUsageCount,
    deleteExpenseTemplate,
  } = useExpenseTemplates();

  function handleDelete(
    expenseTemplate: ExpenseTemplate
  ) {
    const usageCount =
      getExpenseTemplateUsageCount(
        expenseTemplate.id
      );

    if (usageCount > 0) {
      window.alert(
        `This expense template cannot be deleted because it is used by ${usageCount} project template ${
          usageCount === 1
            ? "activity"
            : "activities"
        }.`
      );

      return;
    }

    const confirmed =
      window.confirm(
        `Delete the "${expenseTemplate.name}" expense template? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    deleteExpenseTemplate(
      expenseTemplate.id
    );
  }

  const activeCount =
    expenseTemplates.filter(
      expenseTemplate =>
        expenseTemplate.status === "ACTIVE"
    ).length;

  return (
    <>
      <section className="space-y-6">
        <TemplateSectionHeader
          icon={CircleDollarSign}
          iconClassName="bg-violet-50 text-violet-700"
          title="Expense Templates"
          description="Manage reusable indirect expenses and estimated unit costs."
          addLabel="Add Expense Template"
          onAdd={openAddExpenseTemplateDialog}
        />

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <TemplateSearchBar
            value={searchValue}
            placeholder="Search expense templates..."
            onChange={setSearchValue}
          />

          {filteredExpenseTemplates.length ===
          0 ? (
            <TemplateEmptyState
              icon={CircleDollarSign}
              isCollectionEmpty={
                expenseTemplates.length === 0
              }
              emptyTitle="No expense templates yet"
              noResultsTitle="No matching expense templates"
              emptyDescription="Create reusable expense definitions that can later be assigned to project template activities."
              noResultsDescription="Try changing the search term to find the expense template you need."
              addLabel="Add Expense Template"
              onAdd={
                openAddExpenseTemplateDialog
              }
            />
          ) : (
            <TemplateTableShell
              headers={[
                "Expense",
                "Category",
                "Unit",
                "Estimated Cost",
                "Status",
                "Usage",
                "Description",
                "Actions",
              ]}
            >
              {filteredExpenseTemplates.map(
                expenseTemplate => {
                  const usageCount =
                    getExpenseTemplateUsageCount(
                      expenseTemplate.id
                    );

                  return (
                    <tr
                      key={expenseTemplate.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
                            <CircleDollarSign className="h-4 w-4" />
                          </div>

                          <span className="font-medium text-slate-900">
                            {expenseTemplate.name}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                        {expenseTemplate.category}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                        {formatUnitLabel(
                          expenseTemplate.unit
                        )}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                        {formatCurrency(
                          expenseTemplate
                            .estimatedUnitCost
                        )}

                        {expenseTemplate
                          .estimatedUnitCost !==
                          undefined && (
                          <span className="ml-1 text-slate-400">
                            / {expenseTemplate.unit}
                          </span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <TemplateStatusButton
                          status={
                            expenseTemplate.status
                          }
                          onToggle={() =>
                            toggleExpenseTemplateStatus(
                              expenseTemplate.id
                            )
                          }
                        />
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                        {formatUsage(usageCount)}
                      </td>

                      <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                        <p className="truncate">
                          {expenseTemplate.description ??
                            "—"}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <TemplateActions
                          entityLabel="expense template"
                          usageCount={usageCount}
                          onEdit={() =>
                            openEditExpenseTemplateDialog(
                              expenseTemplate
                            )
                          }
                          onDelete={() =>
                            handleDelete(
                              expenseTemplate
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </TemplateTableShell>
          )}

          <TemplateListFooter
            visibleCount={
              filteredExpenseTemplates.length
            }
            totalCount={
              expenseTemplates.length
            }
            activeCount={activeCount}
            entityLabel="expense templates"
          />
        </div>
      </section>

      {isExpenseTemplateDialogOpen && (
        <ExpenseTemplateFormDialog
          key={
            editingExpenseTemplate?.id ??
            "new-expense-template"
          }
          open={
            isExpenseTemplateDialogOpen
          }
          editingExpenseTemplate={
            editingExpenseTemplate
          }
          onClose={
            closeExpenseTemplateDialog
          }
          onSave={saveExpenseTemplate}
          isNameAvailable={
            isExpenseTemplateNameAvailable
          }
        />
      )}
    </>
  );
}
