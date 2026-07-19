export type ActivityTemplateMaterial = {
  id: string;
  activityTemplateId: string;
  materialTemplateId: string;
  estimatedQuantity: number;
  estimatedUnitCost?: number;
  notes?: string;
};

export const activityTemplateMaterials: ActivityTemplateMaterial[] = [];
