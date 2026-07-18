import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { workers } from "../data/workers";
import { materials } from "../data/materials";
import { equipment } from "../data/equipment";
import { activityTemplates } from "../../templates/data/activityTemplates";
import { clients } from "../data/clients";
import { suppliers } from "../data/suppliers";
import { expenseCategories } from "../data/expenseCategories";
import { materialTemplates } from "../../templates/data/materialTemplates";

import {
  projectTemplates,
  projectTemplateStages,
} from "../../templates/data/projectTemplates";

import {
  CompanyContext,
  type CompanyData,
  type CompanyContextValue,
} from "./companyContextDefinition";

import {
  projectTemplateActivities,
} from "../../templates/data/projectTemplateActivities";

import {
  projectTemplateActivityMaterials,
} from "../../templates/components/materials-templates/projectTemplateActivityMaterials";

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

type CompanyProviderProps = {
  children: ReactNode;
};

const COMPANY_STORAGE_KEY =
  "constructiq-company-data";

const initialCompanyData: CompanyData = {
  workers,
  materials,
  equipment,
  activityTemplates,
  clients,
  suppliers,
  expenseCategories,
  materialTemplates,

  projectTemplates,
  projectTemplateStages,
  projectTemplateActivities,
  projectTemplateActivityMaterials,

  projects,
  projectStages,
  projectActivities,
  projectMaterials,
};

function loadStoredCompanyData():
  | Partial<CompanyData>
  | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(
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
   * MaterialTemplate.status este o proprietate nouă.
   *
   * Datele mai vechi din localStorage nu o au, așa
   * că le migrăm automat la ACTIVE.
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

    workers:
      storedCompanyData.workers ??
      initialCompanyData.workers,

    materials:
      storedCompanyData.materials ??
      initialCompanyData.materials,

    equipment:
      storedCompanyData.equipment ??
      initialCompanyData.equipment,

    activityTemplates:
      storedCompanyData.activityTemplates ??
      initialCompanyData.activityTemplates,

    clients:
      storedCompanyData.clients ??
      initialCompanyData.clients,

    suppliers:
      storedCompanyData.suppliers ??
      initialCompanyData.suppliers,

    expenseCategories:
      storedCompanyData.expenseCategories ??
      initialCompanyData.expenseCategories,

    materialTemplates:
      migratedMaterialTemplates,

    projectTemplates:
      storedCompanyData.projectTemplates ??
      initialCompanyData.projectTemplates,

    projectTemplateStages:
      storedCompanyData.projectTemplateStages ??
      initialCompanyData.projectTemplateStages,

    projectTemplateActivities:
      storedCompanyData.projectTemplateActivities ??
      initialCompanyData.projectTemplateActivities,

    projectTemplateActivityMaterials:
      storedCompanyData.projectTemplateActivityMaterials ??
      initialCompanyData.projectTemplateActivityMaterials,

    projects:
      storedCompanyData.projects ??
      initialCompanyData.projects,

    projectStages:
      storedCompanyData.projectStages ??
      initialCompanyData.projectStages,

    projectActivities:
      storedCompanyData.projectActivities ??
      initialCompanyData.projectActivities,

    projectMaterials:
      storedCompanyData.projectMaterials ??
      initialCompanyData.projectMaterials,
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