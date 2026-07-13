import { Eye, Trash2 } from "lucide-react";

import { AppButton } from "@/components/ui/AppButton";

import type { WorkingDayPhoto } from "../../hooks/useWorkingDayPhotos";

type PhotoGridProps = {
  photos: WorkingDayPhoto[];
  onPreview: (photo: WorkingDayPhoto) => void;
  onDelete: (photoId: string) => void;
};

export default function PhotoGrid({
  photos,
  onPreview,
  onDelete,
}: PhotoGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {photos.map((photo) => (
        <article
          key={photo.id}
          className="overflow-hidden rounded-xl border bg-white"
        >
          <button
            type="button"
            className="block w-full"
            aria-label={`Preview ${photo.name}`}
            onClick={() => onPreview(photo)}
          >
            <img
              src={photo.url}
              alt={photo.name}
              className="h-52 w-full object-cover"
            />
          </button>

          <div className="flex items-center justify-between gap-3 p-4">
            <p className="min-w-0 truncate text-sm font-medium">
              {photo.name}
            </p>

            <div className="flex shrink-0 items-center gap-1">
              <AppButton
                type="button"
                size="icon"
                variant="ghost"
                aria-label={`Preview ${photo.name}`}
                onClick={() => onPreview(photo)}
              >
                <Eye className="h-4 w-4" />
              </AppButton>

              <AppButton
                type="button"
                size="icon"
                variant="ghost"
                aria-label={`Delete ${photo.name}`}
                onClick={() => onDelete(photo.id)}
              >
                <Trash2 className="h-4 w-4" />
              </AppButton>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}