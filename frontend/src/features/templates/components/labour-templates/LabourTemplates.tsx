import { Users } from "lucide-react";

import LabourTemplateFormDialog from "@/features/templates/components/labour-templates/LabourTemplateFormDialog";
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
  LabourTemplate,
} from "@/features/templates/data/labourTemplates";

import {
  useLabourTemplates,
} from "@/features/templates/hooks/useLabourTemplates";

export default function LabourTemplates() {
  const {
    labourTemplates,
    filteredLabourTemplates,

    searchValue,
    setSearchValue,

    isLabourTemplateDialogOpen,
    editingLabourTemplate,

    openAddLabourTemplateDialog,
    openEditLabourTemplateDialog,
    closeLabourTemplateDialog,

    isLabourTemplateRoleAvailable,
    saveLabourTemplate,
    toggleLabourTemplateStatus,
    getLabourTemplateUsageCount,
    deleteLabourTemplate,
  } = useLabourTemplates();

  function handleDelete(
    labourTemplate: LabourTemplate
  ) {
    const usageCount =
      getLabourTemplateUsageCount(
        labourTemplate.id
      );

    if (usageCount > 0) {
      window.alert(
        `This labour template cannot be deleted because it is used by ${usageCount} project template ${
          usageCount === 1
            ? "activity"
            : "activities"
        }.`
      );

      return;
    }

    const confirmed =
      window.confirm(
        `Delete the "${labourTemplate.role}" labour template? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    deleteLabourTemplate(
      labourTemplate.id
    );
  }

  const activeCount =
    labourTemplates.filter(
      labourTemplate =>
        labourTemplate.status === "ACTIVE"
    ).length;

  return (
    <>
      <section className="space-y-6">
        <TemplateSectionHeader
          icon={Users}
          iconClassName="bg-blue-50 text-blue-700"
          title="Labour Templates"
          description="Manage reusable labour roles and estimated hourly rates."
          addLabel="Add Labour Template"
          onAdd={openAddLabourTemplateDialog}
        />

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <TemplateSearchBar
            value={searchValue}
            placeholder="Search labour templates..."
            onChange={setSearchValue}
          />

          {filteredLabourTemplates.length ===
          0 ? (
            <TemplateEmptyState
              icon={Users}
              isCollectionEmpty={
                labourTemplates.length === 0
              }
              emptyTitle="No labour templates yet"
              noResultsTitle="No matching labour templates"
              emptyDescription="Create reusable labour roles that can later be assigned to project template activities."
              noResultsDescription="Try changing the search term to find the labour template you need."
              addLabel="Add Labour Template"
              onAdd={
                openAddLabourTemplateDialog
              }
            />
          ) : (
            <TemplateTableShell
              headers={[
                "Role",
                "Estimated Rate",
                "Status",
                "Usage",
                "Description",
                "Actions",
              ]}
            >
              {filteredLabourTemplates.map(
                labourTemplate => {
                  const usageCount =
                    getLabourTemplateUsageCount(
                      labourTemplate.id
                    );

                  return (
                    <tr
                      key={labourTemplate.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                            <Users className="h-4 w-4" />
                          </div>

                          <span className="font-medium text-slate-900">
                            {labourTemplate.role}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                        {formatCurrency(
                          labourTemplate
                            .estimatedHourlyRate
                        )}

                        {labourTemplate
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
                            labourTemplate.status
                          }
                          onToggle={() =>
                            toggleLabourTemplateStatus(
                              labourTemplate.id
                            )
                          }
                        />
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                        {formatUsage(usageCount)}
                      </td>

                      <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                        <p className="truncate">
                          {labourTemplate.description ??
                            "—"}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <TemplateActions
                          entityLabel="labour template"
                          usageCount={usageCount}
                          onEdit={() =>
                            openEditLabourTemplateDialog(
                              labourTemplate
                            )
                          }
                          onDelete={() =>
                            handleDelete(
                              labourTemplate
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
              filteredLabourTemplates.length
            }
            totalCount={
              labourTemplates.length
            }
            activeCount={activeCount}
            entityLabel="labour templates"
          />
        </div>
      </section>

      {isLabourTemplateDialogOpen && (
        <LabourTemplateFormDialog
          key={
            editingLabourTemplate?.id ??
            "new-labour-template"
          }
          open={
            isLabourTemplateDialogOpen
          }
          editingLabourTemplate={
            editingLabourTemplate
          }
          onClose={
            closeLabourTemplateDialog
          }
          onSave={saveLabourTemplate}
          isRoleAvailable={
            isLabourTemplateRoleAvailable
          }
        />
      )}
    </>
  );
}
