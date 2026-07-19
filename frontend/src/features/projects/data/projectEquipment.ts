export type ProjectEquipment = {
  id: string;

  projectId: string;

  projectActivityId: string;

  equipmentTemplateId?: string;

  /**
   * Company equipment assigned.
   */
  equipmentId?: string;

  name: string;

  estimatedHours: number;

  actualHours: number;

  estimatedHourlyRate?: number;

  notes?: string;
};

export const projectEquipment: ProjectEquipment[] = [];