import { useState } from "react";

import type {
  ApprovalStatus,
  WorkingDay,
} from "../types/workingDay";

type UseWorkingDayApprovalParams = {
  workingDay: WorkingDay;
};

export function useWorkingDayApproval({
  workingDay,
}: UseWorkingDayApprovalParams) {
  const [status, setStatus] = useState<ApprovalStatus>(
    workingDay.approval.status
  );

  function submit() {
    setStatus("PENDING");
  }

  function approve() {
    setStatus("APPROVED");
  }

  function reject() {
    setStatus("REJECTED");
  }

  return {
    status,
    submit,
    approve,
    reject,
  };
}