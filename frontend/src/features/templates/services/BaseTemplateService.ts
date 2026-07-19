export type TemplateStatus =
  | "ACTIVE"
  | "INACTIVE";

export type TemplateEntity = {
  id: string;
  status: TemplateStatus;
};

export type CreateTemplateOptions = {
  id?: string;
};

export class BaseTemplateService {
  static create<
    TValues extends TemplateEntity
  >(
    values: Omit<TValues, "id">,
    options?: CreateTemplateOptions
  ): TValues {
    return {
      ...values,
      id:
        options?.id ??
        crypto.randomUUID(),
    } as TValues;
  }

  static update<
    TEntity extends TemplateEntity
  >(
    entities: TEntity[],
    entityId: string,
    values: Omit<TEntity, "id">
  ): TEntity[] {
    return entities.map(entity =>
      entity.id === entityId
        ? {
            ...entity,
            ...values,
          }
        : entity
    );
  }

  static toggleStatus<
    TEntity extends TemplateEntity
  >(
    entities: TEntity[],
    entityId: string
  ): TEntity[] {
    return entities.map(entity =>
      entity.id === entityId
        ? {
            ...entity,
            status:
              this.getOppositeStatus(
                entity.status
              ),
          }
        : entity
    );
  }

  static getOppositeStatus(
    status: TemplateStatus
  ): TemplateStatus {
    return status === "ACTIVE"
      ? "INACTIVE"
      : "ACTIVE";
  }

  static delete<
    TEntity extends TemplateEntity
  >(
    entities: TEntity[],
    entityId: string
  ): TEntity[] {
    return entities.filter(
      entity => entity.id !== entityId
    );
  }

  static getUsageCount<TReference>(
    entityId: string,
    references: TReference[],
    getReferencedEntityId: (
      reference: TReference
    ) => string
  ): number {
    return references.filter(
      reference =>
        getReferencedEntityId(reference) ===
        entityId
    ).length;
  }

  static canDelete<TReference>(
    entityId: string,
    references: TReference[],
    getReferencedEntityId: (
      reference: TReference
    ) => string
  ): boolean {
    return (
      this.getUsageCount(
        entityId,
        references,
        getReferencedEntityId
      ) === 0
    );
  }

  static normalizeText(value: string) {
    return value.trim();
  }

  static normalizeCode(value: string) {
    return value.trim().toUpperCase();
  }

  static normalizeSearchValue(
    value: string
  ) {
    return value.trim().toLowerCase();
  }

  static includesSearchValue(
    value:
      | string
      | number
      | undefined,
    normalizedSearchValue: string
  ) {
    if (value === undefined) {
      return false;
    }

    return String(value)
      .toLowerCase()
      .includes(normalizedSearchValue);
  }
}