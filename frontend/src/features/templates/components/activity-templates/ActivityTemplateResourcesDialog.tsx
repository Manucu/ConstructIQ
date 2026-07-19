import {
  useState,
} from "react";

import {
  Trash2,
} from "lucide-react";

import {
  AppButton,
} from "@/components/ui";

import {
  TemplateDialog,
} from "@/features/templates/components/shared/forms";

import type {
  ActivityTemplate,
} from "@/features/templates/data/activityTemplates";

import {
  useActivityTemplateResources,
} from "@/features/templates/hooks/useActivityTemplateResources";

type ActivityTemplateResourcesDialogProps = {
  open: boolean;
  activityTemplate: ActivityTemplate;
  onClose: () => void;
};

type ResourceOption = {
  id: string;
  label: string;
};

type ResourcePickerProps = {
  label: string;
  value: string;
  options: ResourceOption[];
  onChange: (value: string) => void;
  onAdd: () => void;
};

type ResourceRowProps = {
  title: string;
  primaryValue: number;
  secondaryValue?: number;
  primaryStep?: number;
  secondaryStep?: number;
  onPrimaryChange: (value: number) => void;
  onSecondaryChange: (
    value: number | undefined
  ) => void;
  onDelete: () => void;
};

function parseNonNegativeNumber(
  value: string
) {
  const parsedValue = Number(value);

  if (
    !Number.isFinite(parsedValue) ||
    parsedValue < 0
  ) {
    return 0;
  }

  return parsedValue;
}

function formatCurrency(
  value: number
) {
  return new Intl.NumberFormat(
    "en-GB",
    {
      style: "currency",
      currency: "EUR",
    }
  ).format(value);
}

function ResourcePicker({
  label,
  value,
  options,
  onChange,
  onAdd,
}: ResourcePickerProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <select
        aria-label={label}
        value={value}
        className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3"
        onChange={event =>
          onChange(event.target.value)
        }
      >
        <option value="">
          Select {label.toLowerCase()}
        </option>

        {options.map(option => (
          <option
            key={option.id}
            value={option.id}
          >
            {option.label}
          </option>
        ))}
      </select>

      <AppButton
        type="button"
        disabled={!value}
        onClick={onAdd}
      >
        Add
      </AppButton>
    </div>
  );
}

function ResourceRow({
  title,
  primaryValue,
  secondaryValue,
  primaryStep = 0.01,
  secondaryStep = 0.01,
  onPrimaryChange,
  onSecondaryChange,
  onDelete,
}: ResourceRowProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 p-3 md:grid-cols-[minmax(160px,1fr)_120px_120px_auto] md:items-center">
      <span className="font-medium text-slate-900">
        {title}
      </span>

      <input
        type="number"
        min="0"
        step={primaryStep}
        value={primaryValue}
        className="rounded-lg border border-slate-300 px-3 py-2"
        onChange={event =>
          onPrimaryChange(
            parseNonNegativeNumber(
              event.target.value
            )
          )
        }
      />

      <input
        type="number"
        min="0"
        step={secondaryStep}
        value={secondaryValue ?? ""}
        className="rounded-lg border border-slate-300 px-3 py-2"
        onChange={event =>
          onSecondaryChange(
            event.target.value === ""
              ? undefined
              : parseNonNegativeNumber(
                  event.target.value
                )
          )
        }
      />

      <AppButton
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </AppButton>
    </div>
  );
}

export default function ActivityTemplateResourcesDialog({
  open,
  activityTemplate,
  onClose,
}: ActivityTemplateResourcesDialogProps) {
  const resources =
    useActivityTemplateResources(
      activityTemplate.id
    );

  const [
    selectedMaterialId,
    setSelectedMaterialId,
  ] = useState("");

  const [
    selectedLabourId,
    setSelectedLabourId,
  ] = useState("");

  const [
    selectedEquipmentId,
    setSelectedEquipmentId,
  ] = useState("");

  const [
    selectedExpenseId,
    setSelectedExpenseId,
  ] = useState("");

  const materialOptions =
    resources.companyData.materialTemplates
      .filter(
        template =>
          template.status === "ACTIVE" &&
          !resources.materials.some(
            item =>
              item.materialTemplateId ===
              template.id
          )
      )
      .map(template => ({
        id: template.id,
        label: `${template.code} · ${template.name}`,
      }));

  const labourOptions =
    resources.companyData.labourTemplates
      .filter(
        template =>
          template.status === "ACTIVE" &&
          !resources.labour.some(
            item =>
              item.labourTemplateId ===
              template.id
          )
      )
      .map(template => ({
        id: template.id,
        label: template.role,
      }));

  const equipmentOptions =
    resources.companyData.equipmentTemplates
      .filter(
        template =>
          template.status === "ACTIVE" &&
          !resources.equipment.some(
            item =>
              item.equipmentTemplateId ===
              template.id
          )
      )
      .map(template => ({
        id: template.id,
        label: template.name,
      }));

  const expenseOptions =
    resources.companyData.expenseTemplates
      .filter(
        template =>
          template.status === "ACTIVE" &&
          !resources.expenses.some(
            item =>
              item.expenseTemplateId ===
              template.id
          )
      )
      .map(template => ({
        id: template.id,
        label: template.name,
      }));

  return (
    <TemplateDialog
      open={open}
      title={`Resources · ${activityTemplate.name}`}
      description="Estimated resources copied with this activity template."
      saveLabel="Done"
      isValid
      onClose={onClose}
      onSave={onClose}
    >
      <div className="max-h-[70vh] space-y-6 overflow-y-auto pr-1">
        <section className="space-y-3">
          <div>
            <h3 className="font-semibold text-slate-900">
              Materials
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Estimated quantity and unit cost.
            </p>
          </div>

          <ResourcePicker
            label="Material"
            value={selectedMaterialId}
            options={materialOptions}
            onChange={
              setSelectedMaterialId
            }
            onAdd={() => {
              resources.addMaterial(
                selectedMaterialId
              );

              setSelectedMaterialId("");
            }}
          />

          {resources.materials.length ===
          0 ? (
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No materials added.
            </p>
          ) : (
            <div className="space-y-3">
              {resources.materials.map(
                item => {
                  const template =
                    resources.companyData
                      .materialTemplates
                      .find(
                        candidate =>
                          candidate.id ===
                          item.materialTemplateId
                      );

                  return (
                    <ResourceRow
                      key={item.id}
                      title={
                        template?.name ??
                        "Unknown material"
                      }
                      primaryValue={
                        item.estimatedQuantity
                      }
                      secondaryValue={
                        item.estimatedUnitCost
                      }
                      onPrimaryChange={value =>
                        resources.update(
                          "activityTemplateMaterials",
                          item.id,
                          {
                            estimatedQuantity:
                              value,
                          }
                        )
                      }
                      onSecondaryChange={value =>
                        resources.update(
                          "activityTemplateMaterials",
                          item.id,
                          {
                            estimatedUnitCost:
                              value,
                          }
                        )
                      }
                      onDelete={() =>
                        resources.remove(
                          "activityTemplateMaterials",
                          item.id
                        )
                      }
                    />
                  );
                }
              )}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <div>
            <h3 className="font-semibold text-slate-900">
              Labour
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Estimated hours and hourly rate.
            </p>
          </div>

          <ResourcePicker
            label="Labour"
            value={selectedLabourId}
            options={labourOptions}
            onChange={
              setSelectedLabourId
            }
            onAdd={() => {
              resources.addLabour(
                selectedLabourId
              );

              setSelectedLabourId("");
            }}
          />

          {resources.labour.length ===
          0 ? (
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No labour added.
            </p>
          ) : (
            <div className="space-y-3">
              {resources.labour.map(
                item => {
                  const template =
                    resources.companyData
                      .labourTemplates
                      .find(
                        candidate =>
                          candidate.id ===
                          item.labourTemplateId
                      );

                  return (
                    <ResourceRow
                      key={item.id}
                      title={
                        template?.role ??
                        "Unknown labour"
                      }
                      primaryValue={
                        item.estimatedHours
                      }
                      secondaryValue={
                        item.estimatedHourlyRate
                      }
                      primaryStep={0.25}
                      onPrimaryChange={value =>
                        resources.update(
                          "activityTemplateLabour",
                          item.id,
                          {
                            estimatedHours:
                              value,
                          }
                        )
                      }
                      onSecondaryChange={value =>
                        resources.update(
                          "activityTemplateLabour",
                          item.id,
                          {
                            estimatedHourlyRate:
                              value,
                          }
                        )
                      }
                      onDelete={() =>
                        resources.remove(
                          "activityTemplateLabour",
                          item.id
                        )
                      }
                    />
                  );
                }
              )}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <div>
            <h3 className="font-semibold text-slate-900">
              Equipment
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Estimated hours and hourly rate.
            </p>
          </div>

          <ResourcePicker
            label="Equipment"
            value={selectedEquipmentId}
            options={equipmentOptions}
            onChange={
              setSelectedEquipmentId
            }
            onAdd={() => {
              resources.addEquipment(
                selectedEquipmentId
              );

              setSelectedEquipmentId("");
            }}
          />

          {resources.equipment.length ===
          0 ? (
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No equipment added.
            </p>
          ) : (
            <div className="space-y-3">
              {resources.equipment.map(
                item => {
                  const template =
                    resources.companyData
                      .equipmentTemplates
                      .find(
                        candidate =>
                          candidate.id ===
                          item.equipmentTemplateId
                      );

                  return (
                    <ResourceRow
                      key={item.id}
                      title={
                        template?.name ??
                        "Unknown equipment"
                      }
                      primaryValue={
                        item.estimatedHours
                      }
                      secondaryValue={
                        item.estimatedHourlyRate
                      }
                      primaryStep={0.25}
                      onPrimaryChange={value =>
                        resources.update(
                          "activityTemplateEquipment",
                          item.id,
                          {
                            estimatedHours:
                              value,
                          }
                        )
                      }
                      onSecondaryChange={value =>
                        resources.update(
                          "activityTemplateEquipment",
                          item.id,
                          {
                            estimatedHourlyRate:
                              value,
                          }
                        )
                      }
                      onDelete={() =>
                        resources.remove(
                          "activityTemplateEquipment",
                          item.id
                        )
                      }
                    />
                  );
                }
              )}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <div>
            <h3 className="font-semibold text-slate-900">
              Expenses
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Estimated quantity and unit cost.
            </p>
          </div>

          <ResourcePicker
            label="Expense"
            value={selectedExpenseId}
            options={expenseOptions}
            onChange={
              setSelectedExpenseId
            }
            onAdd={() => {
              resources.addExpense(
                selectedExpenseId
              );

              setSelectedExpenseId("");
            }}
          />

          {resources.expenses.length ===
          0 ? (
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No expenses added.
            </p>
          ) : (
            <div className="space-y-3">
              {resources.expenses.map(
                item => {
                  const template =
                    resources.companyData
                      .expenseTemplates
                      .find(
                        candidate =>
                          candidate.id ===
                          item.expenseTemplateId
                      );

                  return (
                    <ResourceRow
                      key={item.id}
                      title={
                        template?.name ??
                        "Unknown expense"
                      }
                      primaryValue={
                        item.estimatedQuantity
                      }
                      secondaryValue={
                        item.estimatedUnitCost
                      }
                      onPrimaryChange={value =>
                        resources.update(
                          "activityTemplateExpenses",
                          item.id,
                          {
                            estimatedQuantity:
                              value,
                          }
                        )
                      }
                      onSecondaryChange={value =>
                        resources.update(
                          "activityTemplateExpenses",
                          item.id,
                          {
                            estimatedUnitCost:
                              value,
                          }
                        )
                      }
                      onDelete={() =>
                        resources.remove(
                          "activityTemplateExpenses",
                          item.id
                        )
                      }
                    />
                  );
                }
              )}
            </div>
          )}
        </section>

        <div className="rounded-2xl bg-slate-900 p-5 text-white">
          <p className="text-sm text-slate-300">
            Total estimated activity cost
          </p>

          <p className="mt-2 text-2xl font-bold">
            {formatCurrency(
              resources.totalEstimatedCost
            )}
          </p>
        </div>
      </div>
    </TemplateDialog>
  );
}