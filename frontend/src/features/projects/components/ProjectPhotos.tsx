import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const photos = [
  {
    id: "1",
    title: "Foundation reinforcement",
    stage: "Foundation",
    date: "24 June 2026",
    count: 8,
  },
  {
    id: "2",
    title: "Formwork completed",
    stage: "Foundation",
    date: "23 June 2026",
    count: 5,
  },
  {
    id: "3",
    title: "Site preparation",
    stage: "Foundation",
    date: "22 June 2026",
    count: 6,
  },
];

export default function ProjectPhotos() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📷 Project Photos</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-3">
        {photos.map((photo) => (
          <div key={photo.id} className="rounded-lg border p-4">
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              Photo Preview
            </div>

            <h3 className="font-semibold">{photo.title}</h3>

            <p className="text-sm text-muted-foreground">
              {photo.stage} • {photo.date}
            </p>

            <div className="mt-3">
              <Badge variant="secondary">{photo.count} photos</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}