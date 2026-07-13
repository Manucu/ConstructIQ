import { useRef } from "react";
import { Upload } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import SectionCard from "@/components/common/SectionCard";

import { AppButton } from "@/components/ui/AppButton";

import { useWorkingDayDocuments } from "../../hooks/useWorkingDayDocuments";
import type { WorkingDay } from "../../types/workingDay";

import DocumentList from "./DocumentList";

type WorkingDayDocumentsProps = {
  workingDay: WorkingDay;
};

export default function WorkingDayDocuments({
  workingDay,
}: WorkingDayDocumentsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    documents,
    uploadDocuments,
    deleteDocument,
  } = useWorkingDayDocuments({ workingDay });

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  return (
    <SectionCard
      title="Documents"
      icon="📄"
      actions={
        <AppButton
          type="button"
          onClick={openFilePicker}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Documents
        </AppButton>
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
      />

      {documents.length === 0 ? (
        <EmptyState
          icon="📄"
          title="No documents uploaded"
          description="Upload reports, drawings, invoices or delivery documents."
          action={
            <AppButton
              type="button"
              variant="outline"
              onClick={openFilePicker}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload First Document
            </AppButton>
          }
        />
      ) : (
        <DocumentList
          documents={documents}
          onDelete={deleteDocument}
        />
      )}
    </SectionCard>
  );
}