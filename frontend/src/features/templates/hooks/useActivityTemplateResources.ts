import { useCompanyContext } from "@/features/company/context/useCompanyContext";

type CollectionName = "activityTemplateMaterials" | "activityTemplateLabour" | "activityTemplateEquipment" | "activityTemplateExpenses";

export function useActivityTemplateResources(activityTemplateId: string) {
  const { companyData, setCompanyData } = useCompanyContext();
  const materials = companyData.activityTemplateMaterials.filter(x => x.activityTemplateId === activityTemplateId);
  const labour = companyData.activityTemplateLabour.filter(x => x.activityTemplateId === activityTemplateId);
  const equipment = companyData.activityTemplateEquipment.filter(x => x.activityTemplateId === activityTemplateId);
  const expenses = companyData.activityTemplateExpenses.filter(x => x.activityTemplateId === activityTemplateId);

  function append(collection: CollectionName, item: object) {
    setCompanyData(current => ({ ...current, [collection]: [...current[collection], item] }));
  }
  function update(collection: CollectionName, id: string, values: object) {
    setCompanyData(current => ({ ...current, [collection]: current[collection].map(item => item.id === id ? { ...item, ...values } : item) }));
  }
  function remove(collection: CollectionName, id: string) {
    setCompanyData(current => ({ ...current, [collection]: current[collection].filter(item => item.id !== id) }));
  }

  function addMaterial(templateId: string) {
    const template = companyData.materialTemplates.find(x => x.id === templateId); if (!template) return;
    append("activityTemplateMaterials", { id: crypto.randomUUID(), activityTemplateId, materialTemplateId: templateId, estimatedQuantity: 1, estimatedUnitCost: template.defaultEstimatedUnitCost });
  }
  function addLabour(templateId: string) {
    const template = companyData.labourTemplates.find(x => x.id === templateId); if (!template) return;
    append("activityTemplateLabour", { id: crypto.randomUUID(), activityTemplateId, labourTemplateId: templateId, estimatedHours: 1, estimatedHourlyRate: template.estimatedHourlyRate });
  }
  function addEquipment(templateId: string) {
    const template = companyData.equipmentTemplates.find(x => x.id === templateId); if (!template) return;
    append("activityTemplateEquipment", { id: crypto.randomUUID(), activityTemplateId, equipmentTemplateId: templateId, estimatedHours: 1, estimatedHourlyRate: template.estimatedHourlyRate });
  }
  function addExpense(templateId: string) {
    const template = companyData.expenseTemplates.find(x => x.id === templateId); if (!template) return;
    append("activityTemplateExpenses", { id: crypto.randomUUID(), activityTemplateId, expenseTemplateId: templateId, estimatedQuantity: 1, estimatedUnitCost: template.estimatedUnitCost });
  }

  const totalMaterialCost = materials.reduce((t,x) => t + x.estimatedQuantity * (x.estimatedUnitCost ?? 0), 0);
  const totalLabourCost = labour.reduce((t,x) => t + x.estimatedHours * (x.estimatedHourlyRate ?? 0), 0);
  const totalEquipmentCost = equipment.reduce((t,x) => t + x.estimatedHours * (x.estimatedHourlyRate ?? 0), 0);
  const totalExpenseCost = expenses.reduce((t,x) => t + x.estimatedQuantity * (x.estimatedUnitCost ?? 0), 0);

  return { companyData, materials, labour, equipment, expenses, addMaterial, addLabour, addEquipment, addExpense, update, remove, totalEstimatedCost: totalMaterialCost + totalLabourCost + totalEquipmentCost + totalExpenseCost };
}
