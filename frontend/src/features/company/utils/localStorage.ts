import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
} from "@/utils/storage";

import type { CompanyData } from "../context/companyContextDefinition";

const COMPANY_STORAGE_KEY = "constructiq-company";

export function saveCompany(data: CompanyData) {
  saveToStorage(COMPANY_STORAGE_KEY, data);
}

export function loadCompany() {
  return loadFromStorage<CompanyData>(
    COMPANY_STORAGE_KEY
  );
}

export function clearCompany() {
  removeFromStorage(COMPANY_STORAGE_KEY);
}