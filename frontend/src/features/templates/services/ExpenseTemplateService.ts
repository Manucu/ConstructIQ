import type {
  ExpenseTemplate,
  ExpenseTemplateStatus,
} from "@/features/templates/data/expenseTemplates";

import {
  BaseTemplateService,
  type CreateTemplateOptions,
} from "@/features/templates/services/BaseTemplateService";

export type ExpenseTemplateUsageReference = {
  expenseTemplateId: string;
};

export type CreateExpenseTemplateValues = Omit<ExpenseTemplate, "id">;
export type UpdateExpenseTemplateValues = CreateExpenseTemplateValues;

export class ExpenseTemplateService {
  static normalizeValues(values: CreateExpenseTemplateValues): CreateExpenseTemplateValues {
    return {
      ...values,
      name: values.name.trim(),
      category: values.category.trim(),
      description: values.description?.trim() || undefined,
    };
  }

  static search(expenseTemplates: ExpenseTemplate[], searchValue: string) {
    const normalizedSearch = BaseTemplateService.normalizeSearchValue(searchValue);
    if (!normalizedSearch) return expenseTemplates;

    return expenseTemplates.filter(expenseTemplate =>
      BaseTemplateService.includesSearchValue(expenseTemplate.name, normalizedSearch) ||
      BaseTemplateService.includesSearchValue(expenseTemplate.category, normalizedSearch) ||
      BaseTemplateService.includesSearchValue(expenseTemplate.unit, normalizedSearch) ||
      BaseTemplateService.includesSearchValue(expenseTemplate.status, normalizedSearch) ||
      BaseTemplateService.includesSearchValue(expenseTemplate.estimatedUnitCost, normalizedSearch) ||
      BaseTemplateService.includesSearchValue(expenseTemplate.description, normalizedSearch)
    );
  }

  static isNameAvailable(expenseTemplates: ExpenseTemplate[], name: string, ignoredExpenseTemplateId?: string) {
    const normalizedName = name.trim().toLocaleLowerCase();
    if (!normalizedName) return false;

    return !expenseTemplates.some(expenseTemplate =>
      expenseTemplate.id !== ignoredExpenseTemplateId &&
      expenseTemplate.name.trim().toLocaleLowerCase() === normalizedName
    );
  }

  static create(values: CreateExpenseTemplateValues, options?: CreateTemplateOptions): ExpenseTemplate {
    return BaseTemplateService.create<ExpenseTemplate>(this.normalizeValues(values), options);
  }

  static update(expenseTemplates: ExpenseTemplate[], expenseTemplateId: string, values: UpdateExpenseTemplateValues) {
    return BaseTemplateService.update<ExpenseTemplate>(
      expenseTemplates,
      expenseTemplateId,
      this.normalizeValues(values)
    );
  }

  static toggleStatus(expenseTemplates: ExpenseTemplate[], expenseTemplateId: string) {
    return BaseTemplateService.toggleStatus(expenseTemplates, expenseTemplateId);
  }

  static getOppositeStatus(status: ExpenseTemplateStatus): ExpenseTemplateStatus {
    return BaseTemplateService.getOppositeStatus(status) as ExpenseTemplateStatus;
  }

  static getUsageCount(expenseTemplateId: string, references: ExpenseTemplateUsageReference[]) {
    return BaseTemplateService.getUsageCount(
      expenseTemplateId,
      references,
      reference => reference.expenseTemplateId
    );
  }

  static canDelete(expenseTemplateId: string, references: ExpenseTemplateUsageReference[]) {
    return BaseTemplateService.canDelete(
      expenseTemplateId,
      references,
      reference => reference.expenseTemplateId
    );
  }

  static delete(expenseTemplates: ExpenseTemplate[], expenseTemplateId: string) {
    return BaseTemplateService.delete(expenseTemplates, expenseTemplateId);
  }
}
