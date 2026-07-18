export type MaterialTemplateStatus =
  | "ACTIVE"
  | "INACTIVE";

export type MaterialCategory =
  | "Concrete"
  | "Steel"
  | "Masonry"
  | "Aggregates"
  | "Wood"
  | "Insulation"
  | "Roof"
  | "Finishing"
  | "Electrical"
  | "Plumbing"
  | "Other";

export type UnitOfMeasure =
  | "pcs"
  | "kg"
  | "m"
  | "m²"
  | "m³"
  | "liter"
  | "bag"
  | "roll"
  | "set"
  | "ton";

export type MaterialTemplate = {
  id: string;
  code: string;
  name: string;
  category: MaterialCategory;
  unit: UnitOfMeasure;
  defaultEstimatedUnitCost?: number;
  status: MaterialTemplateStatus;
};

export const materialCategories: MaterialCategory[] = [
  "Concrete",
  "Steel",
  "Masonry",
  "Aggregates",
  "Wood",
  "Insulation",
  "Roof",
  "Finishing",
  "Electrical",
  "Plumbing",
  "Other",
];

export const unitsOfMeasure: UnitOfMeasure[] = [
  "pcs",
  "kg",
  "m",
  "m²",
  "m³",
  "liter",
  "bag",
  "roll",
  "set",
  "ton",
];

export const materialTemplates: MaterialTemplate[] = [
  {
    id: "1",
    code: "CON-C20",
    name: "Concrete C20/25",
    category: "Concrete",
    unit: "m³",
    defaultEstimatedUnitCost: 90,
    status: "ACTIVE",
  },
  {
    id: "2",
    code: "CON-C25",
    name: "Concrete C25/30",
    category: "Concrete",
    unit: "m³",
    defaultEstimatedUnitCost: 95,
    status: "ACTIVE",
  },
  {
    id: "3",
    code: "CON-C30",
    name: "Concrete C30/37",
    category: "Concrete",
    unit: "m³",
    defaultEstimatedUnitCost: 105,
    status: "ACTIVE",
  },
  {
    id: "4",
    code: "STEEL-08",
    name: "Steel Rebar Ø8",
    category: "Steel",
    unit: "kg",
    defaultEstimatedUnitCost: 1.2,
    status: "ACTIVE",
  },
  {
    id: "5",
    code: "STEEL-10",
    name: "Steel Rebar Ø10",
    category: "Steel",
    unit: "kg",
    defaultEstimatedUnitCost: 1.3,
    status: "ACTIVE",
  },
  {
    id: "6",
    code: "STEEL-12",
    name: "Steel Rebar Ø12",
    category: "Steel",
    unit: "kg",
    defaultEstimatedUnitCost: 1.45,
    status: "ACTIVE",
  },
  {
    id: "7",
    code: "STEEL-16",
    name: "Steel Rebar Ø16",
    category: "Steel",
    unit: "kg",
    defaultEstimatedUnitCost: 1.55,
    status: "ACTIVE",
  },
  {
    id: "8",
    code: "AGG-GRAVEL",
    name: "Gravel",
    category: "Aggregates",
    unit: "ton",
    defaultEstimatedUnitCost: 28,
    status: "ACTIVE",
  },
  {
    id: "9",
    code: "AGG-SAND",
    name: "Sand",
    category: "Aggregates",
    unit: "ton",
    defaultEstimatedUnitCost: 24,
    status: "ACTIVE",
  },
  {
    id: "10",
    code: "CEMENT-40",
    name: "Cement 40kg",
    category: "Concrete",
    unit: "bag",
    defaultEstimatedUnitCost: 7.5,
    status: "ACTIVE",
  },
  {
    id: "11",
    code: "BRICK-25",
    name: "Clay Brick 25cm",
    category: "Masonry",
    unit: "pcs",
    defaultEstimatedUnitCost: 0.75,
    status: "ACTIVE",
  },
  {
    id: "12",
    code: "MORTAR-BAG",
    name: "Masonry Mortar",
    category: "Masonry",
    unit: "bag",
    defaultEstimatedUnitCost: 6.8,
    status: "ACTIVE",
  },
  {
    id: "13",
    code: "WOOD-50",
    name: "Timber Beam 50x100",
    category: "Wood",
    unit: "m",
    defaultEstimatedUnitCost: 4.2,
    status: "ACTIVE",
  },
  {
    id: "14",
    code: "ROOF-TILE",
    name: "Ceramic Roof Tile",
    category: "Roof",
    unit: "pcs",
    defaultEstimatedUnitCost: 1.15,
    status: "ACTIVE",
  },
  {
    id: "15",
    code: "WATER-MEM",
    name: "Waterproofing Membrane",
    category: "Roof",
    unit: "roll",
    defaultEstimatedUnitCost: 38,
    status: "ACTIVE",
  },
  {
    id: "16",
    code: "EPS-100",
    name: "EPS 100 Insulation",
    category: "Insulation",
    unit: "m²",
    defaultEstimatedUnitCost: 8.5,
    status: "ACTIVE",
  },
  {
    id: "17",
    code: "GYPSUM-BOARD",
    name: "Gypsum Board",
    category: "Finishing",
    unit: "pcs",
    defaultEstimatedUnitCost: 7.2,
    status: "ACTIVE",
  },
  {
    id: "18",
    code: "PAINT-W",
    name: "Interior White Paint",
    category: "Finishing",
    unit: "liter",
    defaultEstimatedUnitCost: 3.8,
    status: "ACTIVE",
  },
  {
    id: "19",
    code: "TILE-CER",
    name: "Ceramic Tiles",
    category: "Finishing",
    unit: "m²",
    defaultEstimatedUnitCost: 14,
    status: "ACTIVE",
  },
  {
    id: "20",
    code: "PVC-PIPE",
    name: "PVC Pipe",
    category: "Plumbing",
    unit: "m",
    defaultEstimatedUnitCost: 2.4,
    status: "ACTIVE",
  },
  {
    id: "21",
    code: "ELEC-CABLE",
    name: "Electrical Cable",
    category: "Electrical",
    unit: "m",
    defaultEstimatedUnitCost: 1.1,
    status: "ACTIVE",
  },
];