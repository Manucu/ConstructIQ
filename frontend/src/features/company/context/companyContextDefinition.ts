import { createContext } from "react";

import type {
  Dispatch,
  SetStateAction,
} from "react";

import type { ActivityTemplate } from "../data/activityTemplates";
import type { Client } from "../data/clients";
import type { Equipment } from "../data/equipment";
import type { ExpenseCategory } from "../data/expenseCategories";
import type { CompanyMaterial } from "../data/materials";
import type { MaterialTemplate } from "../data/materialTemplates";
import type { Supplier } from "../data/suppliers";
import type { Worker } from "../data/workers";

export type CompanyData = {
  workers: Worker[];
  materials: CompanyMaterial[];
  equipment: Equipment[];
  activityTemplates: ActivityTemplate[];
  clients: Client[];
  suppliers: Supplier[];
  expenseCategories: ExpenseCategory[];
  materialTemplates: MaterialTemplate[];
};

export type CompanyContextValue = {
  companyData: CompanyData;
  setCompanyData: Dispatch<SetStateAction<CompanyData>>;
};

export const CompanyContext =
  createContext<CompanyContextValue | null>(null);