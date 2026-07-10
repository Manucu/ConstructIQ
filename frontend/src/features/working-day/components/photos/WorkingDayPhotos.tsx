import { Button } from "@/components/ui/button";

import SectionCard from "@/components/common/SectionCard";
import type { WorkingDay } from "../../types/workingDay";

type WorkingDayPhotosProps = {
  workingDay: WorkingDay;
};

export default function WorkingDayPhotos({
  workingDay,
}: WorkingDayPhotosProps) {
  return (
    <SectionCard
      title="Photos"
      icon="📷"
      actions={
        <Button size="sm">
          Upload Photo
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workingDay.photos.map((photo) => (
          <div key={photo.id} className="rounded-lg border p-4">
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
              Photo Preview
            </div>

            <h3 className="font-semibold">{photo.title}</h3>

            {photo.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {photo.description}
              </p>
            )}

            <p className="mt-3 text-xs text-muted-foreground">
              Uploaded by {photo.uploadedBy} • {photo.uploadedAt}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}