import { Download, ExternalLink, Trash2 } from "lucide-react";

import EntityRow from "@/components/common/EntityRow";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import type { WorkingDayDocumentItem } from "../../hooks/useWorkingDayDocuments";

type DocumentListProps = {
  documents: WorkingDayDocumentItem[];
  onDelete: (documentId: string) => void;
  isLocked?: boolean;

};

function formatFileSize(size?: number) {
  if (size === undefined) {
    return undefined;
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentList({
  documents,
  onDelete,
  isLocked = false,
}: DocumentListProps) {
  return (
    <div className="space-y-3">
      {documents.map((document) => {
        const fileSize = formatFileSize(document.size);

        return (
          <EntityRow
            key={document.id}
            title={document.name}
            subtitle={`Uploaded by ${document.uploadedBy} • ${document.uploadedAt}`}
            description={
              fileSize ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  File size: {fileSize}
                </p>
              ) : undefined
            }
            actions={
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {document.category}
                </Badge>

                <AppButton
                  type="button"
                  size="icon"
                  variant="ghost"
                  asChild
                >
                  <a
                    href={document.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${document.name}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </AppButton>

                <AppButton
                  type="button"
                  size="icon"
                  variant="ghost"
                  asChild
                >
                  <a
                    href={document.url}
                    download={document.name}
                    aria-label={`Download ${document.name}`}
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </AppButton>

                {!isLocked && (
                  <AppButton
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label={`Delete ${document.name}`}
                    onClick={() => onDelete(document.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </AppButton>
                )}
              </div>
            }
          />
        );
      })}
    </div>
  );
}