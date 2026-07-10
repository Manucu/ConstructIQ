import { Badge } from "@/components/ui/badge";

import { expenseCategories } from "@/features/company/data/expenseCategories";
import type { WorkingDay } from "../../types/workingDay";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import EntityToolbar from "@/components/common/EntityToolbar";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

type WorkingDayExpensesProps = {
  workingDay: WorkingDay;
};

function getExpenseCategory(categoryId: string) {
  return expenseCategories.find(
    (category) => category.id === categoryId
  );
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function WorkingDayExpenses({
  workingDay,
}: WorkingDayExpensesProps) {
  const toolbar = (
    <EntityToolbar
      searchLabel="Search Category"
      addLabel="Add Expense"
      onSearch={() => {
        console.log("Search expense category");
      }}
      onAdd={() => {
        console.log("Add expense");
      }}
    />
  );

  if (workingDay.expenses.length === 0) {
    return (
      <SectionCard title="Expenses" icon="💰" actions={toolbar}>
        <EmptyState
          icon="💰"
          title="No expenses added"
          description="Add the first expense recorded for this working day."
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Expenses" icon="💰" actions={toolbar}>
      {workingDay.expenses.map((entry) => {
        const category = getExpenseCategory(entry.expenseCategoryId);

        return (
          <EntityRow
            key={entry.id}
            title={entry.description}
            subtitle={category?.name ?? "Unknown Category"}
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
                  {formatCurrency(entry.amount, entry.currency)}
                </Badge>

                <StatusBadge status={entry.status} />
              </div>
            }
          />
        );
      })}
    </SectionCard>
  );
}