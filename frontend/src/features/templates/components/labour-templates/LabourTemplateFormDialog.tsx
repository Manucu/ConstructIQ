import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import {
  workerRoles,
} from "@/features/company/data/workers";

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
      ?.estimatedHourlyRate !== undefined
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
      editingLabourTemplate
        ?.description ?? ""
    );

  const [saveError, setSaveError] =
    useState<string | null>(null);

  const normalizedRole = role.trim();

  const parsedHourlyRate =
    estimatedHourlyRate.trim() === ""
      ? undefined
      : Number(estimatedHourlyRate);

  const isHourlyRateValid =
    parsedHourlyRate === undefined ||
    (Number.isFinite(parsedHourlyRate) &&
      parsedHourlyRate >= 0);

  const isRoleValid =
    normalizedRole.length > 0;

  const hasAvailableRole =
    !isRoleValid ||
    isRoleAvailable(
      normalizedRole,
      editingLabourTemplate?.id
    );

  const isValid =
    isRoleValid &&
    hasAvailableRole &&
    isHourlyRateValid;

  function handleSave() {
    setSaveError(null);

    if (!isValid) {
      return;
    }

    const saved = onSave({
      role: normalizedRole,
      estimatedHourlyRate:
        parsedHourlyRate,
      status,
      description:
        description.trim() || undefined,
    });

    if (!saved) {
      setSaveError(
        "This labour role already exists."
      );
    }
  }

  return (
    <AppModal
      open={open}
      title={
        editingLabourTemplate
          ? "Edit Labour Template"
          : "Add Labour Template"
      }
      description="Create reusable labour definitions for project templates."
      onClose={onClose}
      footer={
        <>
          <AppButton
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </AppButton>

          <AppButton
            disabled={!isValid}
            onClick={handleSave}
          >
            {editingLabourTemplate
              ? "Save Changes"
              : "Add Labour Template"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <AppInput
            label="Labour Role"
            value={role}
            list="labour-role-suggestions"
            placeholder="Example: Roofer"
            autoComplete="off"
            onChange={event => {
              setRole(event.target.value);
              setSaveError(null);
            }}
          />

          <datalist id="labour-role-suggestions">
            {workerRoles.map(workerRole => (
              <option
                key={workerRole}
                value={workerRole}
              />
            ))}
          </datalist>

          {!isRoleValid && role.length > 0 && (
            <p className="mt-2 text-sm text-red-600">
              Labour role is required.
            </p>
          )}

          {isRoleValid &&
            !hasAvailableRole && (
              <p className="mt-2 text-sm text-red-600">
                This labour role already exists.
              </p>
            )}

          <p className="mt-2 text-xs text-slate-500">
            Select a suggested role or type a
            custom one.
          </p>
        </div>

        <div>
          <AppInput
            label="Estimated Hourly Rate"
            type="number"
            min="0"
            step="0.01"
            value={estimatedHourlyRate}
            placeholder="Example: 18"
            onChange={event =>
              setEstimatedHourlyRate(
                event.target.value
              )
            }
          />

          {!isHourlyRateValid && (
            <p className="mt-2 text-sm text-red-600">
              Hourly rate must be zero or greater.
            </p>
          )}
        </div>

        <AppInput
          label="Description"
          value={description}
          placeholder="Optional description"
          onChange={event =>
            setDescription(
              event.target.value
            )
          }
        />

        <div>
          <label
            htmlFor="labour-template-status"
            className="text-sm font-medium text-slate-700"
          >
            Status
          </label>

          <select
            id="labour-template-status"
            value={status}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            onChange={event =>
              setStatus(
                event.target
                  .value as LabourTemplateStatus
              )
            }
          >
            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>
          </select>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            You can select an existing workforce
            role or enter a custom role for this
            labour template.
          </p>
        </div>

        {saveError && (
          <p className="text-sm text-red-600">
            {saveError}
          </p>
        )}
      </div>
    </AppModal>
  );
}