/*import type {
  EquipmentCategory,
} from "@/features/company/data/equipment";*/

export type EquipmentTemplateStatus =
  | "ACTIVE"
  | "INACTIVE";

export type EquipmentTemplate = {
  id: string;

  name: string;

  category: string;

  /**
   * Cost estimativ folosit pentru planificare.
   * Costul operațional real rămâne în Company Equipment.
   */
  estimatedHourlyRate?: number;

  status: EquipmentTemplateStatus;

  description?: string;
};

export const equipmentTemplates:
  EquipmentTemplate[] = [
    {
      id: "equipment-template-1",
      name: "Excavator",
      category: "Excavation",
      estimatedHourlyRate: 45,
      status: "ACTIVE",
    },
    {
      id: "equipment-template-2",
      name: "Mini Excavator",
      category: "Excavation",
      estimatedHourlyRate: 30,
      status: "ACTIVE",
    },
    {
      id: "equipment-template-3",
      name: "Concrete Pump",
      category: "Concrete",
      estimatedHourlyRate: 55,
      status: "ACTIVE",
    },
    {
      id: "equipment-template-4",
      name: "Tower Crane",
      category: "Lifting",
      estimatedHourlyRate: 65,
      status: "ACTIVE",
    },
    {
      id: "equipment-template-5",
      name: "Generator",
      category: "Power",
      estimatedHourlyRate: 12,
      status: "ACTIVE",
    },
  ];