export type ProjectExpense = {
  id: string;

  projectId: string;

  projectActivityId: string;

  expenseTemplateId?: string;

  name: string;

  estimatedQuantity: number;

  actualQuantity: number;

  estimatedUnitCost?: number;

  notes?: string;
};

export const projectExpenses: ProjectExpense[] = [];