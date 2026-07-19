export type ProjectTemplateActivityEquipment = {
  id: string;

  projectTemplateActivityId: string;

  equipmentTemplateId: string;

  estimatedHours: number;

  estimatedHourlyRate?: number;

  notes?: string;
};

export const projectTemplateActivityEquipment:
  ProjectTemplateActivityEquipment[] = [];