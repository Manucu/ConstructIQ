import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { expenseCategories } from "@/features/company/data/expenseCategories";
import SectionCard from "../shared/SectionCard";
import type { WorkingDay } from "../../types/workingDay";

type WorkingDayExpensesProps = {
  workingDay: WorkingDay;
};

function getExpenseCategory(categoryId: string) {
  return expenseCategories.find((category) => category.id === categoryId);
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
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Search
          </Button>

          <Button size="sm">
            Add Expense
          </Button>
        </div>
      }
    >
      {workingDay.expenses.map((entry) => {
        const category = getExpenseCategory(entry.expenseCategoryId);

        return (
          <div
            key={entry.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h3 className="font-semibold">{entry.description}</h3>

              <p className="text-sm text-muted-foreground">
                {category?.name ?? "Unknown category"}
              </p>

              {entry.notes && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {entry.notes}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline">
                {formatCurrency(entry.amount, entry.currency)}
              </Badge>

              <Badge>{entry.status}</Badge>
            </div>
          </div>
        );
      })}
    </SectionCard>
  );
}