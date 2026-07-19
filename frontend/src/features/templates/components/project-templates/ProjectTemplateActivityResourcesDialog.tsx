import { useState } from "react";
import { Trash2 } from "lucide-react";

import { AppButton } from "@/components/ui";
import { TemplateDialog } from "@/features/templates/components/shared/forms";
import type { ProjectTemplateActivity } from "@/features/templates/data/projectTemplateActivities";
import { useProjectTemplateActivityResources } from "@/features/templates/hooks/useProjectTemplateActivityResources";

type Props = {
  open: boolean;
  activity: ProjectTemplateActivity;
  activityName: string;
  onClose: () => void;
};

type Option = { id: string; label: string };

type PickerProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  onAdd: () => void;
};

type RowProps = {
  title: string;
  primaryLabel: string;
  secondaryLabel: string;
  primaryValue: number;
  secondaryValue?: number;
  primaryStep?: number;
  onPrimaryChange: (value: number) => void;
  onSecondaryChange: (value: number | undefined) => void;
  onDelete: () => void;
};

function parseNonNegativeNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0
    ? parsed
    : 0;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);
}

function Picker({
  label,
  value,
  options,
  onChange,
  onAdd,
}: PickerProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <select
        aria-label={label}
        value={value}
        className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3"
        onChange={event => onChange(event.target.value)}
      >
        <option value="">
          Select {label.toLowerCase()}
        </option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
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
  primaryLabel,
  secondaryLabel,
  primaryValue,
  secondaryValue,
  primaryStep = 0.01,
  onPrimaryChange,
  onSecondaryChange,
  onDelete,
}: RowProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 p-3 md:grid-cols-[minmax(180px,1fr)_130px_130px_auto] md:items-end">
      <div className="self-center font-medium text-slate-900">
        {title}
      </div>
      <label className="text-xs text-slate-500">
        {primaryLabel}
        <input
          type="number"
          min="0"
          step={primaryStep}
          value={primaryValue}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
          onChange={event =>
            onPrimaryChange(
              parseNonNegativeNumber(event.target.value)
            )
          }
        />
      </label>
      <label className="text-xs text-slate-500">
        {secondaryLabel}
        <input
          type="number"
          min="0"
          step="0.01"
          value={secondaryValue ?? ""}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
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
      </label>
      <AppButton
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Delete ${title}`}
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </AppButton>
    </div>
  );
}

export default function ProjectTemplateActivityResourcesDialog({
  open,
  activity,
  activityName,
  onClose,
}: Props) {
  const resources =
    useProjectTemplateActivityResources(activity.id);

  const [materialId, setMaterialId] = useState("");
  const [labourId, setLabourId] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const [expenseId, setExpenseId] = useState("");

  const materialOptions = resources.companyData.materialTemplates
    .filter(
      template =>
        template.status === "ACTIVE" &&
        !resources.materials.some(
          item => item.materialTemplateId === template.id
        )
    )
    .map(template => ({
      id: template.id,
      label: `${template.code} · ${template.name}`,
    }));

  const labourOptions = resources.companyData.labourTemplates
    .filter(
      template =>
        template.status === "ACTIVE" &&
        !resources.labour.some(
          item => item.labourTemplateId === template.id
        )
    )
    .map(template => ({
      id: template.id,
      label: template.role,
    }));

  const equipmentOptions = resources.companyData.equipmentTemplates
    .filter(
      template =>
        template.status === "ACTIVE" &&
        !resources.equipment.some(
          item => item.equipmentTemplateId === template.id
        )
    )
    .map(template => ({
      id: template.id,
      label: template.name,
    }));

  const expenseOptions = resources.companyData.expenseTemplates
    .filter(
      template =>
        template.status === "ACTIVE" &&
        !resources.expenses.some(
          item => item.expenseTemplateId === template.id
        )
    )
    .map(template => ({
      id: template.id,
      label: template.name,
    }));

  return (
    <TemplateDialog
      open={open}
      title={`Resources · ${activityName}`}
      description="Manage estimated resources copied into this project template activity."
      saveLabel="Done"
      isValid
      onClose={onClose}
      onSave={onClose}
    >
      <div className="max-h-[72vh] space-y-7 overflow-y-auto pr-1">
        <section className="space-y-3">
          <h3 className="font-semibold text-slate-900">Materials</h3>
          <Picker
            label="Material"
            value={materialId}
            options={materialOptions}
            onChange={setMaterialId}
            onAdd={() => {
              resources.addMaterial(materialId);
              setMaterialId("");
            }}
          />
          {resources.materials.map(item => (
            <ResourceRow
              key={item.id}
              title={
                resources.companyData.materialTemplates.find(
                  template =>
                    template.id === item.materialTemplateId
                )?.name ?? "Unknown material"
              }
              primaryLabel="Quantity"
              secondaryLabel="Unit cost"
              primaryValue={item.estimatedQuantity}
              secondaryValue={item.estimatedUnitCost}
              onPrimaryChange={value =>
                resources.update(
                  "projectTemplateActivityMaterials",
                  item.id,
                  { estimatedQuantity: value }
                )
              }
              onSecondaryChange={value =>
                resources.update(
                  "projectTemplateActivityMaterials",
                  item.id,
                  { estimatedUnitCost: value }
                )
              }
              onDelete={() =>
                resources.remove(
                  "projectTemplateActivityMaterials",
                  item.id
                )
              }
            />
          ))}
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-slate-900">Labour</h3>
          <Picker
            label="Labour"
            value={labourId}
            options={labourOptions}
            onChange={setLabourId}
            onAdd={() => {
              resources.addLabour(labourId);
              setLabourId("");
            }}
          />
          {resources.labour.map(item => (
            <ResourceRow
              key={item.id}
              title={
                resources.companyData.labourTemplates.find(
                  template => template.id === item.labourTemplateId
                )?.role ?? "Unknown labour"
              }
              primaryLabel="Hours"
              secondaryLabel="Hourly rate"
              primaryValue={item.estimatedHours}
              secondaryValue={item.estimatedHourlyRate}
              primaryStep={0.25}
              onPrimaryChange={value =>
                resources.update(
                  "projectTemplateActivityLabour",
                  item.id,
                  { estimatedHours: value }
                )
              }
              onSecondaryChange={value =>
                resources.update(
                  "projectTemplateActivityLabour",
                  item.id,
                  { estimatedHourlyRate: value }
                )
              }
              onDelete={() =>
                resources.remove(
                  "projectTemplateActivityLabour",
                  item.id
                )
              }
            />
          ))}
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-slate-900">Equipment</h3>
          <Picker
            label="Equipment"
            value={equipmentId}
            options={equipmentOptions}
            onChange={setEquipmentId}
            onAdd={() => {
              resources.addEquipment(equipmentId);
              setEquipmentId("");
            }}
          />
          {resources.equipment.map(item => (
            <ResourceRow
              key={item.id}
              title={
                resources.companyData.equipmentTemplates.find(
                  template =>
                    template.id === item.equipmentTemplateId
                )?.name ?? "Unknown equipment"
              }
              primaryLabel="Hours"
              secondaryLabel="Hourly rate"
              primaryValue={item.estimatedHours}
              secondaryValue={item.estimatedHourlyRate}
              primaryStep={0.25}
              onPrimaryChange={value =>
                resources.update(
                  "projectTemplateActivityEquipment",
                  item.id,
                  { estimatedHours: value }
                )
              }
              onSecondaryChange={value =>
                resources.update(
                  "projectTemplateActivityEquipment",
                  item.id,
                  { estimatedHourlyRate: value }
                )
              }
              onDelete={() =>
                resources.remove(
                  "projectTemplateActivityEquipment",
                  item.id
                )
              }
            />
          ))}
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-slate-900">Expenses</h3>
          <Picker
            label="Expense"
            value={expenseId}
            options={expenseOptions}
            onChange={setExpenseId}
            onAdd={() => {
              resources.addExpense(expenseId);
              setExpenseId("");
            }}
          />
          {resources.expenses.map(item => (
            <ResourceRow
              key={item.id}
              title={
                resources.companyData.expenseTemplates.find(
                  template =>
                    template.id === item.expenseTemplateId
                )?.name ?? "Unknown expense"
              }
              primaryLabel="Quantity"
              secondaryLabel="Unit cost"
              primaryValue={item.estimatedQuantity}
              secondaryValue={item.estimatedUnitCost}
              onPrimaryChange={value =>
                resources.update(
                  "projectTemplateActivityExpenses",
                  item.id,
                  { estimatedQuantity: value }
                )
              }
              onSecondaryChange={value =>
                resources.update(
                  "projectTemplateActivityExpenses",
                  item.id,
                  { estimatedUnitCost: value }
                )
              }
              onDelete={() =>
                resources.remove(
                  "projectTemplateActivityExpenses",
                  item.id
                )
              }
            />
          ))}
        </section>

        <div className="grid gap-3 rounded-2xl bg-slate-900 p-5 text-white sm:grid-cols-2 lg:grid-cols-5">
          <Cost label="Materials" value={resources.totalMaterialCost} />
          <Cost label="Labour" value={resources.totalLabourCost} />
          <Cost label="Equipment" value={resources.totalEquipmentCost} />
          <Cost label="Expenses" value={resources.totalExpenseCost} />
          <Cost label="Total" value={resources.totalEstimatedCost} emphasized />
        </div>
      </div>
    </TemplateDialog>
  );
}

function Cost({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: number;
  emphasized?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-slate-300">{label}</p>
      <p className={emphasized ? "mt-1 text-lg font-bold" : "mt-1 font-semibold"}>
        {formatCurrency(value)}
      </p>
    </div>
  );
}
