import { useRef } from "react";
import { Upload } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import SectionCard from "@/components/common/SectionCard";

import { AppButton } from "@/components/ui/AppButton";

import { useWorkingDayPhotos } from "../../hooks/useWorkingDayPhotos";

import PhotoGrid from "./PhotoGrid";
import PhotoPreviewDialog from "./PhotoPreviewDialog";
import { useWorkingDayContext } from "../../context/useWorkingDayContext";

export default function WorkingDayPhotos() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    photos,
    selectedPhoto,
    uploadPhotos,
    deletePhoto,
    openPreview,
    closePreview,
  } = useWorkingDayPhotos();

  const { isLocked } = useWorkingDayContext();

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  return (
    <>
      <SectionCard
        title="Photos"
        icon="📷"
        actions={
          isLocked ? undefined : (
            <AppButton
              type="button"
              onClick={openFilePicker}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Photos
            </AppButton>
          )
        }
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => {
            uploadPhotos(event.target.files);

            event.target.value = "";
          }}
          disabled={isLocked}
        />

        {photos.length === 0 ? (
          <EmptyState
            icon="📷"
            title="No photos uploaded"
            description="Upload site photos for this working day."
            action={
              !isLocked ? (
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={openFilePicker}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload First Photo
                </AppButton>
              ) : undefined
            }
          />
        ) : (
          <PhotoGrid
            photos={photos}
            onPreview={openPreview}
            onDelete={deletePhoto}
            isLocked={isLocked}

          />
        )}
      </SectionCard>

      <PhotoPreviewDialog
        photo={selectedPhoto}
        onClose={closePreview}
        onDelete={deletePhoto}
        isLocked={isLocked}

      />
    </>
  );
}