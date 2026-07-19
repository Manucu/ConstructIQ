import type { CompanyData } from "@/features/company/context/companyContextDefinition";

export type ProjectTemplateActivitySummary = {
  materialCount: number;
  labourCount: number;
  equipmentCount: number;
  expenseCount: number;
  resourceCount: number;
  estimatedMaterialCost: number;
  estimatedLabourCost: number;
  estimatedEquipmentCost: number;
  estimatedExpenseCost: number;
  estimatedTotalCost: number;
};

export type ProjectTemplateStageSummary =
  ProjectTemplateActivitySummary & {
    activityCount: number;
  };

export type ProjectTemplateSummary =
  ProjectTemplateStageSummary & {
    stageCount: number;
  };

export class ProjectTemplateEstimator {
  static getQuantityCost(quantity: number, unitCost?: number) {
    return quantity * (unitCost ?? 0);
  }

  static getHoursCost(hours: number, hourlyRate?: number) {
    return hours * (hourlyRate ?? 0);
  }

  static getActivityMaterials(companyData: CompanyData, activityId: string) {
    return companyData.projectTemplateActivityMaterials.filter(
      item => item.projectTemplateActivityId === activityId
    );
  }

  static getActivityLabour(companyData: CompanyData, activityId: string) {
    return companyData.projectTemplateActivityLabour.filter(
      item => item.projectTemplateActivityId === activityId
    );
  }

  static getActivityEquipment(companyData: CompanyData, activityId: string) {
    return companyData.projectTemplateActivityEquipment.filter(
      item => item.projectTemplateActivityId === activityId
    );
  }

  static getActivityExpenses(companyData: CompanyData, activityId: string) {
    return companyData.projectTemplateActivityExpenses.filter(
      item => item.projectTemplateActivityId === activityId
    );
  }

  static getActivitySummary(
    companyData: CompanyData,
    activityId: string
  ): ProjectTemplateActivitySummary {
    const materials = this.getActivityMaterials(companyData, activityId);
    const labour = this.getActivityLabour(companyData, activityId);
    const equipment = this.getActivityEquipment(companyData, activityId);
    const expenses = this.getActivityExpenses(companyData, activityId);

    const estimatedMaterialCost = materials.reduce(
      (total, item) =>
        total + this.getQuantityCost(item.estimatedQuantity, item.estimatedUnitCost),
      0
    );
    const estimatedLabourCost = labour.reduce(
      (total, item) =>
        total + this.getHoursCost(item.estimatedHours, item.estimatedHourlyRate),
      0
    );
    const estimatedEquipmentCost = equipment.reduce(
      (total, item) =>
        total + this.getHoursCost(item.estimatedHours, item.estimatedHourlyRate),
      0
    );
    const estimatedExpenseCost = expenses.reduce(
      (total, item) =>
        total + this.getQuantityCost(item.estimatedQuantity, item.estimatedUnitCost),
      0
    );

    return {
      materialCount: materials.length,
      labourCount: labour.length,
      equipmentCount: equipment.length,
      expenseCount: expenses.length,
      resourceCount:
        materials.length + labour.length + equipment.length + expenses.length,
      estimatedMaterialCost,
      estimatedLabourCost,
      estimatedEquipmentCost,
      estimatedExpenseCost,
      estimatedTotalCost:
        estimatedMaterialCost +
        estimatedLabourCost +
        estimatedEquipmentCost +
        estimatedExpenseCost,
    };
  }

  static getStageActivities(companyData: CompanyData, stageId: string) {
    return companyData.projectTemplateActivities
      .filter(item => item.projectTemplateStageId === stageId)
      .sort((a, b) => a.order - b.order);
  }

  static combineActivitySummaries(
    summaries: ProjectTemplateActivitySummary[]
  ): ProjectTemplateActivitySummary {
    return summaries.reduce<ProjectTemplateActivitySummary>(
      (total, summary) => ({
        materialCount: total.materialCount + summary.materialCount,
        labourCount: total.labourCount + summary.labourCount,
        equipmentCount: total.equipmentCount + summary.equipmentCount,
        expenseCount: total.expenseCount + summary.expenseCount,
        resourceCount: total.resourceCount + summary.resourceCount,
        estimatedMaterialCost:
          total.estimatedMaterialCost + summary.estimatedMaterialCost,
        estimatedLabourCost:
          total.estimatedLabourCost + summary.estimatedLabourCost,
        estimatedEquipmentCost:
          total.estimatedEquipmentCost + summary.estimatedEquipmentCost,
        estimatedExpenseCost:
          total.estimatedExpenseCost + summary.estimatedExpenseCost,
        estimatedTotalCost:
          total.estimatedTotalCost + summary.estimatedTotalCost,
      }),
      {
        materialCount: 0,
        labourCount: 0,
        equipmentCount: 0,
        expenseCount: 0,
        resourceCount: 0,
        estimatedMaterialCost: 0,
        estimatedLabourCost: 0,
        estimatedEquipmentCost: 0,
        estimatedExpenseCost: 0,
        estimatedTotalCost: 0,
      }
    );
  }

  static getStageSummary(
    companyData: CompanyData,
    stageId: string
  ): ProjectTemplateStageSummary {
    const activities = this.getStageActivities(companyData, stageId);
    return {
      activityCount: activities.length,
      ...this.combineActivitySummaries(
        activities.map(activity =>
          this.getActivitySummary(companyData, activity.id)
        )
      ),
    };
  }

  static getProjectTemplateStages(companyData: CompanyData, templateId: string) {
    return companyData.projectTemplateStages
      .filter(item => item.projectTemplateId === templateId)
      .sort((a, b) => a.order - b.order);
  }

  static getProjectTemplateActivities(companyData: CompanyData, templateId: string) {
    const stageIds = new Set(
      this.getProjectTemplateStages(companyData, templateId).map(item => item.id)
    );
    return companyData.projectTemplateActivities.filter(item =>
      stageIds.has(item.projectTemplateStageId)
    );
  }

  static getProjectSummary(
    companyData: CompanyData,
    templateId: string
  ): ProjectTemplateSummary {
    const stages = this.getProjectTemplateStages(companyData, templateId);
    const activities = this.getProjectTemplateActivities(companyData, templateId);
    return {
      stageCount: stages.length,
      activityCount: activities.length,
      ...this.combineActivitySummaries(
        activities.map(activity =>
          this.getActivitySummary(companyData, activity.id)
        )
      ),
    };
  }
}
