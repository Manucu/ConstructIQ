import {
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";

import LabourTemplateFormDialog from "@/features/templates/components/labour-templates/LabourTemplateFormDialog";

import type {
  LabourTemplate,
} from "@/features/templates/data/labourTemplates";

import {
  useLabourTemplates,
} from "@/features/templates/hooks/useLabourTemplates";

function formatHourlyRate(
  hourlyRate?: number
) {
  if (hourlyRate === undefined) {
    return "Not set";
  }

  return new Intl.NumberFormat(
    "en-GB",
    {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(hourlyRate);
}

function getStatusLabel(
  status: LabourTemplate["status"]
) {
  return status === "ACTIVE"
    ? "Active"
    : "Inactive";
}

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

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Users className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Labour Templates
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage reusable labour roles
                  and estimated hourly rates.
                </p>
              </div>
            </div>
          </div>

          <AppButton
            onClick={
              openAddLabourTemplateDialog
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Labour Template
          </AppButton>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
         <div className="border-b border-slate-200 p-4">
            <div className="max-w-md">
                <AppInput
                label="Search"
                icon={Search}
                value={searchValue}
                placeholder="Search labour templates..."
                onChange={event =>
                    setSearchValue(event.target.value)
                }
                />
            </div>
         </div>

          {filteredLabourTemplates.length ===
          0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Users className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {labourTemplates.length === 0
                  ? "No labour templates yet"
                  : "No matching labour templates"}
              </h3>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                {labourTemplates.length === 0
                  ? "Create reusable labour roles that can later be assigned to project template activities."
                  : "Try changing the search term to find the labour template you need."}
              </p>

              {labourTemplates.length === 0 && (
                <AppButton
                  className="mt-5"
                  onClick={
                    openAddLabourTemplateDialog
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Labour Template
                </AppButton>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Role
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Estimated Rate
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Usage
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Description
                    </th>

                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredLabourTemplates.map(
                    labourTemplate => {
                      const usageCount =
                        getLabourTemplateUsageCount(
                          labourTemplate.id
                        );

                      const isActive =
                        labourTemplate.status ===
                        "ACTIVE";

                      return (
                        <tr
                          key={
                            labourTemplate.id
                          }
                          className="transition hover:bg-slate-50"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                                <Users className="h-4 w-4" />
                              </div>

                              <span className="font-medium text-slate-900">
                                {
                                  labourTemplate.role
                                }
                              </span>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                            {formatHourlyRate(
                              labourTemplate
                                .estimatedHourlyRate
                            )}
                            <span className="ml-1 text-slate-400">
                              / hour
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <button
                              type="button"
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                                isActive
                                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                              onClick={() =>
                                toggleLabourTemplateStatus(
                                  labourTemplate.id
                                )
                              }
                            >
                              {getStatusLabel(
                                labourTemplate.status
                              )}
                            </button>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                            {usageCount}{" "}
                            {usageCount === 1
                              ? "activity"
                              : "activities"}
                          </td>

                          <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                            <p className="truncate">
                              {labourTemplate.description ??
                                "—"}
                            </p>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                title="Edit labour template"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                onClick={() =>
                                  openEditLabourTemplateDialog(
                                    labourTemplate
                                  )
                                }
                              >
                                <Pencil className="h-4 w-4" />
                              </button>

                              <button
                                type="button"
                                title={
                                  usageCount > 0
                                    ? "Template is currently in use"
                                    : "Delete labour template"
                                }
                                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                                  usageCount > 0
                                    ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300"
                                    : "border-slate-200 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                                }`}
                                disabled={
                                  usageCount > 0
                                }
                                onClick={() =>
                                  handleDelete(
                                    labourTemplate
                                  )
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}

          {filteredLabourTemplates.length >
            0 && (
            <div className="flex flex-col gap-2 border-t border-slate-200 px-6 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing{" "}
                {
                  filteredLabourTemplates.length
                }{" "}
                of {labourTemplates.length} labour
                templates
              </span>

              <span>
                {
                  labourTemplates.filter(
                    labourTemplate =>
                      labourTemplate.status ===
                      "ACTIVE"
                  ).length
                }{" "}
                active
              </span>
            </div>
          )}
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