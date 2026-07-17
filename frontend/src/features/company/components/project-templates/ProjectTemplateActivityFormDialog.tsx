import { useMemo, useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type { ActivityTemplate } from "../../data/activityTemplates";

import type {
  ProjectTemplateActivity,
  ProjectTemplateActivityStatus,
} from "../../data/projectTemplateActivities";

import type {
  SaveProjectTemplateActivityValues,
} from "../../hooks/useCompanyProjectTemplateActivities";

type ProjectTemplateActivityFormDialogProps = {
  open: boolean;

  editingProjectTemplateActivity:
    | ProjectTemplateActivity
    | null;

  activityTemplates: ActivityTemplate[];

  onClose: () => void;

  onSave: (
    values: SaveProjectTemplateActivityValues
  ) => void;
};

function parseOptionalPositiveInteger(
  value: string
) {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return undefined;
  }

  const parsedValue = Number(normalizedValue);

  if (
    !Number.isInteger(parsedValue) ||
    parsedValue <= 0
  ) {
    return undefined;
  }

  return parsedValue;
}

export default function ProjectTemplateActivityFormDialog({
  open,
  editingProjectTemplateActivity,
  activityTemplates,
  onClose,
  onSave,
}: ProjectTemplateActivityFormDialogProps) {
  const [activityTemplateId, setActivityTemplateId] =
    useState(
      editingProjectTemplateActivity
        ?.activityTemplateId ?? ""
    );

  const [description, setDescription] =
    useState(
      editingProjectTemplateActivity
        ?.description ?? ""
    );

  const [
    estimatedDurationDays,
    setEstimatedDurationDays,
  ] = useState(
    editingProjectTemplateActivity
      ?.estimatedDurationDays
      ?.toString() ?? ""
  );

  const [status, setStatus] =
    useState<ProjectTemplateActivityStatus>(
      editingProjectTemplateActivity?.status ??
        "ACTIVE"
    );

  const parsedDuration =
    parseOptionalPositiveInteger(
      estimatedDurationDays
    );

  const hasValidDuration =
    estimatedDurationDays.trim() === "" ||
    parsedDuration !== undefined;

  const isValid =
    activityTemplateId !== "" &&
    hasValidDuration;

  const selectedActivity =
    useMemo(
      () =>
        activityTemplates.find(
          activity =>
            activity.id === activityTemplateId
        ),
      [activityTemplateId, activityTemplates]
    );

  function resetForm() {
    setActivityTemplateId("");
    setDescription("");
    setEstimatedDurationDays("");
    setStatus("ACTIVE");
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleSave() {
    if (!isValid) {
      return;
    }

    onSave({
      activityTemplateId,
      description:
        description.trim() || undefined,
      estimatedDurationDays:
        parsedDuration,
      status,
    });

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={
        editingProjectTemplateActivity
          ? "Edit Activity"
          : "Add Activity"
      }
      description="Select an Activity Template that will become part of this stage."
      onClose={handleClose}
      footer={
        <>
          <AppButton
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </AppButton>

          <AppButton
            disabled={!isValid}
            onClick={handleSave}
          >
            {editingProjectTemplateActivity
              ? "Save Changes"
              : "Add Activity"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">

        <div>
          <label className="text-sm font-medium">
            Activity Template
          </label>

          <select
            value={activityTemplateId}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            onChange={event =>
              setActivityTemplateId(
                event.target.value
              )
            }
          >
            <option value="">
              Select activity...
            </option>

            {activityTemplates.map(
              activity => (
                <option
                  key={activity.id}
                  value={activity.id}
                >
                  {activity.name}
                </option>
              )
            )}
          </select>
        </div>

        {selectedActivity && (
          <div className="rounded-xl border bg-slate-50 p-3">
            <div className="font-medium">
              {selectedActivity.name}
            </div>

            {selectedActivity.description && (
              <p className="mt-1 text-sm text-slate-600">
                {
                  selectedActivity.description
                }
              </p>
            )}
          </div>
        )}

        <AppInput
          label="Estimated Duration (days)"
          type="number"
          min="1"
          value={estimatedDurationDays}
          onChange={event =>
            setEstimatedDurationDays(
              event.target.value
            )
          }
        />

        {!hasValidDuration && (
          <p className="text-sm text-red-600">
            Duration must be a positive number.
          </p>
        )}

        <div>
          <label className="text-sm font-medium">
            Notes
          </label>

          <textarea
            rows={5}
            value={description}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
            placeholder="Optional notes for this project template..."
            onChange={event =>
              setDescription(
                event.target.value
              )
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Status
          </label>

          <select
            value={status}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
            onChange={event =>
              setStatus(
                event.target
                  .value as ProjectTemplateActivityStatus
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

      </div>
    </AppModal>
  );
}