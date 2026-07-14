import { useRef } from "react";
import { Upload } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import SectionCard from "@/components/common/SectionCard";

import { AppButton } from "@/components/ui/AppButton";

import { useWorkingDayDocuments } from "../../hooks/useWorkingDayDocuments";

import DocumentList from "./DocumentList";

import { useWorkingDayContext } from "../../context/useWorkingDayContext";



export default function WorkingDayDocuments() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    documents,
    uploadDocuments,
    deleteDocument,
  } = useWorkingDayDocuments();

  const { isLocked } = useWorkingDayContext();

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  return (
    <SectionCard
      title="Documents"
      icon="📄"
      actions={
        isLocked ? undefined : (
          <AppButton
            type="button"
            onClick={openFilePicker}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Documents
          </AppButton>
        )
      }
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
        onChange={(event) => {
          uploadDocuments(event.target.files);
          event.target.value = "";
        }}
        disabled={isLocked}
      />

      {documents.length === 0 ? (
        <EmptyState
          icon="📄"
          title="No documents uploaded"
          description="Upload reports, drawings, invoices or delivery documents."
          action={
            !isLocked ? (
              <AppButton
                type="button"
                variant="outline"
                onClick={openFilePicker}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload First Document
              </AppButton>
            ) : undefined
          }
        />
      ) : (
        <DocumentList
          documents={documents}
          onDelete={deleteDocument}
          isLocked={isLocked}
        />
      )}
    </SectionCard>
  );
}