export type WorkerStatus = "ACTIVE" | "INACTIVE";

export type WorkerRole =
  | "Site Engineer"
  | "Foreman"
  | "Mason"
  | "Steel Fixer"
  | "Carpenter"
  | "Electrician"
  | "Plumber"
  | "Painter"
  | "Equipment Operator"
  | "General Laborer";

export type Worker = {
  id: string;
  firstName: string;
  lastName: string;
  role: WorkerRole;
  status: WorkerStatus;
  phone?: string;

  /**
   * Confidential.
   * Visible only to Owner and Accountant.
   * Site Engineer must never see this value.
   */
  internalHourlyRate: number;
};

export const workers: Worker[] = [
  {
    id: "1",
    firstName: "Ion",
    lastName: "Popescu",
    role: "Mason",
    status: "ACTIVE",
    phone: "+40 700 000 001",
    internalHourlyRate: 15,
  },
  {
    id: "2",
    firstName: "Mihai",
    lastName: "Radu",
    role: "Steel Fixer",
    status: "ACTIVE",
    phone: "+40 700 000 002",
    internalHourlyRate: 16,
  },
  {
    id: "3",
    firstName: "Vasile",
    lastName: "Ionescu",
    role: "Carpenter",
    status: "ACTIVE",
    phone: "+40 700 000 003",
    internalHourlyRate: 14,
  },
  {
    id: "4",
    firstName: "Andrei",
    lastName: "Moldovan",
    role: "Site Engineer",
    status: "ACTIVE",
    phone: "+40 700 000 004",
    internalHourlyRate: 25,
  },
  {
    id: "5",
    firstName: "Cristian",
    lastName: "Marin",
    role: "Equipment Operator",
    status: "ACTIVE",
    phone: "+40 700 000 005",
    internalHourlyRate: 18,
  },
];