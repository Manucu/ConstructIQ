export type ActivityTemplateExpense = {
  id: string;
  activityTemplateId: string;
  expenseTemplateId: string;
  estimatedQuantity: number;
  estimatedUnitCost?: number;
  notes?: string;
};

export const activityTemplateExpenses: ActivityTemplateExpense[] = [];
