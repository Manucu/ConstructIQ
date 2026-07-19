export type ActivityTemplateLabour = {
  id: string;
  activityTemplateId: string;
  labourTemplateId: string;
  estimatedHours: number;
  estimatedHourlyRate?: number;
  notes?: string;
};

export const activityTemplateLabour: ActivityTemplateLabour[] = [];
