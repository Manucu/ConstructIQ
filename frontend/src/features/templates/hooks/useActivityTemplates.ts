import { useCallback, useMemo } from "react";
import { useCompanyContext } from "@/features/company/context/useCompanyContext";
import type { ActivityCategory, ActivityTemplate, ActivityTemplateStatus } from "@/features/templates/data/activityTemplates";
import { ActivityTemplateService } from "@/features/templates/services/ActivityTemplateService";
import { useTemplateCrud } from "@/features/templates/hooks/useTemplateCrud";

export type SaveActivityTemplateValues = {
  name: string;
  category: ActivityCategory;
  status: ActivityTemplateStatus;
  description: string | undefined;
};

export function useActivityTemplates() {
  const { companyData, setCompanyData } = useCompanyContext();
  const activityTemplates = companyData.activityTemplates;

  const usageReferences = useMemo(
    () => companyData.projectTemplateActivities
      .filter(item => Boolean(item.activityTemplateId))
      .map(item => ({ activityTemplateId: item.activityTemplateId! })),
    [companyData.projectTemplateActivities]
  );

  const setTemplates = useCallback(
    (updater: (items: ActivityTemplate[]) => ActivityTemplate[]) => {
      setCompanyData(current => ({
        ...current,
        activityTemplates: updater(current.activityTemplates),
      }));
    },
    [setCompanyData]
  );

  const crud = useTemplateCrud<ActivityTemplate, SaveActivityTemplateValues>({
    templates: activityTemplates,
    search: useCallback((items, value) => ActivityTemplateService.search(items, value), []),
    create: useCallback(values => ActivityTemplateService.create(values), []),
    update: useCallback((items, id, values) => ActivityTemplateService.update(items, id, values), []),
    toggleStatus: useCallback((items, id) => ActivityTemplateService.toggleStatus(items, id), []),
    remove: useCallback((items, id) => ActivityTemplateService.delete(items, id), []),
    getUsageCount: useCallback(id => ActivityTemplateService.getUsageCount(id, usageReferences), [usageReferences]),
    canDelete: useCallback(id => ActivityTemplateService.canDelete(id, usageReferences), [usageReferences]),
    setTemplates,
    normalizeValues: useCallback(values => {
      const name = values.name.trim();
      if (!name) return null;
      return { ...values, name, description: values.description?.trim() || undefined };
    }, []),
    validateValues: useCallback(
      (values: SaveActivityTemplateValues, editing: ActivityTemplate | null) =>
        ActivityTemplateService.isNameAvailable(activityTemplates, values.name, editing?.id),
      [activityTemplates]
    ),
  });

  const isActivityTemplateNameAvailable = useCallback(
    (name: string, ignoredId?: string) =>
      ActivityTemplateService.isNameAvailable(activityTemplates, name, ignoredId),
    [activityTemplates]
  );

  const getActivityTemplateResourceCount = useCallback((id: string) =>
    companyData.activityTemplateMaterials.filter(x => x.activityTemplateId === id).length +
    companyData.activityTemplateLabour.filter(x => x.activityTemplateId === id).length +
    companyData.activityTemplateEquipment.filter(x => x.activityTemplateId === id).length +
    companyData.activityTemplateExpenses.filter(x => x.activityTemplateId === id).length,
    [companyData.activityTemplateMaterials, companyData.activityTemplateLabour, companyData.activityTemplateEquipment, companyData.activityTemplateExpenses]
  );

  function deleteActivityTemplate(id: string) {
    if (!crud.deleteTemplate(id)) return false;
    setCompanyData(current => ({
      ...current,
      activityTemplateMaterials: current.activityTemplateMaterials.filter(x => x.activityTemplateId !== id),
      activityTemplateLabour: current.activityTemplateLabour.filter(x => x.activityTemplateId !== id),
      activityTemplateEquipment: current.activityTemplateEquipment.filter(x => x.activityTemplateId !== id),
      activityTemplateExpenses: current.activityTemplateExpenses.filter(x => x.activityTemplateId !== id),
    }));
    return true;
  }

  return {
    activityTemplates: crud.templates,
    filteredActivityTemplates: crud.filteredTemplates,
    searchValue: crud.searchValue,
    setSearchValue: crud.setSearchValue,
    isActivityTemplateDialogOpen: crud.isTemplateDialogOpen,
    editingActivityTemplate: crud.editingTemplate,
    openAddActivityTemplateDialog: crud.openAddTemplateDialog,
    openEditActivityTemplateDialog: crud.openEditTemplateDialog,
    closeActivityTemplateDialog: crud.closeTemplateDialog,
    isActivityTemplateNameAvailable,
    saveActivityTemplate: crud.saveTemplate,
    toggleActivityTemplateStatus: crud.toggleTemplateStatus,
    getActivityTemplateUsageCount: crud.getTemplateUsageCount,
    getActivityTemplateResourceCount,
    deleteActivityTemplate,
  };
}
