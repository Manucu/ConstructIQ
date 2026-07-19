/*import type { WorkerRole } from "@/features/company/data/workers";*/

export type LabourTemplateStatus =
  | "ACTIVE"
  | "INACTIVE";

export type LabourTemplate = {
  id: string;

  /**
   * Rolul necesar în activitate.
   * Template-ul nu indică o persoană concretă.
   */
  role: string;

  /**
   * Cost estimativ folosit pentru bugetare.
   * Costul real poate proveni ulterior din Worker.
   */
  estimatedHourlyRate?: number;

  status: LabourTemplateStatus;

  description?: string;
};

export const labourTemplates: LabourTemplate[] = [
  {
    id: "labour-template-1",
    role: "General Laborer",
    estimatedHourlyRate: 12,
    status: "ACTIVE",
  },
  {
    id: "labour-template-2",
    role: "Mason",
    estimatedHourlyRate: 15,
    status: "ACTIVE",
  },
  {
    id: "labour-template-3",
    role: "Steel Fixer",
    estimatedHourlyRate: 16,
    status: "ACTIVE",
  },
  {
    id: "labour-template-4",
    role: "Carpenter",
    estimatedHourlyRate: 14,
    status: "ACTIVE",
  },
  {
    id: "labour-template-5",
    role: "Equipment Operator",
    estimatedHourlyRate: 18,
    status: "ACTIVE",
  },
];