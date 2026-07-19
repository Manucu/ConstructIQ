export type ProjectTemplateActivityExpense = {
  id: string;

  projectTemplateActivityId: string;

  expenseTemplateId: string;

  estimatedQuantity: number;

  estimatedUnitCost?: number;

  notes?: string;
};

export const projectTemplateActivityExpenses:
  ProjectTemplateActivityExpense[] = [];