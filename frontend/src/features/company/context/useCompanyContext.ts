import { useContext } from "react";

import { CompanyContext } from "./companyContextDefinition";

export function useCompanyContext() {
  const context = useContext(CompanyContext);

  if (!context) {
    throw new Error(
      "useCompanyContext must be used inside CompanyProvider"
    );
  }

  return context;
}