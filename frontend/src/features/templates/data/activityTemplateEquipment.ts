export type ActivityTemplateEquipment = {
  id: string;
  activityTemplateId: string;
  equipmentTemplateId: string;
  estimatedHours: number;
  estimatedHourlyRate?: number;
  notes?: string;
};

export const activityTemplateEquipment: ActivityTemplateEquipment[] = [];
