export type ProjectTemplateStatus =
  | "ACTIVE"
  | "INACTIVE";

export type ProjectTemplateCategory =
  | "Residential"
  | "Commercial"
  | "Industrial"
  | "Infrastructure"
  | "Renovation"
  | "Other";

export type ProjectTemplateStageStatus =
  | "ACTIVE"
  | "INACTIVE";

export type ProjectTemplate = {
  id: string;
  name: string;
  category: ProjectTemplateCategory;
  status: ProjectTemplateStatus;
  description?: string;
  estimatedDurationDays?: number;
  estimatedBudget?: number;
};

export type ProjectTemplateStage = {
  id: string;

  /**
   * Template-ul căruia îi aparține etapa.
   */
  projectTemplateId: string;

  /**
   * Numele etapei.
   */
  name: string;

  /**
   * Descriere opțională.
   */
  description?: string;

  /**
   * Ordinea etapei în template.
   */
  order: number;

  /**
   * Durata estimată a etapei.
   */
  estimatedDurationDays?: number;

  /**
   * Etapele inactive nu vor fi generate
   * în proiectele noi.
   */
  status: ProjectTemplateStageStatus;
};

export const projectTemplates: ProjectTemplate[] = [
  {
    id: "1",
    name: "Residential House",
    category: "Residential",
    status: "ACTIVE",
    description:
      "Standard single-family residential construction.",
    estimatedDurationDays: 365,
    estimatedBudget: 250000,
  },
  {
    id: "2",
    name: "Apartment Building",
    category: "Residential",
    status: "ACTIVE",
    description:
      "Multi-storey residential building.",
    estimatedDurationDays: 720,
    estimatedBudget: 3500000,
  },
  {
    id: "3",
    name: "Office Building",
    category: "Commercial",
    status: "ACTIVE",
    description:
      "Standard office construction project.",
    estimatedDurationDays: 600,
    estimatedBudget: 4200000,
  },
  {
    id: "4",
    name: "Warehouse",
    category: "Industrial",
    status: "ACTIVE",
    description:
      "Industrial warehouse construction.",
    estimatedDurationDays: 300,
    estimatedBudget: 1200000,
  },
];

export const projectTemplateStages: ProjectTemplateStage[] = [
  {
    id: "stage-1",
    projectTemplateId: "1",
    name: "Foundation",
    description:
      "Excavation, reinforcement, formwork and concrete foundation works.",
    order: 1,
    estimatedDurationDays: 45,
    status: "ACTIVE",
  },
  {
    id: "stage-2",
    projectTemplateId: "1",
    name: "Structure",
    description:
      "Structural columns, beams, slabs and load-bearing elements.",
    order: 2,
    estimatedDurationDays: 90,
    status: "ACTIVE",
  },
  {
    id: "stage-3",
    projectTemplateId: "1",
    name: "Roof",
    description:
      "Roof structure, insulation, tiles and rainwater systems.",
    order: 3,
    estimatedDurationDays: 30,
    status: "ACTIVE",
  },
  {
    id: "stage-4",
    projectTemplateId: "1",
    name: "Finishing",
    description:
      "Interior and exterior finishing works.",
    order: 4,
    estimatedDurationDays: 120,
    status: "ACTIVE",
  },
  {
    id: "stage-5",
    projectTemplateId: "2",
    name: "Site Preparation",
    description:
      "Site setup, temporary utilities and preparation works.",
    order: 1,
    estimatedDurationDays: 30,
    status: "ACTIVE",
  },
  {
    id: "stage-6",
    projectTemplateId: "2",
    name: "Foundation",
    description:
      "Deep foundation and basement construction works.",
    order: 2,
    estimatedDurationDays: 90,
    status: "ACTIVE",
  },
  {
    id: "stage-7",
    projectTemplateId: "2",
    name: "Superstructure",
    description:
      "Structural works for all building floors.",
    order: 3,
    estimatedDurationDays: 240,
    status: "ACTIVE",
  },
];