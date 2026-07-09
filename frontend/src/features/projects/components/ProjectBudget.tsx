import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const budgetItems = [
  {
    id: "1",
    category: "Labor",
    estimated: 18000,
    actual: 14200,
  },
  {
    id: "2",
    category: "Materials",
    estimated: 24000,
    actual: 21350,
  },
  {
    id: "3",
    category: "Equipment",
    estimated: 6000,
    actual: 4200,
  },
  {
    id: "4",
    category: "Transport",
    estimated: 2500,
    actual: 1850,
  },
  {
    id: "5",
    category: "Other",
    estimated: 1500,
    actual: 900,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProjectBudget() {
  const estimatedTotal = budgetItems.reduce(
    (sum, item) => sum + item.estimated,
    0
  );

  const actualTotal = budgetItems.reduce((sum, item) => sum + item.actual, 0);

  const remaining = estimatedTotal - actualTotal;

  const consumption = Math.round((actualTotal / estimatedTotal) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>💰 Project Budget</CardTitle>

          <Badge variant={remaining >= 0 ? "default" : "destructive"}>
            {consumption}% Used
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Estimated Budget</p>
            <p className="text-2xl font-bold">
              {formatCurrency(estimatedTotal)}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Actual Cost</p>
            <p className="text-2xl font-bold">
              {formatCurrency(actualTotal)}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="text-2xl font-bold">
              {formatCurrency(remaining)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {budgetItems.map((item) => {
            const variance = item.estimated - item.actual;

            return (
              <div
                key={item.id}
                className="grid gap-3 rounded-lg border p-4 md:grid-cols-4"
              >
                <div>
                  <p className="font-medium">{item.category}</p>
                  <p className="text-sm text-muted-foreground">Category</p>
                </div>

                <div>
                  <p className="font-medium">
                    {formatCurrency(item.estimated)}
                  </p>
                  <p className="text-sm text-muted-foreground">Estimated</p>
                </div>

                <div>
                  <p className="font-medium">
                    {formatCurrency(item.actual)}
                  </p>
                  <p className="text-sm text-muted-foreground">Actual</p>
                </div>

                <div>
                  <p
                    className={
                      variance >= 0
                        ? "font-medium text-green-600"
                        : "font-medium text-red-600"
                    }
                  >
                    {formatCurrency(variance)}
                  </p>
                  <p className="text-sm text-muted-foreground">Variance</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}