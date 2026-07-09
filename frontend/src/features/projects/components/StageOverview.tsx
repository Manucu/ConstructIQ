import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stageDetails } from "@/features/projects/data/stageDetails";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function StageOverview() {
  const remaining = stageDetails.budget - stageDetails.spent;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-3xl font-bold">{stageDetails.progress}%</p>
          <p className="text-sm text-muted-foreground">Stage completion</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-3xl font-bold">
            {formatCurrency(stageDetails.budget)}
          </p>
          <p className="text-sm text-muted-foreground">Planned budget</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Remaining</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-3xl font-bold">{formatCurrency(remaining)}</p>
          <p className="text-sm text-muted-foreground">
            After approved costs
          </p>
        </CardContent>
      </Card>
    </div>
  );
}