import type { CompanyData } from "@/features/company/context/companyContextDefinition";
import type { CompanyMaterial } from "@/features/company/data/materials";
import type { Project, ProjectStatus } from "@/features/projects/data/projects";
import type { ProjectStage } from "@/features/projects/data/projectStages";
import type { ProjectActivity } from "@/features/projects/data/projectActivities";
import type { ProjectMaterial } from "@/features/projects/data/projectMaterials";
import type { ProjectLabour } from "@/features/projects/data/projectLabours";
import type { ProjectEquipment } from "@/features/projects/data/projectEquipment";
import type { ProjectExpense } from "@/features/projects/data/projectExpenses";

export type GenerateProjectValues = {
  projectTemplateId: string;
  name: string;
  clientId?: string;
  clientName?: string;
  address?: string;
  status?: ProjectStatus;
  startDate?: string;
};

export type ProjectGenerationResult = {
  companyData: CompanyData;
  project: Project;
  stages: ProjectStage[];
  activities: ProjectActivity[];
  materials: ProjectMaterial[];
  labours: ProjectLabour[];
  equipment: ProjectEquipment[];
  expenses: ProjectExpense[];
  createdCompanyMaterials: CompanyMaterial[];
};

function createId() {
  return crypto.randomUUID();
}

function normalizeOptionalText(value?: string) {
  const normalizedValue = value?.trim();
  return normalizedValue || undefined;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + Math.max(0, days));
  return nextDate;
}

function toIsoDate(date: Date) {
  return date.toISOString();
}

function getNonNegativeNumber(value: number | undefined) {
  return Math.max(0, value ?? 0);
}

function assertUniqueProjectName(companyData: CompanyData, name: string) {
  const normalizedName = name.trim().toLowerCase();
  const duplicateExists = companyData.projects.some(
    project => project.name.trim().toLowerCase() === normalizedName
  );

  if (duplicateExists) {
    throw new Error(`A project named "${name.trim()}" already exists.`);
  }
}

export class ProjectGenerationService {
  static generate(
    companyData: CompanyData,
    values: GenerateProjectValues
  ): ProjectGenerationResult {
    const name = values.name.trim();

    if (!name) {
      throw new Error("Project name is required.");
    }

    assertUniqueProjectName(companyData, name);

    const projectTemplate = companyData.projectTemplates.find(
      template => template.id === values.projectTemplateId
    );

    if (!projectTemplate) {
      throw new Error("The selected project template no longer exists.");
    }

    if (projectTemplate.status !== "ACTIVE") {
      throw new Error("Only active project templates can generate projects.");
    }

    const client = values.clientId
      ? companyData.clients.find(item => item.id === values.clientId)
      : undefined;

    if (values.clientId && !client) {
      throw new Error("The selected client no longer exists.");
    }

    const templateStages = companyData.projectTemplateStages
      .filter(
        stage =>
          stage.projectTemplateId === projectTemplate.id &&
          stage.status === "ACTIVE"
      )
      .sort((firstStage, secondStage) => firstStage.order - secondStage.order);

    const templateStageIds = new Set(templateStages.map(stage => stage.id));

    const templateActivities = companyData.projectTemplateActivities
      .filter(
        activity =>
          templateStageIds.has(activity.projectTemplateStageId) &&
          activity.status === "ACTIVE"
      )
      .sort((firstActivity, secondActivity) => firstActivity.order - secondActivity.order);

    const activityTemplateById = new Map(
      companyData.activityTemplates.map(template => [template.id, template])
    );
    const materialTemplateById = new Map(
      companyData.materialTemplates.map(template => [template.id, template])
    );
    const labourTemplateById = new Map(
      companyData.labourTemplates.map(template => [template.id, template])
    );
    const equipmentTemplateById = new Map(
      companyData.equipmentTemplates.map(template => [template.id, template])
    );
    const expenseTemplateById = new Map(
      companyData.expenseTemplates.map(template => [template.id, template])
    );

    const projectId = createId();
    const stageIdByTemplateStageId = new Map<string, string>();
    const activityIdByTemplateActivityId = new Map<string, string>();

    const stages: ProjectStage[] = templateStages.map(stage => {
      const stageId = createId();
      stageIdByTemplateStageId.set(stage.id, stageId);

      return {
        id: stageId,
        projectId,
        sourceProjectTemplateStageId: stage.id,
        name: stage.name,
        description: stage.description,
        order: stage.order,
        status: "NOT_STARTED",
        progress: 0,
        plannedBudget: 0,
        spent: 0,
      };
    });

    const requestedStartDate = values.startDate
      ? new Date(values.startDate)
      : undefined;

    if (requestedStartDate && Number.isNaN(requestedStartDate.getTime())) {
      throw new Error("Project start date is invalid.");
    }

    const stageCursorById = new Map<string, Date>();
    let projectCursor = requestedStartDate
      ? new Date(requestedStartDate)
      : undefined;

    for (const stage of templateStages) {
      if (projectCursor) {
        stageCursorById.set(stage.id, new Date(projectCursor));
        projectCursor = addDays(
          projectCursor,
          getNonNegativeNumber(stage.estimatedDurationDays)
        );
      }
    }

    const activities: ProjectActivity[] = templateActivities.map(templateActivity => {
      const projectStageId = stageIdByTemplateStageId.get(
        templateActivity.projectTemplateStageId
      );

      if (!projectStageId) {
        throw new Error(
          `Could not map template stage ${templateActivity.projectTemplateStageId}.`
        );
      }

      const activityTemplate = activityTemplateById.get(
        templateActivity.activityTemplateId
      );

      if (!activityTemplate) {
        throw new Error(
          `Activity template ${templateActivity.activityTemplateId} no longer exists.`
        );
      }

      const activityId = createId();
      activityIdByTemplateActivityId.set(templateActivity.id, activityId);

      const stageCursor = stageCursorById.get(
        templateActivity.projectTemplateStageId
      );
      const durationDays = getNonNegativeNumber(
        templateActivity.estimatedDurationDays
      );
      const plannedStartDate = stageCursor
        ? toIsoDate(stageCursor)
        : undefined;
      const plannedEndDate = stageCursor
        ? toIsoDate(addDays(stageCursor, durationDays))
        : undefined;

      if (stageCursor) {
        stageCursorById.set(
          templateActivity.projectTemplateStageId,
          addDays(stageCursor, durationDays)
        );
      }

      return {
        id: activityId,
        projectId,
        projectStageId,
        sourceProjectTemplateActivityId: templateActivity.id,
        sourceActivityTemplateId: templateActivity.activityTemplateId,
        name: activityTemplate.name,
        description:
          templateActivity.description ?? activityTemplate.description,
        order: templateActivity.order,
        status: "NOT_STARTED",
        progress: 0,
        plannedStartDate,
        plannedEndDate,
      };
    });

    const createdCompanyMaterials: CompanyMaterial[] = [];
    const companyMaterialIdByTemplateId = new Map<string, string>();

    for (const companyMaterial of companyData.materials) {
      if (companyMaterial.templateId) {
        companyMaterialIdByTemplateId.set(
          companyMaterial.templateId,
          companyMaterial.id
        );
      }
    }

    const materials: ProjectMaterial[] = [];
    const labours: ProjectLabour[] = [];
    const equipment: ProjectEquipment[] = [];
    const expenses: ProjectExpense[] = [];

    for (const templateActivity of templateActivities) {
      const projectActivityId = activityIdByTemplateActivityId.get(
        templateActivity.id
      );
      const projectStageId = stageIdByTemplateStageId.get(
        templateActivity.projectTemplateStageId
      );

      if (!projectActivityId || !projectStageId) {
        throw new Error(`Could not map template activity ${templateActivity.id}.`);
      }

      const templateMaterials = companyData.projectTemplateActivityMaterials.filter(
        item => item.projectTemplateActivityId === templateActivity.id
      );

      for (const templateMaterial of templateMaterials) {
        const materialTemplate = materialTemplateById.get(
          templateMaterial.materialTemplateId
        );

        if (!materialTemplate) {
          throw new Error(
            `Material template ${templateMaterial.materialTemplateId} no longer exists.`
          );
        }

        let companyMaterialId = companyMaterialIdByTemplateId.get(
          materialTemplate.id
        );

        if (!companyMaterialId) {
          const companyMaterial: CompanyMaterial = {
            id: createId(),
            templateId: materialTemplate.id,
            code: materialTemplate.code,
            name: materialTemplate.name,
            category: materialTemplate.category,
            unit: materialTemplate.unit,
            status: "ACTIVE",
            estimatedUnitCost: materialTemplate.defaultEstimatedUnitCost,
            fromTemplate: true,
          };

          createdCompanyMaterials.push(companyMaterial);
          companyMaterialId = companyMaterial.id;
          companyMaterialIdByTemplateId.set(materialTemplate.id, companyMaterialId);
        }

        const estimatedQuantity = getNonNegativeNumber(
          templateMaterial.estimatedQuantity
        );
        const estimatedUnitCost =
          templateMaterial.estimatedUnitCost ??
          materialTemplate.defaultEstimatedUnitCost;

        materials.push({
          id: createId(),
          projectId,
          projectStageId,
          projectActivityId,
          companyMaterialId,
          sourceMaterialTemplateId: materialTemplate.id,
          estimatedQuantity,
          estimatedUnitCost,
          estimatedTotalCost:
            estimatedUnitCost === undefined
              ? undefined
              : estimatedQuantity * estimatedUnitCost,
          actualQuantity: 0,
          actualCost: 0,
          status: "PLANNED",
          notes: templateMaterial.notes,
        });
      }

      const templateLabours = companyData.projectTemplateActivityLabour.filter(
        item => item.projectTemplateActivityId === templateActivity.id
      );

      for (const templateLabour of templateLabours) {
        const labourTemplate = labourTemplateById.get(
          templateLabour.labourTemplateId
        );

        if (!labourTemplate) {
          throw new Error(
            `Labour template ${templateLabour.labourTemplateId} no longer exists.`
          );
        }

        labours.push({
          id: createId(),
          projectId,
          projectActivityId,
          labourTemplateId: labourTemplate.id,
          role: labourTemplate.role,
          estimatedHours: getNonNegativeNumber(templateLabour.estimatedHours),
          actualHours: 0,
          estimatedHourlyRate:
            templateLabour.estimatedHourlyRate ??
            labourTemplate.estimatedHourlyRate,
          notes: templateLabour.notes,
        });
      }

      const templateEquipment = companyData.projectTemplateActivityEquipment.filter(
        item => item.projectTemplateActivityId === templateActivity.id
      );

      for (const templateEquipmentItem of templateEquipment) {
        const equipmentTemplate = equipmentTemplateById.get(
          templateEquipmentItem.equipmentTemplateId
        );

        if (!equipmentTemplate) {
          throw new Error(
            `Equipment template ${templateEquipmentItem.equipmentTemplateId} no longer exists.`
          );
        }

        equipment.push({
          id: createId(),
          projectId,
          projectActivityId,
          equipmentTemplateId: equipmentTemplate.id,
          name: equipmentTemplate.name,
          estimatedHours: getNonNegativeNumber(
            templateEquipmentItem.estimatedHours
          ),
          actualHours: 0,
          estimatedHourlyRate:
            templateEquipmentItem.estimatedHourlyRate ??
            equipmentTemplate.estimatedHourlyRate,
          notes: templateEquipmentItem.notes,
        });
      }

      const templateExpenses = companyData.projectTemplateActivityExpenses.filter(
        item => item.projectTemplateActivityId === templateActivity.id
      );

      for (const templateExpense of templateExpenses) {
        const expenseTemplate = expenseTemplateById.get(
          templateExpense.expenseTemplateId
        );

        if (!expenseTemplate) {
          throw new Error(
            `Expense template ${templateExpense.expenseTemplateId} no longer exists.`
          );
        }

        expenses.push({
          id: createId(),
          projectId,
          projectActivityId,
          expenseTemplateId: expenseTemplate.id,
          name: expenseTemplate.name,
          estimatedQuantity: getNonNegativeNumber(
            templateExpense.estimatedQuantity
          ),
          actualQuantity: 0,
          estimatedUnitCost:
            templateExpense.estimatedUnitCost ??
            expenseTemplate.estimatedUnitCost,
          notes: templateExpense.notes,
        });
      }
    }

    const materialCost = materials.reduce(
      (total, item) => total + (item.estimatedTotalCost ?? 0),
      0
    );
    const labourCost = labours.reduce(
      (total, item) =>
        total + item.estimatedHours * (item.estimatedHourlyRate ?? 0),
      0
    );
    const equipmentCost = equipment.reduce(
      (total, item) =>
        total + item.estimatedHours * (item.estimatedHourlyRate ?? 0),
      0
    );
    const expenseCost = expenses.reduce(
      (total, item) =>
        total + item.estimatedQuantity * (item.estimatedUnitCost ?? 0),
      0
    );
    const generatedBudget =
      materialCost + labourCost + equipmentCost + expenseCost;

    const budget =
      generatedBudget > 0
        ? generatedBudget
        : projectTemplate.estimatedBudget;

    const project: Project = {
      id: projectId,
      name,
      clientId: client?.id,
      clientName:
        normalizeOptionalText(values.clientName) ??
        client?.name,
      address:
        normalizeOptionalText(values.address) ??
        client?.address,
      status: values.status ?? "PLANNING",
      progress: 0,
      health: 100,
      budget,
      spent: 0,
      sourceProjectTemplateId: projectTemplate.id,
      createdAt: new Date().toISOString(),
    };

    const stageBudgetById = new Map<string, number>();

    const addStageCost = (projectStageId: string, cost: number) => {
      stageBudgetById.set(
        projectStageId,
        (stageBudgetById.get(projectStageId) ?? 0) + cost
      );
    };

    for (const item of materials) {
      addStageCost(item.projectStageId, item.estimatedTotalCost ?? 0);
    }

    const stageIdByActivityId = new Map(
      activities.map(activity => [activity.id, activity.projectStageId])
    );

    for (const item of labours) {
      const stageId = stageIdByActivityId.get(item.projectActivityId);
      if (stageId) {
        addStageCost(
          stageId,
          item.estimatedHours * (item.estimatedHourlyRate ?? 0)
        );
      }
    }

    for (const item of equipment) {
      const stageId = stageIdByActivityId.get(item.projectActivityId);
      if (stageId) {
        addStageCost(
          stageId,
          item.estimatedHours * (item.estimatedHourlyRate ?? 0)
        );
      }
    }

    for (const item of expenses) {
      const stageId = stageIdByActivityId.get(item.projectActivityId);
      if (stageId) {
        addStageCost(
          stageId,
          item.estimatedQuantity * (item.estimatedUnitCost ?? 0)
        );
      }
    }

    const stagesWithBudgets = stages.map(stage => ({
      ...stage,
      plannedBudget: stageBudgetById.get(stage.id) ?? 0,
    }));

    const nextCompanyData: CompanyData = {
      ...companyData,
      materials: [...companyData.materials, ...createdCompanyMaterials],
      projects: [...companyData.projects, project],
      projectStages: [...companyData.projectStages, ...stagesWithBudgets],
      projectActivities: [...companyData.projectActivities, ...activities],
      projectMaterials: [...companyData.projectMaterials, ...materials],
      projectLabours: [...companyData.projectLabours, ...labours],
      projectEquipment: [...companyData.projectEquipment, ...equipment],
      projectExpenses: [...companyData.projectExpenses, ...expenses],
    };

    return {
      companyData: nextCompanyData,
      project,
      stages: stagesWithBudgets,
      activities,
      materials,
      labours,
      equipment,
      expenses,
      createdCompanyMaterials,
    };
  }
}
