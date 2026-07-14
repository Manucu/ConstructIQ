import { Card, CardContent } from "@/components/ui/card";

import { useWorkingDayContext } from "../../context/useWorkingDayContext";

export default function WorkingDaySummary() {
  const {
    workingDay,
    photos,
    documents,
  } = useWorkingDayContext();

  const totalWorkers = workingDay.attendance.filter(
    (entry) => entry.present
  ).length;

  const totalHours = workingDay.attendance.reduce(
    (sum, entry) => sum + entry.hoursWorked,
    0
  );

  const totalEquipmentHours = workingDay.equipment.reduce(
    (sum, entry) => sum + entry.hoursUsed,
    0
  );

  const totalExpenses = workingDay.expenses.reduce(
    (sum, entry) => sum + entry.amount,
    0
  );

  const summaryItems = [
    {
      label: "Workers",
      value: totalWorkers,
    },
    {
      label: "Hours",
      value: `${totalHours} h`,
    },
    {
      label: "Activities",
      value: workingDay.activities.length,
    },
    {
      label: "Materials",
      value: workingDay.materials.length,
    },
    {
      label: "Equipment",
      value: `${totalEquipmentHours} h`,
    },
    {
      label: "Expenses",
      value: `€${totalExpenses}`,
    },
    {
      label: "Photos",
      value: photos.length,
    },
    {
      label: "Documents",
      value: documents.length,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summaryItems.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              {item.label}
            </p>

            <p className="text-2xl font-bold">
              {item.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}