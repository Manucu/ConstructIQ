import type { ActivityTemplate } from "@/features/templates/data/activityTemplates";
import { BaseTemplateService, type CreateTemplateOptions } from "@/features/templates/services/BaseTemplateService";

export type CreateActivityTemplateValues = Omit<ActivityTemplate, "id">;
export type ActivityTemplateUsageReference = { activityTemplateId: string };

export class ActivityTemplateService {
  static normalizeValues(values: CreateActivityTemplateValues): CreateActivityTemplateValues {
    return { ...values, name: BaseTemplateService.normalizeText(values.name), description: values.description?.trim() || undefined };
  }

  static search(templates: ActivityTemplate[], searchValue: string) {
    const search = BaseTemplateService.normalizeSearchValue(searchValue);
    if (!search) return templates;
    return templates.filter(template =>
      BaseTemplateService.includesSearchValue(template.name, search) ||
      BaseTemplateService.includesSearchValue(template.category, search) ||
      BaseTemplateService.includesSearchValue(template.description, search) ||
      BaseTemplateService.includesSearchValue(template.status, search)
    );
  }

  static isNameAvailable(templates: ActivityTemplate[], name: string, ignoredId?: string) {
    const normalized = BaseTemplateService.normalizeSearchValue(name);
    if (!normalized) return false;
    return !templates.some(template => template.id !== ignoredId && BaseTemplateService.normalizeSearchValue(template.name) === normalized);
  }

  static create(values: CreateActivityTemplateValues, options?: CreateTemplateOptions) {
    return BaseTemplateService.create<ActivityTemplate>(this.normalizeValues(values), options);
  }
  static update(templates: ActivityTemplate[], id: string, values: CreateActivityTemplateValues) {
    return BaseTemplateService.update(templates, id, this.normalizeValues(values));
  }
  static toggleStatus(templates: ActivityTemplate[], id: string) { return BaseTemplateService.toggleStatus(templates, id); }
  static delete(templates: ActivityTemplate[], id: string) { return BaseTemplateService.delete(templates, id); }
  static getUsageCount(id: string, refs: ActivityTemplateUsageReference[]) {
    return BaseTemplateService.getUsageCount(id, refs, ref => ref.activityTemplateId);
  }
  static canDelete(id: string, refs: ActivityTemplateUsageReference[]) {
    return BaseTemplateService.canDelete(id, refs, ref => ref.activityTemplateId);
  }
}
