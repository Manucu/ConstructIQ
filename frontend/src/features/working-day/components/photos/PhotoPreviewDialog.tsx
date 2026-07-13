import { Trash2 } from "lucide-react";

import { AppButton } from "@/components/ui/AppButton";
import { AppModal } from "@/components/ui/AppModal";

import type { WorkingDayPhoto } from "../../hooks/useWorkingDayPhotos";

type PhotoPreviewDialogProps = {
  photo: WorkingDayPhoto | null;
  onClose: () => void;
  onDelete: (photoId: string) => void;
};

export default function PhotoPreviewDialog({
  photo,
  onClose,
  onDelete,
}: PhotoPreviewDialogProps) {
  if (!photo) {
    return null;
  }

  const currentPhoto = photo;

  function handleDelete() {
    onDelete(currentPhoto.id);
  }

  return (
    <AppModal
      open
      title={currentPhoto.name}
      description="Working day photo preview."
      onClose={onClose}
      footer={
        <>
          <AppButton
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Close
          </AppButton>

          <AppButton
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Photo
          </AppButton>
        </>
      }
    >
      <div className="overflow-hidden rounded-xl bg-slate-100">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.name}
          className="max-h-[65vh] w-full object-contain"
        />
      </div>
    </AppModal>
  );
}