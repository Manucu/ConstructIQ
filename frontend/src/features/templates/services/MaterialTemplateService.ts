import type {
  MaterialTemplate,
  MaterialTemplateStatus,
} from "@/features/templates/data/materialTemplates";

export type MaterialTemplateUsageReference = {
  materialTemplateId: string;
};

export type CreateMaterialTemplateValues = Omit<
  MaterialTemplate,
  "id"
>;

export type UpdateMaterialTemplateValues =
  CreateMaterialTemplateValues;

type CreateMaterialTemplateOptions = {
  id?: string;
};

export class MaterialTemplateService {
  static normalizeCode(code: string) {
    return code.trim().toUpperCase();
  }

  static normalizeName(name: string) {
    return name.trim();
  }

  static normalizeValues(
    values: CreateMaterialTemplateValues
  ): CreateMaterialTemplateValues {
    return {
      ...values,
      code: this.normalizeCode(values.code),
      name: this.normalizeName(values.name),
    };
  }

  static search(
    materialTemplates: MaterialTemplate[],
    searchValue: string
  ) {
    const normalizedSearch =
      searchValue.trim().toLowerCase();

    if (!normalizedSearch) {
      return materialTemplates;
    }

    return materialTemplates.filter(
      materialTemplate =>
        materialTemplate.code
          .toLowerCase()
          .includes(normalizedSearch) ||
        materialTemplate.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        materialTemplate.category
          .toLowerCase()
          .includes(normalizedSearch) ||
        materialTemplate.unit
          .toLowerCase()
          .includes(normalizedSearch) ||
        materialTemplate.status
          .toLowerCase()
          .includes(normalizedSearch)
    );
  }

  static isCodeAvailable(
    materialTemplates: MaterialTemplate[],
    code: string,
    ignoredMaterialTemplateId?: string
  ) {
    const normalizedCode =
      this.normalizeCode(code);

    if (!normalizedCode) {
      return false;
    }

    return !materialTemplates.some(
      materialTemplate =>
        materialTemplate.id !==
          ignoredMaterialTemplateId &&
        this.normalizeCode(
          materialTemplate.code
        ) === normalizedCode
    );
  }

  static create(
    values: CreateMaterialTemplateValues,
    options?: CreateMaterialTemplateOptions
  ): MaterialTemplate {
    const normalizedValues =
      this.normalizeValues(values);

    return {
      id: options?.id ?? crypto.randomUUID(),
      ...normalizedValues,
    };
  }

  static update(
    materialTemplates: MaterialTemplate[],
    materialTemplateId: string,
    values: UpdateMaterialTemplateValues
  ) {
    const normalizedValues =
      this.normalizeValues(values);

    return materialTemplates.map(
      materialTemplate =>
        materialTemplate.id ===
        materialTemplateId
          ? {
              ...materialTemplate,
              ...normalizedValues,
            }
          : materialTemplate
    );
  }

  static toggleStatus(
    materialTemplates: MaterialTemplate[],
    materialTemplateId: string
  ) {
    return materialTemplates.map(
      materialTemplate =>
        materialTemplate.id ===
        materialTemplateId
          ? {
              ...materialTemplate,
              status: this.getOppositeStatus(
                materialTemplate.status
              ),
            }
          : materialTemplate
    );
  }

  static getOppositeStatus(
    status: MaterialTemplateStatus
  ): MaterialTemplateStatus {
    return status === "ACTIVE"
      ? "INACTIVE"
      : "ACTIVE";
  }

  static getUsageCount(
    materialTemplateId: string,
    references: MaterialTemplateUsageReference[]
  ) {
    return references.filter(
      reference =>
        reference.materialTemplateId ===
        materialTemplateId
    ).length;
  }

  static canDelete(
    materialTemplateId: string,
    references: MaterialTemplateUsageReference[]
  ) {
    return (
      this.getUsageCount(
        materialTemplateId,
        references
      ) === 0
    );
  }

  static delete(
    materialTemplates: MaterialTemplate[],
    materialTemplateId: string
  ) {
    return materialTemplates.filter(
      materialTemplate =>
        materialTemplate.id !==
        materialTemplateId
    );
  }
}