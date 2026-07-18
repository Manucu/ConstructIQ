export type ProjectActivityStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ON_HOLD";

export type ProjectActivity = {
  id: string;

  projectId: string;

  projectStageId: string;

  sourceProjectTemplateActivityId?: string;

  sourceActivityTemplateId?: string;

  name: string;

  description?: string;

  order: number;

  status: ProjectActivityStatus;

  progress: number;

  plannedStartDate?: string;

  plannedEndDate?: string;

  actualStartDate?: string;

  actualEndDate?: string;
};

export const projectActivities:
  ProjectActivity[] = [];