import { useEffect, useMemo, useState } from "react";

import type { ReactNode } from "react";

import {
  CompanyContext,
  type CompanyContextValue,
  type CompanyData,
} from "./companyContextDefinition";

import { activityTemplates } from "../data/activityTemplates";
import { clients } from "../data/clients";
import { equipment } from "../data/equipment";
import { expenseCategories } from "../data/expenseCategories";
import { materials } from "../data/materials";
import { materialTemplates } from "../data/materialTemplates";
import { suppliers } from "../data/suppliers";
import { workers } from "../data/workers";

import {
  loadCompany,
  saveCompany,
} from "../utils/localStorage";

type CompanyProviderProps = {
  children: ReactNode;
};

const initialCompanyData: CompanyData = {
  workers,
  materials,
  equipment,
  activityTemplates,
  clients,
  suppliers,
  expenseCategories,
  materialTemplates,
};

export function CompanyProvider({
  children,
}: CompanyProviderProps) {
  const storedCompany = useMemo(() => loadCompany(), []);

  const [companyData, setCompanyData] = useState<CompanyData>(
    () => storedCompany ?? initialCompanyData
  );

  const value = useMemo<CompanyContextValue>(
    () => ({
      companyData,
      setCompanyData,
    }),
    [companyData]
  );

  useEffect(() => {
    saveCompany(companyData);
  }, [companyData]);

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
}