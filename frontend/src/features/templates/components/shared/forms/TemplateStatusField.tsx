import TemplateSelectField, {
  type TemplateSelectOption,
} from "@/features/templates/components/shared/forms/TemplateSelectField";

export type TemplateStatus =
  | "ACTIVE"
  | "INACTIVE";

type TemplateStatusFieldProps = {
  value: TemplateStatus;
  onChange: (
    value: TemplateStatus
  ) => void;
};

const statusOptions: TemplateSelectOption<TemplateStatus>[] =
  [
    {
      value: "ACTIVE",
      label: "Active",
    },
    {
      value: "INACTIVE",
      label: "Inactive",
    },
  ];

export default function TemplateStatusField({
  value,
  onChange,
}: TemplateStatusFieldProps) {
  return (
    <TemplateSelectField
      label="Status"
      value={value}
      options={statusOptions}
      onChange={onChange}
    />
  );
}