import type {
  MaterialCategory,
  UnitOfMeasure,
} from "@/features/company/data/materialTemplates";

export type CompanyMaterialStatus = "ACTIVE" | "INACTIVE";

export type CompanyMaterial = {
  id: string;
  templateId?: string;
  code: string;
  name: string;
  category: MaterialCategory;
  unit: UnitOfMeasure;
  status: CompanyMaterialStatus;

  /**
   * Estimated cost used for planning and budgeting only.
   * Real project cost comes from approved invoice lines.
   */
  estimatedUnitCost?: number;

  /**
   * True if material was selected from the template catalog.
   * False if Owner added it manually.
   */
  fromTemplate: boolean;
};

export const materials: CompanyMaterial[] = [
  {
    id: "1",
    templateId: "2",
    code: "CON-C25",
    name: "Concrete C25/30",
    category: "Concrete",
    unit: "m³",
    status: "ACTIVE",
    estimatedUnitCost: 95,
    fromTemplate: true,
  },
  {
    id: "2",
    templateId: "6",
    code: "STEEL-12",
    name: "Steel Rebar Ø12",
    category: "Steel",
    unit: "kg",
    status: "ACTIVE",
    estimatedUnitCost: 1.45,
    fromTemplate: true,
  },
  {
    id: "3",
    templateId: "11",
    code: "BRICK-25",
    name: "Clay Brick 25cm",
    category: "Masonry",
    unit: "pcs",
    status: "ACTIVE",
    estimatedUnitCost: 0.75,
    fromTemplate: true,
  },
  {
    id: "4",
    templateId: "10",
    code: "CEMENT-40",
    name: "Cement 40kg",
    category: "Concrete",
    unit: "bag",
    status: "ACTIVE",
    estimatedUnitCost: 7.5,
    fromTemplate: true,
  },
  {
    id: "5",
    code: "CUSTOM-ADDITIVE",
    name: "Concrete Waterproof Additive",
    category: "Concrete",
    unit: "liter",
    status: "ACTIVE",
    estimatedUnitCost: 5.4,
    fromTemplate: false,
  },
];