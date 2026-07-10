import { Badge } from "@/components/ui/badge";
import StatusBadge from "../shared/StatusBadge";

import { expenseCategories } from "@/features/company/data/expenseCategories";

import EntityRow from "../shared/EntityRow";
import EntityToolbar from "../shared/EntityToolbar";
import SectionCard from "../shared/SectionCard";

import type { WorkingDay } from "../../types/workingDay";

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
  return (
    <SectionCard
      title="Expenses"
      icon="💰"
      actions={
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
      }
    >
      {workingDay.expenses.map((entry) => {
        const category = getExpenseCategory(
          entry.expenseCategoryId
        );

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