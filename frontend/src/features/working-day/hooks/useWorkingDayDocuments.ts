import { useState } from "react";

import type { WorkingDay } from "../types/workingDay";

export type WorkingDayDocumentItem = {
  id: string;
  name: string;
  url: string;
  category: string;
  mimeType?: string;
  size?: number;
  uploadedBy: string;
  uploadedAt: string;
  isLocal: boolean;
};

type UseWorkingDayDocumentsParams = {
  workingDay: WorkingDay;
};

function getDocumentCategory(file: File) {
  if (file.type === "application/pdf") {
    return "PDF";
  }

  if (file.type.startsWith("image/")) {
    return "Image";
  }

  if (
    file.type.includes("word") ||
    file.name.endsWith(".doc") ||
    file.name.endsWith(".docx")
  ) {
    return "Word";
  }

  if (
    file.type.includes("spreadsheet") ||
    file.type.includes("excel") ||
    file.name.endsWith(".xls") ||
    file.name.endsWith(".xlsx")
  ) {
    return "Spreadsheet";
  }

  return "Other";
}

export function useWorkingDayDocuments({
  workingDay,
}: UseWorkingDayDocumentsParams) {
  const initialDocuments: WorkingDayDocumentItem[] =
    workingDay.documents.map((document) => ({
      id: document.id,
      name: document.name,
      url: document.fileUrl,
      category: document.category,
      uploadedBy: document.uploadedBy,
      uploadedAt: document.uploadedAt,
      isLocal: false,
    }));

  const [documents, setDocuments] =
    useState<WorkingDayDocumentItem[]>(initialDocuments);

  function uploadDocuments(files: FileList | null) {
    if (!files) {
      return;
    }

    const uploadedDocuments: WorkingDayDocumentItem[] =
      Array.from(files).map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        url: URL.createObjectURL(file),
        category: getDocumentCategory(file),
        mimeType: file.type,
        size: file.size,
        uploadedBy: "Current User",
        uploadedAt: new Date().toLocaleString(),
        isLocal: true,
      }));

    setDocuments((currentDocuments) => [
      ...currentDocuments,
      ...uploadedDocuments,
    ]);
  }

  function deleteDocument(documentId: string) {
    setDocuments((currentDocuments) => {
      const documentToDelete = currentDocuments.find(
        (document) => document.id === documentId
      );

      if (documentToDelete?.isLocal) {
        URL.revokeObjectURL(documentToDelete.url);
      }

      return currentDocuments.filter(
        (document) => document.id !== documentId
      );
    });
  }

  return {
    documents,
    uploadDocuments,
    deleteDocument,
  };
}