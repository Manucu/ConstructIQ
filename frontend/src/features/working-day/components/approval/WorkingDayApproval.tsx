import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import SectionCard from "../shared/SectionCard";
import type { WorkingDay } from "../../types/workingDay";

type WorkingDayApprovalProps = {
  workingDay: WorkingDay;
};

export default function WorkingDayApproval({
  workingDay,
}: WorkingDayApprovalProps) {
  const { approval } = workingDay;

  return (
    <SectionCard
      title="Approval"
      icon="✅"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            Save Draft
          </Button>

          <Button>
            Submit for Approval
          </Button>
        </div>
      }
    >
      <div className="rounded-lg border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Status</span>

          <Badge>{approval.status}</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Submitted By
            </p>

            <p>
              {approval.submittedBy ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Submitted At
            </p>

            <p>
              {approval.submittedAt ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Approved By
            </p>

            <p>
              {approval.approvedBy ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Approved At
            </p>

            <p>
              {approval.approvedAt ?? "-"}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}