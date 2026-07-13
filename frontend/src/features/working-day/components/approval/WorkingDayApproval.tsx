import { Check, Send, X } from "lucide-react";

import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";
import { AppButton } from "@/components/ui/AppButton";

import { useWorkingDayApproval } from "../../hooks/useWorkingDayApproval";
import type { WorkingDay } from "../../types/workingDay";

type WorkingDayApprovalProps = {
  workingDay: WorkingDay;
};

export default function WorkingDayApproval({
  workingDay,
}: WorkingDayApprovalProps) {
  const { status, submit, approve, reject } =
    useWorkingDayApproval({ workingDay });

  const isNotSubmitted = status === "NOT_SUBMITTED";
  const isPending = status === "PENDING";
  const isApproved = status === "APPROVED";
  const isRejected = status === "REJECTED";

  return (
    <SectionCard
      title="Approval"
      icon="✅"
      actions={
        <div className="flex flex-wrap gap-2">
          {isNotSubmitted && (
            <AppButton type="button" onClick={submit}>
              <Send className="mr-2 h-4 w-4" />
              Submit for Approval
            </AppButton>
          )}

          {isPending && (
            <>
              <AppButton
                type="button"
                variant="outline"
                onClick={reject}
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </AppButton>

              <AppButton type="button" onClick={approve}>
                <Check className="mr-2 h-4 w-4" />
                Approve
              </AppButton>
            </>
          )}

          {isRejected && (
            <AppButton type="button" onClick={submit}>
              <Send className="mr-2 h-4 w-4" />
              Resubmit
            </AppButton>
          )}
        </div>
      }
    >
      <div className="space-y-5 rounded-xl border p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">
              Current status
            </p>

            <div className="mt-2">
              <StatusBadge status={status} />
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Working Day
            </p>

            <p className="mt-1 font-medium">{workingDay.date}</p>
          </div>
        </div>

        <div className="grid gap-4 border-t pt-5 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Submitted By
            </p>

            <p className="mt-1">
              {isNotSubmitted
                ? "-"
                : workingDay.approval.submittedBy ??
                  workingDay.engineerName}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Submitted At
            </p>

            <p className="mt-1">
              {isNotSubmitted
                ? "-"
                : workingDay.approval.submittedAt ??
                  "Current session"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Approved By
            </p>

            <p className="mt-1">
              {isApproved
                ? workingDay.approval.approvedBy ?? "Owner"
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Approved At
            </p>

            <p className="mt-1">
              {isApproved
                ? workingDay.approval.approvedAt ??
                  "Current session"
                : "-"}
            </p>
          </div>
        </div>

        {isNotSubmitted && (
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-muted-foreground">
              This working day is still editable. Submit it after all
              information has been completed.
            </p>
          </div>
        )}

        {isPending && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-900">
              This working day is waiting for Owner approval.
            </p>
          </div>
        )}

        {isApproved && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-green-900">
              This working day has been approved.
            </p>
          </div>
        )}

        {isRejected && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-900">
              This working day was rejected. Make the required changes
              and submit it again.
            </p>
          </div>
        )}
      </div>
    </SectionCard>
  );
}