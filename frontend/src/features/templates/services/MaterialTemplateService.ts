import type {
  MaterialTemplate,
  MaterialTemplateStatus,
} from "@/features/templates/data/materialTemplates";

import {
  BaseTemplateService,
  type CreateTemplateOptions,
} from "@/features/templates/services/BaseTemplateService";

export type MaterialTemplateUsageReference = {
  materialTemplateId: string;
};

export type CreateMaterialTemplateValues =
  Omit<MaterialTemplate, "id">;

export type UpdateMaterialTemplateValues =
  CreateMaterialTemplateValues;

export class MaterialTemplateService {
  static normalizeValues(
    values: CreateMaterialTemplateValues
  ): CreateMaterialTemplateValues {
    return {
      ...values,

      code:
        BaseTemplateService.normalizeCode(
          values.code
        ),

      name:
        BaseTemplateService.normalizeText(
          values.name
        ),
    };
  }

  static search(
    materialTemplates: MaterialTemplate[],
    searchValue: string
  ) {
    const normalizedSearch =
      BaseTemplateService
        .normalizeSearchValue(searchValue);

    if (!normalizedSearch) {
      return materialTemplates;
    }

    return materialTemplates.filter(
      materialTemplate =>
        BaseTemplateService
          .includesSearchValue(
            materialTemplate.code,
            normalizedSearch
          ) ||
        BaseTemplateService
          .includesSearchValue(
            materialTemplate.name,
            normalizedSearch
          ) ||
        BaseTemplateService
          .includesSearchValue(
            materialTemplate.category,
            normalizedSearch
          ) ||
        BaseTemplateService
          .includesSearchValue(
            materialTemplate.unit,
            normalizedSearch
          ) ||
        BaseTemplateService
          .includesSearchValue(
            materialTemplate.status,
            normalizedSearch
          )
    );
  }

  static isCodeAvailable(
    materialTemplates: MaterialTemplate[],
    code: string,
    ignoredMaterialTemplateId?: string
  ) {
    const normalizedCode =
      BaseTemplateService
        .normalizeCode(code);

    if (!normalizedCode) {
      return false;
    }

    return !materialTemplates.some(
      materialTemplate =>
        materialTemplate.id !==
          ignoredMaterialTemplateId &&
        BaseTemplateService
          .normalizeCode(
            materialTemplate.code
          ) === normalizedCode
    );
  }

  static create(
    values: CreateMaterialTemplateValues,
    options?: CreateTemplateOptions
  ): MaterialTemplate {
    const normalizedValues =
      this.normalizeValues(values);

    return BaseTemplateService.create<
      MaterialTemplate
    >(normalizedValues, options);
  }

  static update(
    materialTemplates: MaterialTemplate[],
    materialTemplateId: string,
    values: UpdateMaterialTemplateValues
  ) {
    const normalizedValues =
      this.normalizeValues(values);

    return BaseTemplateService.update<
      MaterialTemplate
    >(
      materialTemplates,
      materialTemplateId,
      normalizedValues
    );
  }

  static toggleStatus(
    materialTemplates: MaterialTemplate[],
    materialTemplateId: string
  ) {
    return BaseTemplateService.toggleStatus(
      materialTemplates,
      materialTemplateId
    );
  }

  static getOppositeStatus(
    status: MaterialTemplateStatus
  ): MaterialTemplateStatus {
    return BaseTemplateService
      .getOppositeStatus(
        status
      ) as MaterialTemplateStatus;
  }

  static getUsageCount(
    materialTemplateId: string,
    references:
      MaterialTemplateUsageReference[]
  ) {
    return BaseTemplateService.getUsageCount(
      materialTemplateId,
      references,
      reference =>
        reference.materialTemplateId
    );
  }

  static canDelete(
    materialTemplateId: string,
    references:
      MaterialTemplateUsageReference[]
  ) {
    return BaseTemplateService.canDelete(
      materialTemplateId,
      references,
      reference =>
        reference.materialTemplateId
    );
  }

  static delete(
    materialTemplates: MaterialTemplate[],
    materialTemplateId: string
  ) {
    return BaseTemplateService.delete(
      materialTemplates,
      materialTemplateId
    );
  }
}