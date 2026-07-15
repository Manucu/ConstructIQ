export type CompanyWorkerStatus = "ACTIVE" | "INACTIVE";

export type CompanyWorker = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  email?: string;
  hourlyRate?: number;
  status: CompanyWorkerStatus;
};