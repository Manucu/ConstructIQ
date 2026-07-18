import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type {
  ProjectTemplateStage,
  ProjectTemplateStageStatus,
} from "@/features/templates/data/projectTemplates";

import type { SaveProjectTemplateStageValues } from "../../hooks/useProjectTemplateStages";

type ProjectTemplateStageFormDialogProps = {
  open: boolean;

  editingProjectTemplateStage:
    | ProjectTemplateStage
    | null;

  onClose: () => void;

  onSave: (
    values: SaveProjectTemplateStageValues
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

export default function ProjectTemplateStageFormDialog({
  open,
  editingProjectTemplateStage,
  onClose,
  onSave,
}: ProjectTemplateStageFormDialogProps) {
  const [name, setName] = useState(
    editingProjectTemplateStage?.name ?? ""
  );

  const [description, setDescription] =
    useState(
      editingProjectTemplateStage
        ?.description ?? ""
    );

  const [
    estimatedDurationDays,
    setEstimatedDurationDays,
  ] = useState(
    editingProjectTemplateStage
      ?.estimatedDurationDays
      ?.toString() ?? ""
  );

  const [status, setStatus] =
    useState<ProjectTemplateStageStatus>(
      editingProjectTemplateStage?.status ??
        "ACTIVE"
    );

  const parsedEstimatedDurationDays =
    parseOptionalPositiveInteger(
      estimatedDurationDays
    );

  const hasValidDuration =
    estimatedDurationDays.trim() === "" ||
    parsedEstimatedDurationDays !== undefined;

  const isValid =
    name.trim() !== "" &&
    hasValidDuration;

  function resetForm() {
    setName("");
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
      name: name.trim(),

      description:
        description.trim() || undefined,

      estimatedDurationDays:
        parsedEstimatedDurationDays,

      status,
    });

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={
        editingProjectTemplateStage
          ? "Edit Template Stage"
          : "Add Template Stage"
      }
      description={
        editingProjectTemplateStage
          ? `Update ${editingProjectTemplateStage.name}.`
          : "Add a reusable stage to this project template."
      }
      onClose={handleClose}
      footer={
        <>
          <AppButton
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </AppButton>

          <AppButton
            type="button"
            disabled={!isValid}
            onClick={handleSave}
          >
            {editingProjectTemplateStage
              ? "Save Changes"
              : "Add Stage"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <AppInput
          label="Stage Name"
          value={name}
          placeholder="Example: Foundation"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <AppInput
          label="Estimated Duration in Days"
          type="number"
          min="1"
          step="1"
          value={estimatedDurationDays}
          placeholder="Example: 45"
          onChange={(event) => {
            setEstimatedDurationDays(
              event.target.value
            );
          }}
        />

        {!hasValidDuration && (
          <p className="text-sm text-red-600">
            Estimated duration must be a
            positive whole number.
          </p>
        )}

        <div>
          <label
            htmlFor="project-template-stage-description"
            className="text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="project-template-stage-description"
            rows={5}
            value={description}
            placeholder="Describe the work included in this stage..."
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-colors focus:border-blue-700"
            onChange={(event) => {
              setDescription(
                event.target.value
              );
            }}
          />
        </div>

        <div>
          <label
            htmlFor="project-template-stage-status"
            className="text-sm font-medium text-slate-700"
          >
            Status
          </label>

          <select
            id="project-template-stage-status"
            value={status}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-colors focus:border-blue-700"
            onChange={(event) => {
              setStatus(
                event.target
                  .value as ProjectTemplateStageStatus
              );
            }}
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
            The stage order is assigned
            automatically. You will be able to
            move stages up or down from the
            template stage list.
          </p>
        </div>
      </div>
    </AppModal>
  );
}