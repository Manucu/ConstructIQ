import { useMemo } from "react";

import { useCompanyContext } from "@/features/company/context/useCompanyContext";

import type { CompanyData } from "@/features/company/context/companyContextDefinition";

type ResourceCollectionName =
  | "projectTemplateActivityMaterials"
  | "projectTemplateActivityLabour"
  | "projectTemplateActivityEquipment"
  | "projectTemplateActivityExpenses";

type ResourceItem =
  CompanyData[ResourceCollectionName][number];

export function useProjectTemplateActivityResources(
  projectTemplateActivityId: string
) {
  const { companyData, setCompanyData } =
    useCompanyContext();

  const materials = useMemo(
    () =>
      companyData.projectTemplateActivityMaterials.filter(
        item =>
          item.projectTemplateActivityId ===
          projectTemplateActivityId
      ),
    [
      companyData.projectTemplateActivityMaterials,
      projectTemplateActivityId,
    ]
  );

  const labour = useMemo(
    () =>
      companyData.projectTemplateActivityLabour.filter(
        item =>
          item.projectTemplateActivityId ===
          projectTemplateActivityId
      ),
    [
      companyData.projectTemplateActivityLabour,
      projectTemplateActivityId,
    ]
  );

  const equipment = useMemo(
    () =>
      companyData.projectTemplateActivityEquipment.filter(
        item =>
          item.projectTemplateActivityId ===
          projectTemplateActivityId
      ),
    [
      companyData.projectTemplateActivityEquipment,
      projectTemplateActivityId,
    ]
  );

  const expenses = useMemo(
    () =>
      companyData.projectTemplateActivityExpenses.filter(
        item =>
          item.projectTemplateActivityId ===
          projectTemplateActivityId
      ),
    [
      companyData.projectTemplateActivityExpenses,
      projectTemplateActivityId,
    ]
  );

  function append(
    collection: ResourceCollectionName,
    item: ResourceItem
  ) {
    setCompanyData(currentData => ({
      ...currentData,
      [collection]: [
        ...currentData[collection],
        item,
      ],
    }));
  }

  function update(
    collection: ResourceCollectionName,
    id: string,
    values: object
  ) {
    setCompanyData(currentData => ({
      ...currentData,
      [collection]: currentData[collection].map(
        item =>
          item.id === id
            ? { ...item, ...values }
            : item
      ),
    }));
  }

  function remove(
    collection: ResourceCollectionName,
    id: string
  ) {
    setCompanyData(currentData => ({
      ...currentData,
      [collection]: currentData[collection].filter(
        item => item.id !== id
      ),
    }));
  }

  function addMaterial(materialTemplateId: string) {
    const template =
      companyData.materialTemplates.find(
        item => item.id === materialTemplateId
      );

    if (!template) return;

    append("projectTemplateActivityMaterials", {
      id: crypto.randomUUID(),
      projectTemplateActivityId,
      materialTemplateId,
      estimatedQuantity: 1,
      estimatedUnitCost:
        template.defaultEstimatedUnitCost,
    });
  }

  function addLabour(labourTemplateId: string) {
    const template = companyData.labourTemplates.find(
      item => item.id === labourTemplateId
    );

    if (!template) return;

    append("projectTemplateActivityLabour", {
      id: crypto.randomUUID(),
      projectTemplateActivityId,
      labourTemplateId,
      estimatedHours: 1,
      estimatedHourlyRate:
        template.estimatedHourlyRate,
    });
  }

  function addEquipment(
    equipmentTemplateId: string
  ) {
    const template =
      companyData.equipmentTemplates.find(
        item => item.id === equipmentTemplateId
      );

    if (!template) return;

    append("projectTemplateActivityEquipment", {
      id: crypto.randomUUID(),
      projectTemplateActivityId,
      equipmentTemplateId,
      estimatedHours: 1,
      estimatedHourlyRate:
        template.estimatedHourlyRate,
    });
  }

  function addExpense(expenseTemplateId: string) {
    const template = companyData.expenseTemplates.find(
      item => item.id === expenseTemplateId
    );

    if (!template) return;

    append("projectTemplateActivityExpenses", {
      id: crypto.randomUUID(),
      projectTemplateActivityId,
      expenseTemplateId,
      estimatedQuantity: 1,
      estimatedUnitCost: template.estimatedUnitCost,
    });
  }

  const totalMaterialCost = materials.reduce(
    (total, item) =>
      total +
      item.estimatedQuantity *
        (item.estimatedUnitCost ?? 0),
    0
  );

  const totalLabourCost = labour.reduce(
    (total, item) =>
      total +
      item.estimatedHours *
        (item.estimatedHourlyRate ?? 0),
    0
  );

  const totalEquipmentCost = equipment.reduce(
    (total, item) =>
      total +
      item.estimatedHours *
        (item.estimatedHourlyRate ?? 0),
    0
  );

  const totalExpenseCost = expenses.reduce(
    (total, item) =>
      total +
      item.estimatedQuantity *
        (item.estimatedUnitCost ?? 0),
    0
  );

  return {
    companyData,
    materials,
    labour,
    equipment,
    expenses,
    addMaterial,
    addLabour,
    addEquipment,
    addExpense,
    update,
    remove,
    totalMaterialCost,
    totalLabourCost,
    totalEquipmentCost,
    totalExpenseCost,
    totalEstimatedCost:
      totalMaterialCost +
      totalLabourCost +
      totalEquipmentCost +
      totalExpenseCost,
  };
}
