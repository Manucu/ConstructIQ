import type {
  EquipmentTemplate,
  EquipmentTemplateStatus,
} from "@/features/templates/data/equipmentTemplates";

import {
  BaseTemplateService,
  type CreateTemplateOptions,
} from "@/features/templates/services/BaseTemplateService";

export type EquipmentTemplateUsageReference = {
  equipmentTemplateId: string;
};

export type CreateEquipmentTemplateValues =
  Omit<EquipmentTemplate, "id">;

export type UpdateEquipmentTemplateValues =
  CreateEquipmentTemplateValues;

export class EquipmentTemplateService {
  static normalizeValues(
    values: CreateEquipmentTemplateValues
  ): CreateEquipmentTemplateValues {
    return {
      ...values,

      name: values.name.trim(),

      category: values.category.trim(),

      description:
        values.description?.trim() || undefined,
    };
  }

  static search(
    equipmentTemplates: EquipmentTemplate[],
    searchValue: string
  ) {
    const normalizedSearch =
      BaseTemplateService.normalizeSearchValue(
        searchValue
      );

    if (!normalizedSearch) {
      return equipmentTemplates;
    }

    return equipmentTemplates.filter(
      equipmentTemplate =>
        BaseTemplateService.includesSearchValue(
          equipmentTemplate.name,
          normalizedSearch
        ) ||
        BaseTemplateService.includesSearchValue(
          equipmentTemplate.category,
          normalizedSearch
        ) ||
        BaseTemplateService.includesSearchValue(
          equipmentTemplate.status,
          normalizedSearch
        ) ||
        BaseTemplateService.includesSearchValue(
          equipmentTemplate.estimatedHourlyRate,
          normalizedSearch
        ) ||
        BaseTemplateService.includesSearchValue(
          equipmentTemplate.description,
          normalizedSearch
        )
    );
  }

  static isNameAvailable(
    equipmentTemplates: EquipmentTemplate[],
    name: string,
    ignoredEquipmentTemplateId?: string
  ) {
    const normalizedName =
      name.trim().toLocaleLowerCase();

    if (!normalizedName) {
      return false;
    }

    return !equipmentTemplates.some(
      equipmentTemplate =>
        equipmentTemplate.id !==
          ignoredEquipmentTemplateId &&
        equipmentTemplate.name
          .trim()
          .toLocaleLowerCase() ===
          normalizedName
    );
  }

  static create(
    values: CreateEquipmentTemplateValues,
    options?: CreateTemplateOptions
  ): EquipmentTemplate {
    const normalizedValues =
      this.normalizeValues(values);

    return BaseTemplateService.create<
      EquipmentTemplate
    >(normalizedValues, options);
  }

  static update(
    equipmentTemplates: EquipmentTemplate[],
    equipmentTemplateId: string,
    values: UpdateEquipmentTemplateValues
  ) {
    const normalizedValues =
      this.normalizeValues(values);

    return BaseTemplateService.update<
      EquipmentTemplate
    >(
      equipmentTemplates,
      equipmentTemplateId,
      normalizedValues
    );
  }

  static toggleStatus(
    equipmentTemplates: EquipmentTemplate[],
    equipmentTemplateId: string
  ) {
    return BaseTemplateService.toggleStatus(
      equipmentTemplates,
      equipmentTemplateId
    );
  }

  static getOppositeStatus(
    status: EquipmentTemplateStatus
  ): EquipmentTemplateStatus {
    return BaseTemplateService.getOppositeStatus(
      status
    ) as EquipmentTemplateStatus;
  }

  static getUsageCount(
    equipmentTemplateId: string,
    references:
      EquipmentTemplateUsageReference[]
  ) {
    return BaseTemplateService.getUsageCount(
      equipmentTemplateId,
      references,
      reference =>
        reference.equipmentTemplateId
    );
  }

  static canDelete(
    equipmentTemplateId: string,
    references:
      EquipmentTemplateUsageReference[]
  ) {
    return BaseTemplateService.canDelete(
      equipmentTemplateId,
      references,
      reference =>
        reference.equipmentTemplateId
    );
  }

  static delete(
    equipmentTemplates: EquipmentTemplate[],
    equipmentTemplateId: string
  ) {
    return BaseTemplateService.delete(
      equipmentTemplates,
      equipmentTemplateId
    );
  }
}