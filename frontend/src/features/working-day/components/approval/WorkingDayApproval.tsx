import { Button } from "@/components/ui/button";

import SectionCard from "../shared/SectionCard";
import StatusBadge from "../shared/StatusBadge";

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
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline">
            Save Draft
          </Button>

          <Button type="button">
            Submit for Approval
          </Button>
        </div>
      }
    >
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Status</span>

          <StatusBadge status={approval.status} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Submitted By</p>
            <p>{approval.submittedBy ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Submitted At</p>
            <p>{approval.submittedAt ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Approved By</p>
            <p>{approval.approvedBy ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Approved At</p>
            <p>{approval.approvedAt ?? "-"}</p>
          </div>
        </div>

        {approval.rejectionReason && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <p className="text-sm font-medium">Rejection reason</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {approval.rejectionReason}
            </p>
          </div>
        )}
      </div>
    </SectionCard>
  );
}