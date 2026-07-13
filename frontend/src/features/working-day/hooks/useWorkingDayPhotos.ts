import { useState } from "react";

import { useWorkingDayContext } from "../context/useWorkingDayContext";

export type WorkingDayPhoto = {
  id: string;
  name: string;
  url: string;
};

export function useWorkingDayPhotos() {
  const { photos, setPhotos } = useWorkingDayContext();

  const [selectedPhoto, setSelectedPhoto] =
    useState<WorkingDayPhoto | null>(null);

  function uploadPhotos(files: FileList | null) {
    if (!files) {
      return;
    }

    const uploadedPhotos = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setPhotos((current) => [
      ...current,
      ...uploadedPhotos,
    ]);
  }

  function deletePhoto(photoId: string) {
    setPhotos((current) => {
      const photoToDelete = current.find(
        (photo) => photo.id === photoId
      );

      if (photoToDelete) {
        URL.revokeObjectURL(photoToDelete.url);
      }

      return current.filter((photo) => photo.id !== photoId);
    });

    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(null);
    }
  }

  function openPreview(photo: WorkingDayPhoto) {
    setSelectedPhoto(photo);
  }

  function closePreview() {
    setSelectedPhoto(null);
  }

  return {
    photos,
    selectedPhoto,
    uploadPhotos,
    deletePhoto,
    openPreview,
    closePreview,
  };
}