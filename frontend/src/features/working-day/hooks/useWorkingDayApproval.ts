import { useWorkingDayContext } from "../context/useWorkingDayContext";

export function useWorkingDayApproval() {
  const {
    approvalStatus,
    setApprovalStatus,
  } = useWorkingDayContext();

  function submit() {
    setApprovalStatus("PENDING");
  }

  function approve() {
    setApprovalStatus("APPROVED");
  }

  function reject() {
    setApprovalStatus("REJECTED");
  }

  return {
    status: approvalStatus,
    submit,
    approve,
    reject,
  };
}