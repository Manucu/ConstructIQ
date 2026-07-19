import {
  useState,
} from "react";

import {
  TemplateDialog,
  TemplateFormGrid,
  TemplateNumberField,
  TemplateStatusField,
  TemplateTextField,
  TemplateTextareaField,
  parseOptionalNonNegativeNumber,
} from "@/features/templates/components/shared/forms";

import type {
  LabourTemplate,
  LabourTemplateStatus,
} from "@/features/templates/data/labourTemplates";

import type {
  SaveLabourTemplateValues,
} from "@/features/templates/hooks/useLabourTemplates";

type LabourTemplateFormDialogProps = {
  open: boolean;
  editingLabourTemplate:
    | LabourTemplate
    | null;
  onClose: () => void;
  onSave: (
    values: SaveLabourTemplateValues
  ) => boolean;
  isRoleAvailable: (
    role: string,
    ignoredLabourTemplateId?: string
  ) => boolean;
};

const labourRoleSuggestions = [
  "General Labourer",
  "Carpenter",
  "Electrician",
  "Plumber",
  "Mason",
  "Painter",
  "Welder",
  "Site Supervisor",
];

export default function LabourTemplateFormDialog({
  open,
  editingLabourTemplate,
  onClose,
  onSave,
  isRoleAvailable,
}: LabourTemplateFormDialogProps) {
  const [role, setRole] = useState(
    editingLabourTemplate?.role ?? ""
  );

  const [
    estimatedHourlyRate,
    setEstimatedHourlyRate,
  ] = useState(
    editingLabourTemplate
      ?.estimatedHourlyRate !==
      undefined
      ? String(
          editingLabourTemplate
            .estimatedHourlyRate
        )
      : ""
  );

  const [status, setStatus] =
    useState<LabourTemplateStatus>(
      editingLabourTemplate?.status ??
        "ACTIVE"
    );

  const [description, setDescription] =
    useState(
      editingLabourTemplate?.description ??
        ""
    );

  const [saveError, setSaveError] =
    useState<string | null>(null);

  const parsedRate =
    parseOptionalNonNegativeNumber(
      estimatedHourlyRate
    );

  const hasAvailableRole =
    role.trim() !== "" &&
    isRoleAvailable(
      role,
      editingLabourTemplate?.id
    );

  const isValid =
    role.trim() !== "" &&
    parsedRate.isValid &&
    hasAvailableRole;

  function handleSave() {
    if (!isValid) {
      return;
    }

    const saved = onSave({
      role,
      estimatedHourlyRate:
        parsedRate.value,
      status,
      description,
    });

    if (!saved) {
      setSaveError(
        "A labour template with this role already exists."
      );
    }
  }

  return (
    <TemplateDialog
      open={open}
      title={
        editingLabourTemplate
          ? "Edit Labour Template"
          : "Add Labour Template"
      }
      description={
        editingLabourTemplate
          ? `Update ${editingLabourTemplate.role}.`
          : "Create a reusable labour role for project estimates."
      }
      saveLabel={
        editingLabourTemplate
          ? "Save Changes"
          : "Add Labour Template"
      }
      isValid={isValid}
      error={saveError}
      onClose={onClose}
      onSave={handleSave}
    >
      <datalist id="labour-role-suggestions">
        {labourRoleSuggestions.map(
          suggestion => (
            <option
              key={suggestion}
              value={suggestion}
            />
          )
        )}
      </datalist>

      <TemplateFormGrid>
        <TemplateTextField
          label="Role"
          value={role}
          placeholder="Example: Electrician"
          list="labour-role-suggestions"
          autoFocus
          error={
            role.trim() !== "" &&
            !hasAvailableRole
              ? "This labour role is already in use."
              : null
          }
          onChange={value => {
            setRole(value);
            setSaveError(null);
          }}
        />

        <TemplateNumberField
          label="Estimated Hourly Rate"
          value={estimatedHourlyRate}
          placeholder="Example: 28"
          error={
            parsedRate.isValid
              ? null
              : "The estimated hourly rate must be zero or greater."
          }
          onChange={
            setEstimatedHourlyRate
          }
        />
      </TemplateFormGrid>

      <TemplateStatusField
        value={status}
        onChange={setStatus}
      />

      <TemplateTextareaField
        label="Description"
        value={description}
        placeholder="Add notes about skills, responsibilities or requirements."
        onChange={setDescription}
      />
    </TemplateDialog>
  );
}
