export type ExpenseTemplateStatus =
  | "ACTIVE"
  | "INACTIVE";

export type ExpenseTemplateCategory =
  | "Permits"
  | "Utilities"
  | "Waste"
  | "Rental"
  | "Transport"
  | "Site Facilities"
  | "Fuel"
  | "Other";

export type ExpenseTemplateUnit =
  | "fixed"
  | "day"
  | "week"
  | "month"
  | "item";

export type ExpenseTemplate = {
  id: string;

  name: string;

  category: ExpenseTemplateCategory;

  unit: ExpenseTemplateUnit;

  /**
   * Cost estimativ folosit pentru bugetare.
   */
  estimatedUnitCost?: number;

  status: ExpenseTemplateStatus;

  description?: string;
};

export const expenseTemplates:
  ExpenseTemplate[] = [
    {
      id: "expense-template-1",
      name: "Building Permit",
      category: "Permits",
      unit: "fixed",
      estimatedUnitCost: 2500,
      status: "ACTIVE",
    },
    {
      id: "expense-template-2",
      name: "Temporary Electricity",
      category: "Utilities",
      unit: "month",
      estimatedUnitCost: 450,
      status: "ACTIVE",
    },
    {
      id: "expense-template-3",
      name: "Waste Disposal",
      category: "Waste",
      unit: "item",
      estimatedUnitCost: 300,
      status: "ACTIVE",
    },
    {
      id: "expense-template-4",
      name: "Portable Toilet",
      category: "Site Facilities",
      unit: "month",
      estimatedUnitCost: 180,
      status: "ACTIVE",
    },
    {
      id: "expense-template-5",
      name: "Scaffolding Rental",
      category: "Rental",
      unit: "week",
      estimatedUnitCost: 600,
      status: "ACTIVE",
    },
  ];