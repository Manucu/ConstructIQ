import {
  useCallback,
} from "react";

import {
  useCompanyContext,
} from "@/features/company/context/useCompanyContext";

import type {
  ExpenseTemplateStatus,
  ExpenseTemplateUnit,
} from "@/features/templates/data/expenseTemplates";

import {
  ExpenseTemplateService,
} from "@/features/templates/services/ExpenseTemplateService";

import {
  useTemplateCrud,
} from "@/features/templates/hooks/useTemplateCrud";

export type SaveExpenseTemplateValues = {
  name: string;
  category: string;
  unit: ExpenseTemplateUnit;
  estimatedUnitCost?: number;
  status: ExpenseTemplateStatus;
  description?: string;
};

export function useExpenseTemplates() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const expenseTemplates =
    companyData.expenseTemplates;

  const search = useCallback(
    (
      templates: typeof expenseTemplates,
      searchValue: string
    ) =>
      ExpenseTemplateService.search(
        templates,
        searchValue
      ),
    []
  );

  const create = useCallback(
    (values: SaveExpenseTemplateValues) =>
      ExpenseTemplateService.create(values),
    []
  );

  const update = useCallback(
    (
      templates: typeof expenseTemplates,
      templateId: string,
      values: SaveExpenseTemplateValues
    ) =>
      ExpenseTemplateService.update(
        templates,
        templateId,
        values
      ),
    []
  );

  const toggleStatus = useCallback(
    (
      templates: typeof expenseTemplates,
      templateId: string
    ) =>
      ExpenseTemplateService.toggleStatus(
        templates,
        templateId
      ),
    []
  );

  const remove = useCallback(
    (
      templates: typeof expenseTemplates,
      templateId: string
    ) =>
      ExpenseTemplateService.delete(
        templates,
        templateId
      ),
    []
  );

  const getUsageCount = useCallback(
    (templateId: string) =>
      ExpenseTemplateService.getUsageCount(
        templateId,
        companyData
          .projectTemplateActivityExpenses
      ),
    [
      companyData
        .projectTemplateActivityExpenses,
    ]
  );

  const canDelete = useCallback(
    (templateId: string) =>
      ExpenseTemplateService.canDelete(
        templateId,
        companyData
          .projectTemplateActivityExpenses
      ),
    [
      companyData
        .projectTemplateActivityExpenses,
    ]
  );

  const setTemplates = useCallback(
    (
      updater: (
        currentTemplates:
          typeof expenseTemplates
      ) => typeof expenseTemplates
    ) => {
      setCompanyData(currentData => ({
        ...currentData,
        expenseTemplates: updater(
          currentData.expenseTemplates
        ),
      }));
    },
    [setCompanyData]
  );

  const normalizeValues = useCallback(
    (
      values: SaveExpenseTemplateValues
    ): SaveExpenseTemplateValues | null => {
      const name = values.name.trim();
      const category =
        values.category.trim();

      if (!name || !category) {
        return null;
      }

      return {
        ...values,
        name,
        category,
        description:
          values.description?.trim() ||
          undefined,
      };
    },
    []
  );

  const validateValues = useCallback(
    (
      values: SaveExpenseTemplateValues,
      editingTemplate:
        (typeof expenseTemplates)[number] | null
    ) =>
      ExpenseTemplateService
        .isNameAvailable(
          expenseTemplates,
          values.name,
          editingTemplate?.id
        ),
    [expenseTemplates]
  );

  const crud = useTemplateCrud({
    templates: expenseTemplates,
    search,
    create,
    update,
    toggleStatus,
    remove,
    getUsageCount,
    canDelete,
    setTemplates,
    normalizeValues,
    validateValues,
  });

  function isExpenseTemplateNameAvailable(
    name: string,
    ignoredExpenseTemplateId?: string
  ) {
    return ExpenseTemplateService
      .isNameAvailable(
        expenseTemplates,
        name,
        ignoredExpenseTemplateId
      );
  }

  return {
    expenseTemplates:
      crud.templates,

    filteredExpenseTemplates:
      crud.filteredTemplates,

    searchValue:
      crud.searchValue,

    setSearchValue:
      crud.setSearchValue,

    isExpenseTemplateDialogOpen:
      crud.isTemplateDialogOpen,

    editingExpenseTemplate:
      crud.editingTemplate,

    openAddExpenseTemplateDialog:
      crud.openAddTemplateDialog,

    openEditExpenseTemplateDialog:
      crud.openEditTemplateDialog,

    closeExpenseTemplateDialog:
      crud.closeTemplateDialog,

    isExpenseTemplateNameAvailable,

    saveExpenseTemplate:
      crud.saveTemplate,

    toggleExpenseTemplateStatus:
      crud.toggleTemplateStatus,

    getExpenseTemplateUsageCount:
      crud.getTemplateUsageCount,

    deleteExpenseTemplate:
      crud.deleteTemplate,
  };
}
