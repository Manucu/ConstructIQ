export type ProjectMaterialStatus =
  | "PLANNED"
  | "ORDERED"
  | "PARTIALLY_DELIVERED"
  | "DELIVERED"
  | "CANCELLED";

export type ProjectMaterial = {
  id: string;

  projectId: string;

  projectStageId: string;

  projectActivityId: string;

  companyMaterialId: string;

  sourceMaterialTemplateId?: string;

  estimatedQuantity: number;

  estimatedUnitCost?: number;

  estimatedTotalCost?: number;

  actualQuantity: number;

  actualCost: number;

  status: ProjectMaterialStatus;

  notes?: string;
};

export const projectMaterials:
  ProjectMaterial[] = [];