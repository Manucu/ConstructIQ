import {
  ArrowDown,
  ArrowUp,
  ClipboardList,
  Pencil,
  Power,
  PowerOff,
  Trash2,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import SearchInput from "@/components/common/SearchInput";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import type { ProjectTemplateStage } from "../../data/projectTemplates";

import { useCompanyProjectTemplateActivities } from "../../hooks/useCompanyProjectTemplateActivities";

import ProjectTemplateActivityFormDialog from "./ProjectTemplateActivityFormDialog";

type ProjectTemplateActivitiesProps = {
  projectTemplateStage: ProjectTemplateStage;
};

function formatDuration(days?: number) {
  if (days === undefined) {
    return "Duration not estimated";
  }

  if (days === 1) {
    return "1 day";
  }

  return `${days} days`;
}

export default function ProjectTemplateActivities({
  projectTemplateStage,
}: ProjectTemplateActivitiesProps) {
  const {
    filteredProjectTemplateActivities,

    availableActivityTemplates,
    allActivityTemplates,

    searchValue,
    setSearchValue,

    isProjectTemplateActivityDialogOpen,
    editingProjectTemplateActivity,

    openAddProjectTemplateActivityDialog,
    openEditProjectTemplateActivityDialog,
    closeProjectTemplateActivityDialog,

    saveProjectTemplateActivity,
    toggleProjectTemplateActivityStatus,
    deleteProjectTemplateActivity,

    moveProjectTemplateActivityUp,
    moveProjectTemplateActivityDown,

    getActivityTemplateById,
  } = useCompanyProjectTemplateActivities({
    projectTemplateStageId:
      projectTemplateStage.id,
  });

  const activityTemplatesForDialog =
    editingProjectTemplateActivity
      ? allActivityTemplates
      : availableActivityTemplates;

  return (
    <>
      <SectionCard
        title={`${projectTemplateStage.name} Activities`}
        icon="📋"
        actions={
          <AppButton
            type="button"
            onClick={
              openAddProjectTemplateActivityDialog
            }
          >
            <ClipboardList className="mr-2 h-4 w-4" />

            Add Activity
          </AppButton>
        }
      >
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          label="Search activities"
          placeholder="Search activities..."
        />

        {filteredProjectTemplateActivities.length ===
        0 ? (
          <EmptyState
            icon="📋"
            title="No activities found"
            description={
              searchValue.trim()
                ? "No activities match the current search."
                : "Add the first activity to this stage."
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredProjectTemplateActivities.map(
              (activity, index) => {
                const activityTemplate =
                  getActivityTemplateById(
                    activity.activityTemplateId
                  );

                return (
                  <EntityRow
                    key={activity.id}
                    title={
                      activityTemplate?.name ??
                      "Unknown Activity Template"
                    }
                    subtitle={`Activity ${activity.order}`}
                    description={
                      <div className="mt-2 space-y-2">
                        {activity.description && (
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            {formatDuration(
                              activity.estimatedDurationDays
                            )}
                          </Badge>

                          {!activityTemplate && (
                            <Badge variant="destructive">
                              Missing template
                            </Badge>
                          )}
                        </div>
                      </div>
                    }
                    actions={
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge
                          status={activity.status}
                        />

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          disabled={index === 0}
                          aria-label="Move activity up"
                          title="Move activity up"
                          onClick={() =>
                            moveProjectTemplateActivityUp(
                              activity.id
                            )
                          }
                        >
                          <ArrowUp className="h-4 w-4" />
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          disabled={
                            index ===
                            filteredProjectTemplateActivities.length -
                              1
                          }
                          aria-label="Move activity down"
                          title="Move activity down"
                          onClick={() =>
                            moveProjectTemplateActivityDown(
                              activity.id
                            )
                          }
                        >
                          <ArrowDown className="h-4 w-4" />
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label="Edit activity"
                          title="Edit activity"
                          onClick={() =>
                            openEditProjectTemplateActivityDialog(
                              activity
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
                            activity.status ===
                            "ACTIVE"
                              ? "Deactivate activity"
                              : "Activate activity"
                          }
                          title={
                            activity.status ===
                            "ACTIVE"
                              ? "Deactivate activity"
                              : "Activate activity"
                          }
                          onClick={() =>
                            toggleProjectTemplateActivityStatus(
                              activity.id
                            )
                          }
                        >
                          {activity.status ===
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
                          aria-label="Delete activity"
                          title="Delete activity"
                          onClick={() => {
                            const confirmed =
                              window.confirm(
                                `Delete ${
                                  activityTemplate?.name ??
                                  "this activity"
                                }?`
                              );

                            if (!confirmed) {
                              return;
                            }

                            deleteProjectTemplateActivity(
                              activity.id
                            );
                          }}
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

      {isProjectTemplateActivityDialogOpen && (
        <ProjectTemplateActivityFormDialog
          key={
            editingProjectTemplateActivity?.id ??
            "new-project-template-activity"
          }
          open={
            isProjectTemplateActivityDialogOpen
          }
          editingProjectTemplateActivity={
            editingProjectTemplateActivity
          }
          activityTemplates={
            activityTemplatesForDialog
          }
          onClose={
            closeProjectTemplateActivityDialog
          }
          onSave={saveProjectTemplateActivity}
        />
      )}
    </>
  );
}