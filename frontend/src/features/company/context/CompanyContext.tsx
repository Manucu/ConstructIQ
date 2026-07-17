import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { workers } from "../data/workers";
import { materials } from "../data/materials";
import { equipment } from "../data/equipment";
import { activityTemplates } from "../data/activityTemplates";
import { clients } from "../data/clients";
import { suppliers } from "../data/suppliers";
import { expenseCategories } from "../data/expenseCategories";
import { materialTemplates } from "../data/materialTemplates";

import {
  projectTemplates,
  projectTemplateStages,
} from "../data/projectTemplates";

import {
  CompanyContext,
  type CompanyData,
  type CompanyContextValue,
} from "./companyContextDefinition";

import {
  projectTemplateActivities,
} from "../data/projectTemplateActivities";

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
   * Datele inițiale sunt puse primele.
   *
   * Astfel, când adăugăm o proprietate nouă precum
   * projectTemplateStages, utilizatorii care au deja
   * date vechi în localStorage primesc automat
   * valoarea inițială.
   */
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
      storedCompanyData.materialTemplates ??
      initialCompanyData.materialTemplates,

    projectTemplates:
      storedCompanyData.projectTemplates ??
      initialCompanyData.projectTemplates,

    projectTemplateStages:
      storedCompanyData.projectTemplateStages ??
      initialCompanyData.projectTemplateStages,
    
    projectTemplateActivities:
      storedCompanyData.projectTemplateActivities ??
      initialCompanyData.projectTemplateActivities,
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