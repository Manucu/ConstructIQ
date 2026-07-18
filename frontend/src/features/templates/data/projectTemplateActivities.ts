export type ProjectTemplateActivityStatus =
  | "ACTIVE"
  | "INACTIVE";

export type ProjectTemplateActivity = {
  id: string;
  projectTemplateStageId: string;
  activityTemplateId: string;
  order: number;
  estimatedDurationDays?: number;
  description?: string;
  status: ProjectTemplateActivityStatus;
};

export const projectTemplateActivities:
  ProjectTemplateActivity[] = [];