import { Construction } from "lucide-react";

import EquipmentTemplateFormDialog from "@/features/templates/components/equipment-templates/EquipmentTemplateFormDialog";
import TemplateActions from "@/features/templates/components/shared/TemplateActions";
import TemplateEmptyState from "@/features/templates/components/shared/TemplateEmptyState";
import TemplateListFooter from "@/features/templates/components/shared/TemplateListFooter";
import TemplateSearchBar from "@/features/templates/components/shared/TemplateSearchBar";
import TemplateSectionHeader from "@/features/templates/components/shared/TemplateSectionHeader";
import TemplateStatusButton from "@/features/templates/components/shared/TemplateStatusButton";
import TemplateTableShell from "@/features/templates/components/shared/TemplateTableShell";
import {
  formatCurrency,
  formatUsage,
} from "@/features/templates/components/shared/templateFormatters";

import type {
  EquipmentTemplate,
} from "@/features/templates/data/equipmentTemplates";

import {
  useEquipmentTemplates,
} from "@/features/templates/hooks/useEquipmentTemplates";

export default function EquipmentTemplates() {
  const {
    equipmentTemplates,
    filteredEquipmentTemplates,

    searchValue,
    setSearchValue,

    isEquipmentTemplateDialogOpen,
    editingEquipmentTemplate,

    openAddEquipmentTemplateDialog,
    openEditEquipmentTemplateDialog,
    closeEquipmentTemplateDialog,

    isEquipmentTemplateNameAvailable,
    saveEquipmentTemplate,
    toggleEquipmentTemplateStatus,
    getEquipmentTemplateUsageCount,
    deleteEquipmentTemplate,
  } = useEquipmentTemplates();

  function handleDelete(
    equipmentTemplate: EquipmentTemplate
  ) {
    const usageCount =
      getEquipmentTemplateUsageCount(
        equipmentTemplate.id
      );

    if (usageCount > 0) {
      window.alert(
        `This equipment template cannot be deleted because it is used by ${usageCount} project template ${
          usageCount === 1
            ? "activity"
            : "activities"
        }.`
      );

      return;
    }

    const confirmed =
      window.confirm(
        `Delete the "${equipmentTemplate.name}" equipment template? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    deleteEquipmentTemplate(
      equipmentTemplate.id
    );
  }

  const activeCount =
    equipmentTemplates.filter(
      equipmentTemplate =>
        equipmentTemplate.status === "ACTIVE"
    ).length;

  return (
    <>
      <section className="space-y-6">
        <TemplateSectionHeader
          icon={Construction}
          iconClassName="bg-amber-50 text-amber-700"
          title="Equipment Templates"
          description="Manage reusable equipment and estimated hourly rates."
          addLabel="Add Equipment Template"
          onAdd={openAddEquipmentTemplateDialog}
        />

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <TemplateSearchBar
            value={searchValue}
            placeholder="Search equipment templates..."
            onChange={setSearchValue}
          />

          {filteredEquipmentTemplates.length ===
          0 ? (
            <TemplateEmptyState
              icon={Construction}
              isCollectionEmpty={
                equipmentTemplates.length === 0
              }
              emptyTitle="No equipment templates yet"
              noResultsTitle="No matching equipment templates"
              emptyDescription="Create reusable equipment definitions that can later be assigned to project template activities."
              noResultsDescription="Try changing the search term to find the equipment template you need."
              addLabel="Add Equipment Template"
              onAdd={
                openAddEquipmentTemplateDialog
              }
            />
          ) : (
            <TemplateTableShell
              headers={[
                "Equipment",
                "Category",
                "Estimated Rate",
                "Status",
                "Usage",
                "Description",
                "Actions",
              ]}
            >
              {filteredEquipmentTemplates.map(
                equipmentTemplate => {
                  const usageCount =
                    getEquipmentTemplateUsageCount(
                      equipmentTemplate.id
                    );

                  return (
                    <tr
                      key={equipmentTemplate.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                            <Construction className="h-4 w-4" />
                          </div>

                          <span className="font-medium text-slate-900">
                            {equipmentTemplate.name}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                        {equipmentTemplate.category}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                        {formatCurrency(
                          equipmentTemplate
                            .estimatedHourlyRate
                        )}

                        {equipmentTemplate
                          .estimatedHourlyRate !==
                          undefined && (
                          <span className="ml-1 text-slate-400">
                            / hour
                          </span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <TemplateStatusButton
                          status={
                            equipmentTemplate.status
                          }
                          onToggle={() =>
                            toggleEquipmentTemplateStatus(
                              equipmentTemplate.id
                            )
                          }
                        />
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                        {formatUsage(usageCount)}
                      </td>

                      <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                        <p className="truncate">
                          {equipmentTemplate.description ??
                            "—"}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <TemplateActions
                          entityLabel="equipment template"
                          usageCount={usageCount}
                          onEdit={() =>
                            openEditEquipmentTemplateDialog(
                              equipmentTemplate
                            )
                          }
                          onDelete={() =>
                            handleDelete(
                              equipmentTemplate
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </TemplateTableShell>
          )}

          <TemplateListFooter
            visibleCount={
              filteredEquipmentTemplates.length
            }
            totalCount={
              equipmentTemplates.length
            }
            activeCount={activeCount}
            entityLabel="equipment templates"
          />
        </div>
      </section>

      {isEquipmentTemplateDialogOpen && (
        <EquipmentTemplateFormDialog
          key={
            editingEquipmentTemplate?.id ??
            "new-equipment-template"
          }
          open={
            isEquipmentTemplateDialogOpen
          }
          editingEquipmentTemplate={
            editingEquipmentTemplate
          }
          onClose={
            closeEquipmentTemplateDialog
          }
          onSave={saveEquipmentTemplate}
          isNameAvailable={
            isEquipmentTemplateNameAvailable
          }
        />
      )}
    </>
  );
}
