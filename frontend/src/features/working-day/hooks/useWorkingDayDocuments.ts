import { useWorkingDayContext } from "../context/useWorkingDayContext";

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

function getDocumentCategory(file: File) {
  const lowerCaseName = file.name.toLowerCase();

  if (file.type === "application/pdf") {
    return "PDF";
  }

  if (file.type.startsWith("image/")) {
    return "Image";
  }

  if (
    file.type.includes("word") ||
    lowerCaseName.endsWith(".doc") ||
    lowerCaseName.endsWith(".docx")
  ) {
    return "Word";
  }

  if (
    file.type.includes("spreadsheet") ||
    file.type.includes("excel") ||
    lowerCaseName.endsWith(".xls") ||
    lowerCaseName.endsWith(".xlsx")
  ) {
    return "Spreadsheet";
  }

  return "Other";
}

export function useWorkingDayDocuments() {
  const { documents, setDocuments } = useWorkingDayContext();

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