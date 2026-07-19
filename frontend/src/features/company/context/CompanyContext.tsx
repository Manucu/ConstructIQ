import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { workers } from "../data/workers";
import { materials } from "../data/materials";
import { equipment } from "../data/equipment";
import { clients } from "../data/clients";
import { suppliers } from "../data/suppliers";
import { expenseCategories } from "../data/expenseCategories";

import {
  activityTemplates,
} from "../../templates/data/activityTemplates";

import {
  activityTemplateMaterials,
} from "../../templates/data/activityTemplateMaterials";

import {
  activityTemplateLabour,
} from "../../templates/data/activityTemplateLabour";

import {
  activityTemplateEquipment,
} from "../../templates/data/activityTemplateEquipment";

import {
  activityTemplateExpenses,
} from "../../templates/data/activityTemplateExpenses";

import {
  materialTemplates,
} from "../../templates/data/materialTemplates";

import {
  labourTemplates,
} from "../../templates/data/labourTemplates";

import {
  equipmentTemplates,
} from "../../templates/data/equipmentTemplates";

import {
  expenseTemplates,
} from "../../templates/data/expenseTemplates";

import {
  projectTemplates,
  projectTemplateStages,
} from "../../templates/data/projectTemplates";

import {
  projectTemplateActivities,
} from "../../templates/data/projectTemplateActivities";

import {
  projectTemplateActivityMaterials,
} from "../../templates/data/projectTemplateActivityMaterial";

import {
  projectTemplateActivityLabour,
} from "../../templates/data/projectTemplateActivityLabour";

import {
  projectTemplateActivityEquipment,
} from "../../templates/data/projectTemplateActivityEquipment";

import {
  projectTemplateActivityExpenses,
} from "../../templates/data/projectTemplateActivityExpense";

import {
  projects,
} from "@/features/projects/data/projects";

import {
  projectStages,
} from "@/features/projects/data/projectStages";

import {
  projectActivities,
} from "@/features/projects/data/projectActivities";

import {
  projectMaterials,
} from "@/features/projects/data/projectMaterials";

import {
  projectLabours,
} from "@/features/projects/data/projectLabours";

import {
  projectEquipment,
} from "@/features/projects/data/projectEquipment";

import {
  projectExpenses,
} from "@/features/projects/data/projectExpenses";

import {
  CompanyContext,
  type CompanyData,
  type CompanyContextValue,
} from "./companyContextDefinition";

type CompanyProviderProps = {
  children: ReactNode;
};

const COMPANY_STORAGE_KEY =
  "constructiq-company-data";

const initialCompanyData: CompanyData = {
  /*
   * Company operational resources
   */
  workers,
  materials,
  equipment,

  clients,
  suppliers,
  expenseCategories,

  /*
   * Resource templates
   */
  materialTemplates,
  labourTemplates,
  equipmentTemplates,
  expenseTemplates,

  /*
   * Activity templates
   */
  activityTemplates,
  activityTemplateMaterials,
  activityTemplateLabour,
  activityTemplateEquipment,
  activityTemplateExpenses,

  /*
   * Project templates
   */
  projectTemplates,
  projectTemplateStages,
  projectTemplateActivities,

  /*
   * Resources attached to template activities
   */
  projectTemplateActivityMaterials,
  projectTemplateActivityLabour,
  projectTemplateActivityEquipment,
  projectTemplateActivityExpenses,

  /*
   * Operational projects
   */
  projects,
  projectStages,
  projectActivities,

  /*
   * Operational project resources
   */
  projectMaterials,
  projectLabours,
  projectEquipment,
  projectExpenses,
};

function loadStoredCompanyData():
  | Partial<CompanyData>
  | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue =
      window.localStorage.getItem(
        COMPANY_STORAGE_KEY
      );

    if (!storedValue) {
      return null;
    }

    const parsedValue = JSON.parse(
      storedValue
    ) as Partial<CompanyData>;

    if (
      !parsedValue ||
      typeof parsedValue !== "object"
    ) {
      return null;
    }

    return parsedValue;
  } catch (error) {
    console.error(
      "Could not load company data from localStorage.",
      error
    );

    return null;
  }
}

function createInitialCompanyData(): CompanyData {
  const storedCompanyData =
    loadStoredCompanyData();

  if (!storedCompanyData) {
    return initialCompanyData;
  }

  /*
   * Datele mai vechi din localStorage pot să nu
   * conțină status pentru MaterialTemplate.
   */
  const migratedMaterialTemplates =
    (
      storedCompanyData.materialTemplates ??
      initialCompanyData.materialTemplates
    ).map(materialTemplate => ({
      ...materialTemplate,
      status:
        materialTemplate.status ?? "ACTIVE",
    }));

  return {
    ...initialCompanyData,
    ...storedCompanyData,

    /*
     * Company operational resources
     */
    workers:
      storedCompanyData.workers ??
      initialCompanyData.workers,

    materials:
      storedCompanyData.materials ??
      initialCompanyData.materials,

    equipment:
      storedCompanyData.equipment ??
      initialCompanyData.equipment,

    clients:
      storedCompanyData.clients ??
      initialCompanyData.clients,

    suppliers:
      storedCompanyData.suppliers ??
      initialCompanyData.suppliers,

    expenseCategories:
      storedCompanyData.expenseCategories ??
      initialCompanyData.expenseCategories,

    /*
     * Resource templates
     */
    materialTemplates:
      migratedMaterialTemplates,

    labourTemplates:
      storedCompanyData.labourTemplates ??
      initialCompanyData.labourTemplates,

    equipmentTemplates:
      storedCompanyData.equipmentTemplates ??
      initialCompanyData.equipmentTemplates,

    expenseTemplates:
      storedCompanyData.expenseTemplates ??
      initialCompanyData.expenseTemplates,

    /*
     * Activity templates
     */
    activityTemplates:
      storedCompanyData.activityTemplates ??
      initialCompanyData.activityTemplates,

    activityTemplateMaterials:
      storedCompanyData.activityTemplateMaterials ??
      initialCompanyData.activityTemplateMaterials,

    activityTemplateLabour:
      storedCompanyData.activityTemplateLabour ??
      initialCompanyData.activityTemplateLabour,

    activityTemplateEquipment:
      storedCompanyData.activityTemplateEquipment ??
      initialCompanyData.activityTemplateEquipment,

    activityTemplateExpenses:
      storedCompanyData.activityTemplateExpenses ??
      initialCompanyData.activityTemplateExpenses,

    /*
     * Project templates
     */
    projectTemplates:
      storedCompanyData.projectTemplates ??
      initialCompanyData.projectTemplates,

    projectTemplateStages:
      storedCompanyData.projectTemplateStages ??
      initialCompanyData.projectTemplateStages,

    projectTemplateActivities:
      storedCompanyData.projectTemplateActivities ??
      initialCompanyData.projectTemplateActivities,

    /*
     * Resources attached to template activities
     */
    projectTemplateActivityMaterials:
      storedCompanyData.projectTemplateActivityMaterials ??
      initialCompanyData.projectTemplateActivityMaterials,

    projectTemplateActivityLabour:
      storedCompanyData.projectTemplateActivityLabour ??
      initialCompanyData.projectTemplateActivityLabour,

    projectTemplateActivityEquipment:
      storedCompanyData.projectTemplateActivityEquipment ??
      initialCompanyData.projectTemplateActivityEquipment,

    projectTemplateActivityExpenses:
      storedCompanyData.projectTemplateActivityExpenses ??
      initialCompanyData.projectTemplateActivityExpenses,

    /*
     * Operational projects
     */
    projects:
      storedCompanyData.projects ??
      initialCompanyData.projects,

    projectStages:
      storedCompanyData.projectStages ??
      initialCompanyData.projectStages,

    projectActivities:
      storedCompanyData.projectActivities ??
      initialCompanyData.projectActivities,

    /*
     * Operational project resources
     */
    projectMaterials:
      storedCompanyData.projectMaterials ??
      initialCompanyData.projectMaterials,

    projectLabours:
      storedCompanyData.projectLabours ??
      initialCompanyData.projectLabours,

    projectEquipment:
      storedCompanyData.projectEquipment ??
      initialCompanyData.projectEquipment,

    projectExpenses:
      storedCompanyData.projectExpenses ??
      initialCompanyData.projectExpenses,
  };
}

export function CompanyProvider({
  children,
}: CompanyProviderProps) {
  const [companyData, setCompanyData] =
    useState<CompanyData>(
      createInitialCompanyData
    );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        COMPANY_STORAGE_KEY,
        JSON.stringify(companyData)
      );
    } catch (error) {
      console.error(
        "Could not save company data to localStorage.",
        error
      );
    }
  }, [companyData]);

  function resetCompanyData() {
    setCompanyData(initialCompanyData);
  }

  const contextValue =
    useMemo<CompanyContextValue>(
      () => ({
        companyData,
        setCompanyData,
        resetCompanyData,
      }),
      [companyData]
    );

  return (
    <CompanyContext.Provider
      value={contextValue}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export default CompanyProvider;