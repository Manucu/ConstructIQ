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
  ActivityTemplateMaterial,
} from "../../templates/data/activityTemplateMaterials";

import type {
  ActivityTemplateLabour,
} from "../../templates/data/activityTemplateLabour";

import type {
  ActivityTemplateEquipment,
} from "../../templates/data/activityTemplateEquipment";

import type {
  ActivityTemplateExpense,
} from "../../templates/data/activityTemplateExpenses";

import type {
  MaterialTemplate,
} from "../../templates/data/materialTemplates";

import type {
  LabourTemplate,
} from "../../templates/data/labourTemplates";

import type {
  EquipmentTemplate,
} from "../../templates/data/equipmentTemplates";

import type {
  ExpenseTemplate,
} from "../../templates/data/expenseTemplates";

import type {
  ProjectTemplate,
  ProjectTemplateStage,
} from "../../templates/data/projectTemplates";

import type {
  ProjectTemplateActivity,
} from "../../templates/data/projectTemplateActivities";

import type {
  ProjectTemplateActivityMaterial,
} from "../../templates/data/projectTemplateActivityMaterial";

import type {
  ProjectTemplateActivityLabour,
} from "../../templates/data/projectTemplateActivityLabour";

import type {
  ProjectTemplateActivityEquipment,
} from "../../templates/data/projectTemplateActivityEquipment";

import type {
  ProjectTemplateActivityExpense,
} from "../../templates/data/projectTemplateActivityExpense";

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

import type {
  ProjectLabour,
} from "@/features/projects/data/projectLabours";

import type {
  ProjectEquipment,
} from "@/features/projects/data/projectEquipment";

import type {
  ProjectExpense,
} from "@/features/projects/data/projectExpenses";

export type CompanyData = {
  /*
   * Company operational resources
   */
  workers: Worker[];
  materials: CompanyMaterial[];
  equipment: Equipment[];

  clients: Client[];
  suppliers: Supplier[];
  expenseCategories: ExpenseCategory[];

  /*
   * Resource templates
   */
  materialTemplates: MaterialTemplate[];
  labourTemplates: LabourTemplate[];
  equipmentTemplates: EquipmentTemplate[];
  expenseTemplates: ExpenseTemplate[];

  /*
   * Activity templates
   */
  activityTemplates: ActivityTemplate[];
  activityTemplateMaterials: ActivityTemplateMaterial[];
  activityTemplateLabour: ActivityTemplateLabour[];
  activityTemplateEquipment: ActivityTemplateEquipment[];
  activityTemplateExpenses: ActivityTemplateExpense[];

  /*
   * Project templates
   */
  projectTemplates: ProjectTemplate[];
  projectTemplateStages: ProjectTemplateStage[];
  projectTemplateActivities:
    ProjectTemplateActivity[];

  /*
   * Resources attached to template activities
   */
  projectTemplateActivityMaterials:
    ProjectTemplateActivityMaterial[];

  projectTemplateActivityLabour:
    ProjectTemplateActivityLabour[];

  projectTemplateActivityEquipment:
    ProjectTemplateActivityEquipment[];

  projectTemplateActivityExpenses:
    ProjectTemplateActivityExpense[];

  /*
   * Operational projects
   */
  projects: Project[];
  projectStages: ProjectStage[];
  projectActivities: ProjectActivity[];

  /*
   * Operational project resources
   */
  projectMaterials: ProjectMaterial[];
  projectLabours: ProjectLabour[];
  projectEquipment: ProjectEquipment[];
  projectExpenses: ProjectExpense[];
  
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