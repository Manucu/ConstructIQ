import {
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { Worker } from "../data/workers";
import type { CompanyMaterial } from "../data/materials";
import type { Equipment } from "../data/equipment";
import type { ActivityTemplate } from "../data/activityTemplates";
import type { Client } from "../data/clients";
import type { Supplier } from "../data/suppliers";
import type { ExpenseCategory } from "../data/expenseCategories";
import type { MaterialTemplate } from "../data/materialTemplates";

import type {
  ProjectTemplate,
  ProjectTemplateStage,
} from "../data/projectTemplates";

import type {
  ProjectTemplateActivity,
} from "../data/projectTemplateActivities";

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
  projectTemplateActivities: ProjectTemplateActivity[];
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