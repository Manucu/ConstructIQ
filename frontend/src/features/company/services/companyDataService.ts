import type { CompanyData } from "../context/companyContextDefinition";

function normalizeProjectTemplateStageOrder(
  companyData: CompanyData,
  projectTemplateId: string
): CompanyData {
  const normalizedStages =
    companyData.projectTemplateStages
      .filter(
        stage =>
          stage.projectTemplateId ===
          projectTemplateId
      )
      .sort(
        (firstStage, secondStage) =>
          firstStage.order - secondStage.order
      )
      .map((stage, index) => ({
        ...stage,
        order: index + 1,
      }));

  const normalizedStagesById = new Map(
    normalizedStages.map(stage => [
      stage.id,
      stage,
    ])
  );

  return {
    ...companyData,

    projectTemplateStages:
      companyData.projectTemplateStages.map(
        stage =>
          normalizedStagesById.get(stage.id) ??
          stage
      ),
  };
}

function deleteProjectTemplate(
  companyData: CompanyData,
  projectTemplateId: string
): CompanyData {
  const projectTemplateExists =
    companyData.projectTemplates.some(
      projectTemplate =>
        projectTemplate.id ===
        projectTemplateId
    );

  if (!projectTemplateExists) {
    return companyData;
  }

  const stageIds = new Set(
    companyData.projectTemplateStages
      .filter(
        stage =>
          stage.projectTemplateId ===
          projectTemplateId
      )
      .map(stage => stage.id)
  );

  return {
    ...companyData,

    projectTemplates:
      companyData.projectTemplates.filter(
        projectTemplate =>
          projectTemplate.id !==
          projectTemplateId
      ),

    projectTemplateStages:
      companyData.projectTemplateStages.filter(
        stage =>
          stage.projectTemplateId !==
          projectTemplateId
      ),

    projectTemplateActivities:
      companyData.projectTemplateActivities.filter(
        activity =>
          !stageIds.has(
            activity.projectTemplateStageId
          )
      ),
  };
}

function deleteProjectTemplateStage(
  companyData: CompanyData,
  projectTemplateStageId: string
): CompanyData {
  const stageToDelete =
    companyData.projectTemplateStages.find(
      stage =>
        stage.id ===
        projectTemplateStageId
    );

  if (!stageToDelete) {
    return companyData;
  }

  const updatedCompanyData: CompanyData = {
    ...companyData,

    projectTemplateStages:
      companyData.projectTemplateStages.filter(
        stage =>
          stage.id !==
          projectTemplateStageId
      ),

    projectTemplateActivities:
      companyData.projectTemplateActivities.filter(
        activity =>
          activity.projectTemplateStageId !==
          projectTemplateStageId
      ),
  };

  return normalizeProjectTemplateStageOrder(
    updatedCompanyData,
    stageToDelete.projectTemplateId
  );
}

export const CompanyDataService = {
  deleteProjectTemplate,
  deleteProjectTemplateStage,
};