import { useRef } from "react";
import { Upload } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import SectionCard from "@/components/common/SectionCard";

import { AppButton } from "@/components/ui/AppButton";

import { useWorkingDayPhotos } from "../../hooks/useWorkingDayPhotos";

import PhotoGrid from "./PhotoGrid";
import PhotoPreviewDialog from "./PhotoPreviewDialog";

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

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  return (
    <>
      <SectionCard
        title="Photos"
        icon="📷"
        actions={
          <AppButton
            type="button"
            onClick={openFilePicker}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Photos
          </AppButton>
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
        />

        {photos.length === 0 ? (
          <EmptyState
            icon="📷"
            title="No photos uploaded"
            description="Upload site photos for this working day."
            action={
              <AppButton
                type="button"
                variant="outline"
                onClick={openFilePicker}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload First Photo
              </AppButton>
            }
          />
        ) : (
          <PhotoGrid
            photos={photos}
            onPreview={openPreview}
            onDelete={deletePhoto}
          />
        )}
      </SectionCard>

      <PhotoPreviewDialog
        photo={selectedPhoto}
        onClose={closePreview}
        onDelete={deletePhoto}
      />
    </>
  );
}