import { useMemo, useState } from "react";

import {
  CalendarDays,
  CircleDollarSign,
  Pencil,
  Plus,
  Power,
  PowerOff,
  Settings2,
  Trash2,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import SearchInput from "@/components/common/SearchInput";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

import { AppButton } from "@/components/ui/AppButton";
import { AppModal } from "@/components/ui/AppModal";
import { Badge } from "@/components/ui/badge";

import { useCompanyContext } from "../../context/useCompanyContext";

import type { ProjectTemplate } from "../../data/projectTemplates";

import { useCompanyProjectTemplates } from "../../hooks/useCompanyProjectTemplates";

import ProjectTemplateBuilder from "./ProjectTemplateBuilder";
import ProjectTemplateFormDialog from "./ProjectTemplateFormDialog";

function formatDuration(days?: number) {
  if (days === undefined) {
    return "Duration not estimated";
  }

  if (days === 1) {
    return "1 day";
  }

  return `${days} days`;
}

function formatBudget(value?: number) {
  if (value === undefined) {
    return "Budget not estimated";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CompanyProjectTemplates() {
  const { companyData } = useCompanyContext();

  const {
    projectTemplates,
    filteredProjectTemplates,

    searchValue,
    setSearchValue,

    isProjectTemplateDialogOpen,
    editingProjectTemplate,

    openAddProjectTemplateDialog,
    openEditProjectTemplateDialog,
    closeProjectTemplateDialog,

    saveProjectTemplate,
    toggleProjectTemplateStatus,
    deleteProjectTemplate,
  } = useCompanyProjectTemplates();

  /*
   * Păstrăm doar ID-ul template-ului selectat.
   *
   * Astfel, builder-ul citește întotdeauna cea mai
   * recentă versiune din CompanyContext.
   */
  const [
    selectedProjectTemplateId,
    setSelectedProjectTemplateId,
  ] = useState<string | null>(null);

  const selectedProjectTemplate = useMemo(
    () =>
      projectTemplates.find(
        projectTemplate =>
          projectTemplate.id ===
          selectedProjectTemplateId
      ) ?? null,
    [
      projectTemplates,
      selectedProjectTemplateId,
    ]
  );

  function openProjectTemplateBuilder(
    projectTemplate: ProjectTemplate
  ) {
    setSelectedProjectTemplateId(
      projectTemplate.id
    );
  }

  function closeProjectTemplateBuilder() {
    setSelectedProjectTemplateId(null);
  }

  function getStageCount(
    projectTemplateId: string
  ) {
    return companyData.projectTemplateStages.filter(
      stage =>
        stage.projectTemplateId ===
        projectTemplateId
    ).length;
  }

  function getActivityCount(
    projectTemplateId: string
  ) {
    const stageIds = new Set(
      companyData.projectTemplateStages
        .filter(
          stage =>
            stage.projectTemplateId ===
            projectTemplateId
        )
        .map(stage => stage.id)
    );

    return companyData.projectTemplateActivities.filter(
      activity =>
        stageIds.has(
          activity.projectTemplateStageId
        )
    ).length;
  }

  function handleDeleteProjectTemplate(
    projectTemplate: ProjectTemplate
  ) {
    const stageCount = getStageCount(
      projectTemplate.id
    );

    const activityCount = getActivityCount(
      projectTemplate.id
    );

    const confirmed = window.confirm(
      [
        `Delete the project template "${projectTemplate.name}"?`,
        "",
        `Stages associated with this template: ${stageCount}`,
        `Activities associated with this template: ${activityCount}`,
        "",
        "This action cannot be undone.",
      ].join("\n")
    );

    if (!confirmed) {
      return;
    }

    deleteProjectTemplate(
      projectTemplate.id
    );

    if (
      selectedProjectTemplateId ===
      projectTemplate.id
    ) {
      closeProjectTemplateBuilder();
    }
  }

  return (
    <>
      <SectionCard
        title="Project Templates"
        icon="🏢"
        actions={
          <AppButton
            type="button"
            onClick={
              openAddProjectTemplateDialog
            }
          >
            <Plus className="mr-2 h-4 w-4" />

            Add Project Template
          </AppButton>
        }
      >
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          label="Search project templates"
          placeholder="Search by name, category or description..."
        />

        {filteredProjectTemplates.length ===
        0 ? (
          <EmptyState
            icon="🏢"
            title="No project templates found"
            description={
              searchValue.trim()
                ? "No project templates match the current search."
                : "Create your first reusable project template."
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredProjectTemplates.map(
              projectTemplate => {
                const stageCount =
                  getStageCount(
                    projectTemplate.id
                  );

                const activityCount =
                  getActivityCount(
                    projectTemplate.id
                  );

                return (
                  <EntityRow
                    key={projectTemplate.id}
                    title={projectTemplate.name}
                    subtitle={
                      projectTemplate.category
                    }
                    description={
                      <div className="mt-2 space-y-3">
                        {projectTemplate.description && (
                          <p className="text-sm leading-6 text-muted-foreground">
                            {
                              projectTemplate.description
                            }
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            <CalendarDays className="mr-1.5 h-3.5 w-3.5" />

                            {formatDuration(
                              projectTemplate.estimatedDurationDays
                            )}
                          </Badge>

                          <Badge variant="secondary">
                            <CircleDollarSign className="mr-1.5 h-3.5 w-3.5" />

                            {formatBudget(
                              projectTemplate.estimatedBudget
                            )}
                          </Badge>

                          <Badge variant="outline">
                            {stageCount === 1
                              ? "1 stage"
                              : `${stageCount} stages`}
                          </Badge>

                          <Badge variant="outline">
                            {activityCount === 1
                              ? "1 activity"
                              : `${activityCount} activities`}
                          </Badge>
                        </div>
                      </div>
                    }
                    actions={
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge
                          status={
                            projectTemplate.status
                          }
                        />

                        <AppButton
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            openProjectTemplateBuilder(
                              projectTemplate
                            )
                          }
                        >
                          <Settings2 className="mr-2 h-4 w-4" />

                          Configure
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={`Edit ${projectTemplate.name}`}
                          title="Edit project template"
                          onClick={() =>
                            openEditProjectTemplateDialog(
                              projectTemplate
                            )
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={
                            projectTemplate.status ===
                            "ACTIVE"
                              ? `Deactivate ${projectTemplate.name}`
                              : `Activate ${projectTemplate.name}`
                          }
                          title={
                            projectTemplate.status ===
                            "ACTIVE"
                              ? "Deactivate project template"
                              : "Activate project template"
                          }
                          onClick={() =>
                            toggleProjectTemplateStatus(
                              projectTemplate.id
                            )
                          }
                        >
                          {projectTemplate.status ===
                          "ACTIVE" ? (
                            <PowerOff className="h-4 w-4" />
                          ) : (
                            <Power className="h-4 w-4" />
                          )}
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={`Delete ${projectTemplate.name}`}
                          title="Delete project template"
                          onClick={() =>
                            handleDeleteProjectTemplate(
                              projectTemplate
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </AppButton>
                      </div>
                    }
                  />
                );
              }
            )}
          </div>
        )}
      </SectionCard>

      {isProjectTemplateDialogOpen && (
        <ProjectTemplateFormDialog
          key={
            editingProjectTemplate?.id ??
            "new-project-template"
          }
          open={
            isProjectTemplateDialogOpen
          }
          editingProjectTemplate={
            editingProjectTemplate
          }
          onClose={
            closeProjectTemplateDialog
          }
          onSave={saveProjectTemplate}
        />
      )}

      {selectedProjectTemplate && (
        <AppModal
          open
          title="Project Template Builder"
          description={`Configure the stages and activities for "${selectedProjectTemplate.name}".`}
          onClose={
            closeProjectTemplateBuilder
          }
          footer={
            <AppButton
              type="button"
              variant="outline"
              onClick={
                closeProjectTemplateBuilder
              }
            >
              Close Builder
            </AppButton>
          }
        >
          <div className="max-h-[78vh] overflow-y-auto pr-1">
            <ProjectTemplateBuilder
              projectTemplate={
                selectedProjectTemplate
              }
            />
          </div>
        </AppModal>
      )}
    </>
  );
}