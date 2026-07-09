import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import SectionCard from "../shared/SectionCard";
import type { WorkingDay } from "../../types/workingDay";

type WorkingDayDocumentsProps = {
  workingDay: WorkingDay;
};

export default function WorkingDayDocuments({
  workingDay,
}: WorkingDayDocumentsProps) {
  return (
    <SectionCard
      title="Documents"
      icon="📄"
      actions={<Button size="sm">Upload Document</Button>}
    >
      {workingDay.documents.map((document) => (
        <div
          key={document.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div>
            <h3 className="font-semibold">{document.name}</h3>

            <p className="text-sm text-muted-foreground">
              Uploaded by {document.uploadedBy} • {document.uploadedAt}
            </p>
          </div>

          <Badge variant="secondary">{document.category}</Badge>
        </div>
      ))}
    </SectionCard>
  );
}