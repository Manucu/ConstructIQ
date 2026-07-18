import {
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { Worker } from "../data/workers";
import type { CompanyMaterial } from "../data/materials";
import type { Equipment } from "../data/equipment";
import type { Client } from "../data/clients";
import type { Supplier } from "../data/suppliers";
import type { ExpenseCategory } from "../data/expenseCategories";

import type {
  ActivityTemplate,
} from "../../templates/data/activityTemplates";

import type {
  MaterialTemplate,
} from "../../templates/data/materialTemplates";

import type {
  ProjectTemplate,
  ProjectTemplateStage,
} from "../../templates/data/projectTemplates";

import type {
  ProjectTemplateActivity,
} from "../../templates/data/projectTemplateActivities";

import type {
  ProjectTemplateActivityMaterial,
} from "../../templates/components/materials-templates/projectTemplateActivityMaterials";

import type {
  Project,
} from "@/features/projects/data/projects";

import type {
  ProjectStage,
} from "@/features/projects/data/projectStages";

import type {
  ProjectActivity,
} from "@/features/projects/data/projectActivities";

import type {
  ProjectMaterial,
} from "@/features/projects/data/projectMaterials";

export type CompanyData = {
  workers: Worker[];
  materials: CompanyMaterial[];
  equipment: Equipment[];
  activityTemplates: ActivityTemplate[];
  clients: Client[];
  suppliers: Supplier[];
  expenseCategories: ExpenseCategory[];
  materialTemplates: MaterialTemplate[];

  projectTemplates: ProjectTemplate[];
  projectTemplateStages: ProjectTemplateStage[];
  projectTemplateActivities:
    ProjectTemplateActivity[];
  projectTemplateActivityMaterials:
    ProjectTemplateActivityMaterial[];

  projects: Project[];
  projectStages: ProjectStage[];
  projectActivities: ProjectActivity[];
  projectMaterials: ProjectMaterial[];
};

export type CompanyContextValue = {
  companyData: CompanyData;

  setCompanyData: Dispatch<
    SetStateAction<CompanyData>
  >;

  resetCompanyData: () => void;
};

export const CompanyContext =
  createContext<CompanyContextValue | null>(
    null
  );