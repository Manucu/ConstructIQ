import { useState } from "react";

import {
  ArrowDown,
  ArrowUp,
  ClipboardList,
  PackageSearch,
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
import { AppModal } from "@/components/ui/AppModal";
import { Badge } from "@/components/ui/badge";

import type {
  ProjectTemplateStage,
} from "@/features/templates/data/projectTemplates";

import type {
  ProjectTemplateActivity,
} from "@/features/templates/data/projectTemplateActivities";

import {
  useProjectTemplateActivities,
} from "../../hooks/useProjectTemplateActivities";

import ProjectTemplateActivityFormDialog from "./ProjectTemplateActivityFormDialog";
import ProjectTemplateActivityMaterials from "./ProjectTemplateActivityMaterials";

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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ProjectTemplateActivities({
  projectTemplateStage,
}: ProjectTemplateActivitiesProps) {
  const [
    selectedActivityForMaterials,
    setSelectedActivityForMaterials,
  ] = useState<ProjectTemplateActivity | null>(
    null
  );

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
    getActivitySummary,
  } = useProjectTemplateActivities({
    projectTemplateStageId:
      projectTemplateStage.id,
  });

  const activityTemplatesForDialog =
    editingProjectTemplateActivity
      ? allActivityTemplates
      : availableActivityTemplates;

  function openActivityMaterials(
    activity: ProjectTemplateActivity
  ) {
    setSelectedActivityForMaterials(activity);
  }

  function closeActivityMaterials() {
    setSelectedActivityForMaterials(null);
  }

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

                const activitySummary =
                  getActivitySummary(activity.id);

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

                          <Badge variant="outline">
                            {activitySummary.materialCount === 1
                              ? "1 suggested material"
                              : `${activitySummary.materialCount} suggested materials`}
                          </Badge>

                          <Badge variant="outline">
                            Material cost:{" "}
                            {formatCurrency(
                              activitySummary.estimatedMaterialCost
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
                          size="sm"
                          variant="outline"
                          aria-label="Manage activity materials"
                          title="Manage activity materials"
                          onClick={() =>
                            openActivityMaterials(
                              activity
                            )
                          }
                        >
                          <PackageSearch className="mr-2 h-4 w-4" />

                          Manage Materials
                          {activitySummary.materialCount >
                            0 &&
                            ` (${activitySummary.materialCount})`}
                        </AppButton>

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

                            if (
                              selectedActivityForMaterials
                                ?.id === activity.id
                            ) {
                              closeActivityMaterials();
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

      {selectedActivityForMaterials && (
        <AppModal
          open
          title="Activity Materials"
          description="Manage the suggested materials and estimated costs for this activity."
          onClose={closeActivityMaterials}
          footer={
            <AppButton
              type="button"
              variant="outline"
              onClick={closeActivityMaterials}
            >
              Close
            </AppButton>
          }
        >
          <div className="max-h-[70vh] overflow-y-auto pr-1">
            <ProjectTemplateActivityMaterials
              projectTemplateActivity={
                selectedActivityForMaterials
              }
            />
          </div>
        </AppModal>
      )}
    </>
  );
}