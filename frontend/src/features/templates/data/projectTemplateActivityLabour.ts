export type ProjectTemplateActivityLabour = {
  id: string;

  projectTemplateActivityId: string;

  labourTemplateId: string;

  estimatedHours: number;

  estimatedHourlyRate?: number;

  notes?: string;
};

export const projectTemplateActivityLabour:
  ProjectTemplateActivityLabour[] = [];