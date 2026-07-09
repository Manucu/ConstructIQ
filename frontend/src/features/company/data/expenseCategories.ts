export type ExpenseCategoryStatus = "ACTIVE" | "INACTIVE";

export type ExpenseCategory = {
  id: string;
  name: string;
  description?: string;
  status: ExpenseCategoryStatus;
};

export const expenseCategories: ExpenseCategory[] = [
  {
    id: "1",
    name: "Fuel",
    description: "Fuel used for equipment, transport or site operations.",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Transport",
    description: "Material transport, delivery or logistics costs.",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Equipment Rental",
    description: "Rental costs for machinery or tools.",
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "Small Tools",
    description: "Small tools and consumables.",
    status: "ACTIVE",
  },
  {
    id: "5",
    name: "Utilities",
    description: "Temporary site utilities.",
    status: "ACTIVE",
  },
  {
    id: "6",
    name: "Other",
    description: "Other approved project expenses.",
    status: "ACTIVE",
  },
];