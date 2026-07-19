import type {
  LabourTemplate,
  LabourTemplateStatus,
} from "@/features/templates/data/labourTemplates";

import {
  BaseTemplateService,
  type CreateTemplateOptions,
} from "@/features/templates/services/BaseTemplateService";

export type LabourTemplateUsageReference = {
  labourTemplateId: string;
};

export type CreateLabourTemplateValues =
  Omit<LabourTemplate, "id">;

export type UpdateLabourTemplateValues =
  CreateLabourTemplateValues;

export class LabourTemplateService {
  static normalizeValues(
    values: CreateLabourTemplateValues
  ): CreateLabourTemplateValues {
    return {
      ...values,
      role: values.role.trim(),
      description:
        values.description?.trim() || undefined,
    };
  }

  static search(
    labourTemplates: LabourTemplate[],
    searchValue: string
  ) {
    const normalizedSearch =
      BaseTemplateService.normalizeSearchValue(
        searchValue
      );

    if (!normalizedSearch) {
      return labourTemplates;
    }

    return labourTemplates.filter(
      labourTemplate =>
        BaseTemplateService.includesSearchValue(
          labourTemplate.role,
          normalizedSearch
        ) ||
        BaseTemplateService.includesSearchValue(
          labourTemplate.status,
          normalizedSearch
        ) ||
        BaseTemplateService.includesSearchValue(
          labourTemplate.estimatedHourlyRate,
          normalizedSearch
        ) ||
        BaseTemplateService.includesSearchValue(
          labourTemplate.description,
          normalizedSearch
        )
    );
  }

  static isRoleAvailable(
    labourTemplates: LabourTemplate[],
    role: string,
    ignoredLabourTemplateId?: string
  ) {
    const normalizedRole =
      role.trim().toLocaleLowerCase();

    if (!normalizedRole) {
      return false;
    }

    return !labourTemplates.some(
      labourTemplate =>
        labourTemplate.id !==
          ignoredLabourTemplateId &&
        labourTemplate.role
          .trim()
          .toLocaleLowerCase() ===
          normalizedRole
    );
  }

  static create(
    values: CreateLabourTemplateValues,
    options?: CreateTemplateOptions
  ): LabourTemplate {
    const normalizedValues =
      this.normalizeValues(values);

    return BaseTemplateService.create<
      LabourTemplate
    >(normalizedValues, options);
  }

  static update(
    labourTemplates: LabourTemplate[],
    labourTemplateId: string,
    values: UpdateLabourTemplateValues
  ) {
    const normalizedValues =
      this.normalizeValues(values);

    return BaseTemplateService.update<
      LabourTemplate
    >(
      labourTemplates,
      labourTemplateId,
      normalizedValues
    );
  }

  static toggleStatus(
    labourTemplates: LabourTemplate[],
    labourTemplateId: string
  ) {
    return BaseTemplateService.toggleStatus(
      labourTemplates,
      labourTemplateId
    );
  }

  static getOppositeStatus(
    status: LabourTemplateStatus
  ): LabourTemplateStatus {
    return BaseTemplateService.getOppositeStatus(
      status
    ) as LabourTemplateStatus;
  }

  static getUsageCount(
    labourTemplateId: string,
    references: LabourTemplateUsageReference[]
  ) {
    return BaseTemplateService.getUsageCount(
      labourTemplateId,
      references,
      reference =>
        reference.labourTemplateId
    );
  }

  static canDelete(
    labourTemplateId: string,
    references: LabourTemplateUsageReference[]
  ) {
    return BaseTemplateService.canDelete(
      labourTemplateId,
      references,
      reference =>
        reference.labourTemplateId
    );
  }

  static delete(
    labourTemplates: LabourTemplate[],
    labourTemplateId: string
  ) {
    return BaseTemplateService.delete(
      labourTemplates,
      labourTemplateId
    );
  }
}