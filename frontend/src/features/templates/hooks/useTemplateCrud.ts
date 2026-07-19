import {
  useMemo,
  useState,
} from "react";

export type TemplateEntity = {
  id: string;
  status: string;
};

type UseTemplateCrudOptions<
  TTemplate extends TemplateEntity,
  TSaveValues,
> = {
  templates: TTemplate[];

  search: (
    templates: TTemplate[],
    searchValue: string
  ) => TTemplate[];

  create: (
    values: TSaveValues
  ) => TTemplate;

  update: (
    templates: TTemplate[],
    templateId: string,
    values: TSaveValues
  ) => TTemplate[];

  toggleStatus: (
    templates: TTemplate[],
    templateId: string
  ) => TTemplate[];

  remove: (
    templates: TTemplate[],
    templateId: string
  ) => TTemplate[];

  getUsageCount: (
    templateId: string
  ) => number;

  canDelete: (
    templateId: string
  ) => boolean;

  setTemplates: (
    updater: (
      currentTemplates: TTemplate[]
    ) => TTemplate[]
  ) => void;

  normalizeValues?: (
    values: TSaveValues
  ) => TSaveValues | null;

  validateValues?: (
    values: TSaveValues,
    editingTemplate: TTemplate | null
  ) => boolean;
};

export function useTemplateCrud<
  TTemplate extends TemplateEntity,
  TSaveValues,
>({
  templates,
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
}: UseTemplateCrudOptions<
  TTemplate,
  TSaveValues
>) {
  const [searchValue, setSearchValue] =
    useState("");

  const [
    isTemplateDialogOpen,
    setIsTemplateDialogOpen,
  ] = useState(false);

  const [
    editingTemplate,
    setEditingTemplate,
  ] = useState<TTemplate | null>(null);

  const filteredTemplates =
    useMemo(
      () =>
        search(
          templates,
          searchValue
        ),
      [
        templates,
        searchValue,
        search,
      ]
    );

  function openAddTemplateDialog() {
    setEditingTemplate(null);
    setIsTemplateDialogOpen(true);
  }

  function openEditTemplateDialog(
    template: TTemplate
  ) {
    setEditingTemplate(template);
    setIsTemplateDialogOpen(true);
  }

  function closeTemplateDialog() {
    setEditingTemplate(null);
    setIsTemplateDialogOpen(false);
  }

  function saveTemplate(
    values: TSaveValues
  ) {
    const normalizedValues =
      normalizeValues
        ? normalizeValues(values)
        : values;

    if (!normalizedValues) {
      return false;
    }

    const isValid =
      validateValues
        ? validateValues(
            normalizedValues,
            editingTemplate
          )
        : true;

    if (!isValid) {
      return false;
    }

    if (editingTemplate) {
      setTemplates(currentTemplates =>
        update(
          currentTemplates,
          editingTemplate.id,
          normalizedValues
        )
      );

      closeTemplateDialog();

      return true;
    }

    const newTemplate =
      create(normalizedValues);

    setTemplates(currentTemplates => [
      ...currentTemplates,
      newTemplate,
    ]);

    closeTemplateDialog();

    return true;
  }

  function toggleTemplateStatus(
    templateId: string
  ) {
    setTemplates(currentTemplates =>
      toggleStatus(
        currentTemplates,
        templateId
      )
    );
  }

  function deleteTemplate(
    templateId: string
  ) {
    if (!canDelete(templateId)) {
      return false;
    }

    setTemplates(currentTemplates =>
      remove(
        currentTemplates,
        templateId
      )
    );

    if (
      editingTemplate?.id ===
      templateId
    ) {
      closeTemplateDialog();
    }

    return true;
  }

  return {
    templates,
    filteredTemplates,

    searchValue,
    setSearchValue,

    isTemplateDialogOpen,
    editingTemplate,

    openAddTemplateDialog,
    openEditTemplateDialog,
    closeTemplateDialog,

    saveTemplate,
    toggleTemplateStatus,
    getTemplateUsageCount:
      getUsageCount,
    deleteTemplate,
  };
}
