export type ProjectStageStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ON_HOLD";

export type ProjectStage = {
  id: string;
  projectId: string;

  sourceProjectTemplateStageId?: string;

  name: string;
  description?: string;

  order: number;

  status: ProjectStageStatus;
  progress: number;

  plannedBudget?: number;
  spent: number;
};

export const projectStages: ProjectStage[] = [
  {
    id: "1",
    projectId: "1",
    name: "Planning",
    order: 1,
    status: "COMPLETED",
    progress: 100,
    plannedBudget: 8000,
    spent: 7500,
  },
  {
    id: "2",
    projectId: "1",
    name: "Foundation",
    order: 2,
    status: "COMPLETED",
    progress: 100,
    plannedBudget: 40000,
    spent: 38500,
  },
  {
    id: "3",
    projectId: "1",
    name: "Structure",
    order: 3,
    status: "IN_PROGRESS",
    progress: 76,
    plannedBudget: 75000,
    spent: 81000,
  },
  {
    id: "4",
    projectId: "1",
    name: "Masonry",
    order: 4,
    status: "IN_PROGRESS",
    progress: 45,
    plannedBudget: 35000,
    spent: 14200,
  },
  {
    id: "5",
    projectId: "1",
    name: "Roof",
    order: 5,
    status: "NOT_STARTED",
    progress: 0,
    plannedBudget: 28000,
    spent: 0,
  },
];