export type ProjectLabour = {
  id: string;

  /**
   * Project owner.
   */
  projectId: string;

  /**
   * Activity where this labour is used.
   */
  projectActivityId: string;

  /**
   * Source labour template.
   */
  labourTemplateId?: string;

  /**
   * Assigned worker.
   * Empty until planning/assignment.
   */
  workerId?: string;

  /**
   * Required role.
   */
  role: string;

  /**
   * Estimated labour.
   */
  estimatedHours: number;

  /**
   * Actual labour.
   */
  actualHours: number;

  /**
   * Snapshot when project was created.
   */
  estimatedHourlyRate?: number;

  notes?: string;
};

export const projectLabours: ProjectLabour[] = [];