import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type {
  ProjectTemplate,
  ProjectTemplateCategory,
  ProjectTemplateStatus,
} from "@/features/templates/data/projectTemplates";

import type { SaveProjectTemplateValues } from "../../hooks/useProjectTemplates";

type ProjectTemplateFormDialogProps = {
  open: boolean;
  editingProjectTemplate: ProjectTemplate | null;
  onClose: () => void;
  onSave: (values: SaveProjectTemplateValues) => void;
};

const projectTemplateCategories: ProjectTemplateCategory[] = [
  "Residential",
  "Commercial",
  "Industrial",
  "Infrastructure",
  "Renovation",
  "Other",
];

function parseOptionalNumber(value: string) {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return undefined;
  }

  const parsedValue = Number(normalizedValue);

  return Number.isFinite(parsedValue)
    ? parsedValue
    : undefined;
}

export default function ProjectTemplateFormDialog({
  open,
  editingProjectTemplate,
  onClose,
  onSave,
}: ProjectTemplateFormDialogProps) {
  const [name, setName] = useState(
    editingProjectTemplate?.name ?? ""
  );

  const [category, setCategory] =
    useState<ProjectTemplateCategory>(
      editingProjectTemplate?.category ??
        "Residential"
    );

  const [status, setStatus] =
    useState<ProjectTemplateStatus>(
      editingProjectTemplate?.status ?? "ACTIVE"
    );

  const [description, setDescription] = useState(
    editingProjectTemplate?.description ?? ""
  );

  const [
    estimatedDurationDays,
    setEstimatedDurationDays,
  ] = useState(
    editingProjectTemplate?.estimatedDurationDays?.toString() ??
      ""
  );

  const [estimatedBudget, setEstimatedBudget] =
    useState(
      editingProjectTemplate?.estimatedBudget?.toString() ??
        ""
    );

  const parsedDuration = parseOptionalNumber(
    estimatedDurationDays
  );

  const parsedBudget = parseOptionalNumber(
    estimatedBudget
  );

  const hasValidDuration =
    !estimatedDurationDays.trim() ||
    (parsedDuration !== undefined &&
      parsedDuration > 0);

  const hasValidBudget =
    !estimatedBudget.trim() ||
    (parsedBudget !== undefined &&
      parsedBudget >= 0);

  const isValid =
    name.trim() !== "" &&
    hasValidDuration &&
    hasValidBudget;

  function resetForm() {
    setName("");
    setCategory("Residential");
    setStatus("ACTIVE");
    setDescription("");
    setEstimatedDurationDays("");
    setEstimatedBudget("");
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
      category,
      status,
      description:
        description.trim() || undefined,
      estimatedDurationDays: parsedDuration,
      estimatedBudget: parsedBudget,
    });

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={
        editingProjectTemplate
          ? "Edit Project Template"
          : "Add Project Template"
      }
      description={
        editingProjectTemplate
          ? `Update ${editingProjectTemplate.name}.`
          : "Create a reusable starting structure for future projects."
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
            {editingProjectTemplate
              ? "Save Changes"
              : "Add Project Template"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <AppInput
          label="Template Name"
          value={name}
          placeholder="Example: Residential House"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <div>
          <label className="text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            value={category}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-colors focus:border-blue-700"
            onChange={(event) => {
              setCategory(
                event.target
                  .value as ProjectTemplateCategory
              );
            }}
          >
            {projectTemplateCategories.map(
              (projectTemplateCategory) => (
                <option
                  key={projectTemplateCategory}
                  value={projectTemplateCategory}
                >
                  {projectTemplateCategory}
                </option>
              )
            )}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AppInput
            label="Estimated Duration"
            type="number"
            min="1"
            value={estimatedDurationDays}
            placeholder="Example: 365"
            onChange={(event) => {
              setEstimatedDurationDays(
                event.target.value
              );
            }}
          />

          <AppInput
            label="Estimated Budget"
            type="number"
            min="0"
            step="0.01"
            value={estimatedBudget}
            placeholder="Example: 250000"
            onChange={(event) => {
              setEstimatedBudget(
                event.target.value
              );
            }}
          />
        </div>

        {!hasValidDuration && (
          <p className="text-sm text-red-600">
            Estimated duration must be greater than
            zero.
          </p>
        )}

        {!hasValidBudget && (
          <p className="text-sm text-red-600">
            Estimated budget cannot be negative.
          </p>
        )}

        <div>
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            placeholder="Describe the type of project generated from this template..."
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-colors focus:border-blue-700"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-colors focus:border-blue-700"
            onChange={(event) => {
              setStatus(
                event.target
                  .value as ProjectTemplateStatus
              );
            }}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">
              Inactive
            </option>
          </select>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            In the next step, each project template
            will receive stages, activities and
            suggested resources.
          </p>
        </div>
      </div>
    </AppModal>
  );
}