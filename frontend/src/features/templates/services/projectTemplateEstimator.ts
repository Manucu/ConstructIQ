import type { CompanyData } from "@/features/company/context/companyContextDefinition";

export type ProjectTemplateActivitySummary = {
  materialCount: number;
  estimatedMaterialCost: number;
};

export type ProjectTemplateStageSummary = {
  activityCount: number;
  materialCount: number;
  estimatedMaterialCost: number;
};

export type ProjectTemplateSummary = {
  stageCount: number;
  activityCount: number;
  materialCount: number;
  estimatedMaterialCost: number;
};

export class ProjectTemplateEstimator {
  static getMaterialEstimatedCost(
    estimatedQuantity: number,
    estimatedUnitCost?: number
  ) {
    return (
      estimatedQuantity *
      (estimatedUnitCost ?? 0)
    );
  }

  static getActivityMaterials(
    companyData: CompanyData,
    projectTemplateActivityId: string
  ) {
    return companyData.projectTemplateActivityMaterials.filter(
      material =>
        material.projectTemplateActivityId ===
        projectTemplateActivityId
    );
  }

  static getActivitySummary(
    companyData: CompanyData,
    projectTemplateActivityId: string
  ): ProjectTemplateActivitySummary {
    const materials =
      this.getActivityMaterials(
        companyData,
        projectTemplateActivityId
      );

    const estimatedMaterialCost =
      materials.reduce(
        (totalCost, material) =>
          totalCost +
          this.getMaterialEstimatedCost(
            material.estimatedQuantity,
            material.estimatedUnitCost
          ),
        0
      );

    return {
      materialCount: materials.length,
      estimatedMaterialCost,
    };
  }

  static getStageActivities(
    companyData: CompanyData,
    projectTemplateStageId: string
  ) {
    return companyData.projectTemplateActivities
      .filter(
        activity =>
          activity.projectTemplateStageId ===
          projectTemplateStageId
      )
      .sort(
        (firstActivity, secondActivity) =>
          firstActivity.order -
          secondActivity.order
      );
  }

  static getStageMaterials(
    companyData: CompanyData,
    projectTemplateStageId: string
  ) {
    const activityIds = new Set(
      this.getStageActivities(
        companyData,
        projectTemplateStageId
      ).map(activity => activity.id)
    );

    return companyData.projectTemplateActivityMaterials.filter(
      material =>
        activityIds.has(
          material.projectTemplateActivityId
        )
    );
  }

  static getStageSummary(
    companyData: CompanyData,
    projectTemplateStageId: string
  ): ProjectTemplateStageSummary {
    const activities =
      this.getStageActivities(
        companyData,
        projectTemplateStageId
      );

    const materials =
      this.getStageMaterials(
        companyData,
        projectTemplateStageId
      );

    const estimatedMaterialCost =
      materials.reduce(
        (totalCost, material) =>
          totalCost +
          this.getMaterialEstimatedCost(
            material.estimatedQuantity,
            material.estimatedUnitCost
          ),
        0
      );

    return {
      activityCount: activities.length,
      materialCount: materials.length,
      estimatedMaterialCost,
    };
  }

  static getProjectTemplateStages(
    companyData: CompanyData,
    projectTemplateId: string
  ) {
    return companyData.projectTemplateStages
      .filter(
        stage =>
          stage.projectTemplateId ===
          projectTemplateId
      )
      .sort(
        (firstStage, secondStage) =>
          firstStage.order -
          secondStage.order
      );
  }

  static getProjectTemplateActivities(
    companyData: CompanyData,
    projectTemplateId: string
  ) {
    const stageIds = new Set(
      this.getProjectTemplateStages(
        companyData,
        projectTemplateId
      ).map(stage => stage.id)
    );

    return companyData.projectTemplateActivities
      .filter(activity =>
        stageIds.has(
          activity.projectTemplateStageId
        )
      )
      .sort(
        (firstActivity, secondActivity) =>
          firstActivity.order -
          secondActivity.order
      );
  }

  static getProjectTemplateMaterials(
    companyData: CompanyData,
    projectTemplateId: string
  ) {
    const activityIds = new Set(
      this.getProjectTemplateActivities(
        companyData,
        projectTemplateId
      ).map(activity => activity.id)
    );

    return companyData.projectTemplateActivityMaterials.filter(
      material =>
        activityIds.has(
          material.projectTemplateActivityId
        )
    );
  }

  static getProjectSummary(
    companyData: CompanyData,
    projectTemplateId: string
  ): ProjectTemplateSummary {
    const stages =
      this.getProjectTemplateStages(
        companyData,
        projectTemplateId
      );

    const activities =
      this.getProjectTemplateActivities(
        companyData,
        projectTemplateId
      );

    const materials =
      this.getProjectTemplateMaterials(
        companyData,
        projectTemplateId
      );

    const estimatedMaterialCost =
      materials.reduce(
        (totalCost, material) =>
          totalCost +
          this.getMaterialEstimatedCost(
            material.estimatedQuantity,
            material.estimatedUnitCost
          ),
        0
      );

    return {
      stageCount: stages.length,
      activityCount: activities.length,
      materialCount: materials.length,
      estimatedMaterialCost,
    };
  }
}