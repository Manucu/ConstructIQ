import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type {
  ActivityCategory,
  ActivityTemplate,
  ActivityTemplateStatus,
} from "../../data/activityTemplates";

import type { SaveActivityTemplateValues } from "../../hooks/useCompanyActivityTemplates";

type ActivityTemplateFormDialogProps = {
  open: boolean;
  editingActivityTemplate: ActivityTemplate | null;
  onClose: () => void;
  onSave: (values: SaveActivityTemplateValues) => void;
};

const activityCategories: ActivityCategory[] = [
  "Planning",
  "Site Preparation",
  "Foundation",
  "Structure",
  "Masonry",
  "Roof",
  "Installations",
  "Finishing",
  "External Works",
];

export default function ActivityTemplateFormDialog({
  open,
  editingActivityTemplate,
  onClose,
  onSave,
}: ActivityTemplateFormDialogProps) {
  const [name, setName] = useState(
    editingActivityTemplate?.name ?? ""
  );

  const [category, setCategory] =
    useState<ActivityCategory>(
      editingActivityTemplate?.category ?? "Planning"
    );

  const [status, setStatus] =
    useState<ActivityTemplateStatus>(
      editingActivityTemplate?.status ?? "ACTIVE"
    );

  const [description, setDescription] = useState(
    editingActivityTemplate?.description ?? ""
  );

  const isValid = name.trim() !== "";

  function resetForm() {
    setName("");
    setCategory("Planning");
    setStatus("ACTIVE");
    setDescription("");
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
      description: description.trim() || undefined,
    });

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={
        editingActivityTemplate
          ? "Edit Activity Template"
          : "Add Activity Template"
      }
      description={
        editingActivityTemplate
          ? `Update ${editingActivityTemplate.name}.`
          : "Add a reusable activity template to the company catalog."
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
            {editingActivityTemplate
              ? "Save Changes"
              : "Add Activity Template"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <AppInput
          label="Activity Name"
          value={name}
          placeholder="Example: Concrete Pouring"
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
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) => {
              setCategory(
                event.target.value as ActivityCategory
              );
            }}
          >
            {activityCategories.map((activityCategory) => (
              <option
                key={activityCategory}
                value={activityCategory}
              >
                {activityCategory}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) => {
              setStatus(
                event.target.value as ActivityTemplateStatus
              );
            }}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            placeholder="Describe the activity template..."
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-colors focus:border-blue-700"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            Activity templates are reusable definitions. Active
            templates will be available when activities are added to a
            Working Day.
          </p>
        </div>
      </div>
    </AppModal>
  );
}