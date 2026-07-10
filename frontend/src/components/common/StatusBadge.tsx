import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: string;
};

function getVariant(
  status: string
): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case "APPROVED":
    case "COMPLETED":
    case "ACTIVE":
    case "PRESENT":
      return "default";

    case "PENDING":
    case "IN_PROGRESS":
    case "SUBMITTED":
    case "DRAFT":
      return "secondary";

    case "REJECTED":
    case "BLOCKED":
    case "INACTIVE":
    case "ABSENT":
      return "destructive";

    default:
      return "outline";
  }
}

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant={getVariant(status)}>
      {formatStatus(status)}
    </Badge>
  );
}