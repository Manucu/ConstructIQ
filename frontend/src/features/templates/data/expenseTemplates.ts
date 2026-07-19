export type ExpenseTemplateStatus =
  | "ACTIVE"
  | "INACTIVE";

export const expenseTemplateUnits = [
  "fixed",
  "hour",
  "day",
  "week",
  "month",
  "item",
] as const;

export type ExpenseTemplateUnit =
  typeof expenseTemplateUnits[number];

export const expenseTemplateCategorySuggestions = [
  "Permits",
  "Utilities",
  "Waste",
  "Rental",
  "Transport",
  "Site Facilities",
  "Fuel",
  "Insurance",
  "Accommodation",
  "Professional Services",
  "Safety",
  "Other",
] as const;

export type ExpenseTemplate = {
  id: string;
  name: string;
  category: string;
  unit: ExpenseTemplateUnit;
  estimatedUnitCost?: number;
  status: ExpenseTemplateStatus;
  description?: string;
};

export const expenseTemplates: ExpenseTemplate[] = [
  {
    id: "expense-template-1",
    name: "Building Permit",
    category: "Permits",
    unit: "fixed",
    estimatedUnitCost: 2500,
    status: "ACTIVE",
    description: "Estimated local authority building permit cost.",
  },
  {
    id: "expense-template-2",
    name: "Temporary Electricity",
    category: "Utilities",
    unit: "month",
    estimatedUnitCost: 450,
    status: "ACTIVE",
    description: "Temporary electricity supply for the construction site.",
  },
  {
    id: "expense-template-3",
    name: "Waste Disposal",
    category: "Waste",
    unit: "item",
    estimatedUnitCost: 300,
    status: "ACTIVE",
    description: "Collection and disposal of construction waste.",
  },
  {
    id: "expense-template-4",
    name: "Portable Toilet",
    category: "Site Facilities",
    unit: "month",
    estimatedUnitCost: 180,
    status: "ACTIVE",
    description: "Monthly portable toilet rental and servicing.",
  },
  {
    id: "expense-template-5",
    name: "Scaffolding Rental",
    category: "Rental",
    unit: "week",
    estimatedUnitCost: 600,
    status: "ACTIVE",
    description: "Weekly external scaffolding rental cost.",
  },
];
