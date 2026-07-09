import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const diaryEntries = [
  {
    id: "1",
    date: "24 June 2026",
    stage: "Foundation",
    weather: "Sunny",
    workers: 12,
    hours: 94,
    status: "Draft",
    notes:
      "Foundation reinforcement work continued. Concrete preparation is planned for tomorrow.",
  },
  {
    id: "2",
    date: "23 June 2026",
    stage: "Foundation",
    weather: "Cloudy",
    workers: 10,
    hours: 80,
    status: "Approved",
    notes:
      "Formwork installation completed and checked by the site engineer.",
  },
  {
    id: "3",
    date: "22 June 2026",
    stage: "Foundation",
    weather: "Sunny",
    workers: 9,
    hours: 72,
    status: "Approved",
    notes:
      "Excavation and site preparation works completed.",
  },
];

function getStatusVariant(status: string) {
  if (status === "Approved") {
    return "default";
  }

  if (status === "Draft") {
    return "secondary";
  }

  return "outline";
}

export default function ProjectSiteDiary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📅 Site Diary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {diaryEntries.map((entry) => (
          <div key={entry.id} className="rounded-lg border p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{entry.date}</h3>

                <p className="text-sm text-muted-foreground">
                  {entry.stage} • {entry.weather}
                </p>
              </div>

              <Badge variant={getStatusVariant(entry.status)}>
                {entry.status}
              </Badge>
            </div>

            <div className="mb-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm text-muted-foreground">Workers</p>
                <p className="font-semibold">{entry.workers}</p>
              </div>

              <div className="rounded-md bg-muted p-3">
                <p className="text-sm text-muted-foreground">Hours</p>
                <p className="font-semibold">{entry.hours} h</p>
              </div>
            </div>

            <p className="text-sm">{entry.notes}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}