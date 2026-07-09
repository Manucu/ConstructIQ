export type EquipmentStatus = "ACTIVE" | "INACTIVE";

export type EquipmentCategory =
  | "Excavation"
  | "Lifting"
  | "Concrete"
  | "Transport"
  | "Power"
  | "Tools"
  | "Other";

export type Equipment = {
  id: string;
  name: string;
  category: EquipmentCategory;
  status: EquipmentStatus;
  internalHourlyRate?: number;
};

export const equipment: Equipment[] = [
  {
    id: "1",
    name: "Excavator CAT 320",
    category: "Excavation",
    status: "ACTIVE",
    internalHourlyRate: 45,
  },
  {
    id: "2",
    name: "Mini Excavator",
    category: "Excavation",
    status: "ACTIVE",
    internalHourlyRate: 30,
  },
  {
    id: "3",
    name: "Concrete Pump",
    category: "Concrete",
    status: "ACTIVE",
    internalHourlyRate: 55,
  },
  {
    id: "4",
    name: "Tower Crane",
    category: "Lifting",
    status: "ACTIVE",
    internalHourlyRate: 65,
  },
  {
    id: "5",
    name: "Generator",
    category: "Power",
    status: "ACTIVE",
    internalHourlyRate: 12,
  },
];