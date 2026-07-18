export type ProjectTemplateActivityMaterial = {
  id: string;
  projectTemplateActivityId: string;
  materialTemplateId: string;
  estimatedQuantity: number;
  estimatedUnitCost?: number;
  notes?: string;
};

export const projectTemplateActivityMaterials:
  ProjectTemplateActivityMaterial[] = [];