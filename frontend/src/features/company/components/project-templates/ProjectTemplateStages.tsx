import { useState } from "react";

import {
  ArrowDown,
  ArrowUp,
  Layers,
  ListChecks,
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
  ProjectTemplate,
  ProjectTemplateStage,
} from "../../data/projectTemplates";

import { useCompanyProjectTemplateStages } from "../../hooks/useCompanyProjectTemplateStages";

import ProjectTemplateActivities from "./ProjectTemplateActivities";
import ProjectTemplateStageFormDialog from "./ProjectTemplateStageFormDialog";

type ProjectTemplateStagesProps = {
  projectTemplate: ProjectTemplate;
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

export default function ProjectTemplateStages({
  projectTemplate,
}: ProjectTemplateStagesProps) {
  const [
    selectedStageForActivities,
    setSelectedStageForActivities,
  ] = useState<ProjectTemplateStage | null>(null);

  const {
    projectTemplateStages,
    filteredProjectTemplateStages,

    searchValue,
    setSearchValue,

    isProjectTemplateStageDialogOpen,
    editingProjectTemplateStage,

    openAddProjectTemplateStageDialog,
    openEditProjectTemplateStageDialog,
    closeProjectTemplateStageDialog,

    saveProjectTemplateStage,
    toggleProjectTemplateStageStatus,
    deleteProjectTemplateStage,

    moveProjectTemplateStageUp,
    moveProjectTemplateStageDown,
  } = useCompanyProjectTemplateStages({
    projectTemplateId: projectTemplate.id,
  });

  function openActivitiesDialog(
    stage: ProjectTemplateStage
  ) {
    setSelectedStageForActivities(stage);
  }

  function closeActivitiesDialog() {
    setSelectedStageForActivities(null);
  }

  function handleDeleteStage(
    stage: ProjectTemplateStage
  ) {
    const confirmed = window.confirm(
      `Delete the stage "${stage.name}"?\n\nAll activities associated with this stage should also be removed.`
    );

    if (!confirmed) {
      return;
    }

    deleteProjectTemplateStage(stage.id);

    if (
      selectedStageForActivities?.id === stage.id
    ) {
      closeActivitiesDialog();
    }
  }

  return (
    <>
      <SectionCard
        title={`${projectTemplate.name} Stages`}
        icon="🏗️"
        actions={
          <AppButton
            type="button"
            onClick={
              openAddProjectTemplateStageDialog
            }
          >
            <Layers className="mr-2 h-4 w-4" />
            Add Stage
          </AppButton>
        }
      >
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          label="Search stages"
          placeholder="Search stages..."
        />

        {filteredProjectTemplateStages.length ===
        0 ? (
          <EmptyState
            icon="🏗️"
            title="No stages found"
            description={
              searchValue.trim()
                ? "No stages match the current search."
                : "Create the first stage for this project template."
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredProjectTemplateStages.map(
              stage => {
                /*
                 * Folosim lista completă pentru poziție,
                 * nu lista filtrată de căutare.
                 *
                 * Astfel, mutarea sus/jos rămâne corectă
                 * chiar dacă utilizatorul caută o etapă.
                 */
                const stageIndex =
                  projectTemplateStages.findIndex(
                    currentStage =>
                      currentStage.id === stage.id
                  );

                const isFirstStage =
                  stageIndex === 0;

                const isLastStage =
                  stageIndex ===
                  projectTemplateStages.length - 1;

                return (
                  <EntityRow
                    key={stage.id}
                    title={stage.name}
                    subtitle={`Stage ${stage.order}`}
                    description={
                      <div className="mt-2 space-y-2">
                        {stage.description && (
                          <p className="text-sm text-muted-foreground">
                            {stage.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            {formatDuration(
                              stage.estimatedDurationDays
                            )}
                          </Badge>

                          <Badge variant="outline">
                            Order: {stage.order}
                          </Badge>
                        </div>
                      </div>
                    }
                    actions={
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge
                          status={stage.status}
                        />

                        <AppButton
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            openActivitiesDialog(stage)
                          }
                        >
                          <ListChecks className="mr-2 h-4 w-4" />
                          Manage Activities
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          disabled={isFirstStage}
                          aria-label={`Move ${stage.name} up`}
                          title="Move stage up"
                          onClick={() =>
                            moveProjectTemplateStageUp(
                              stage.id
                            )
                          }
                        >
                          <ArrowUp className="h-4 w-4" />
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          disabled={isLastStage}
                          aria-label={`Move ${stage.name} down`}
                          title="Move stage down"
                          onClick={() =>
                            moveProjectTemplateStageDown(
                              stage.id
                            )
                          }
                        >
                          <ArrowDown className="h-4 w-4" />
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={`Edit ${stage.name}`}
                          title="Edit stage"
                          onClick={() =>
                            openEditProjectTemplateStageDialog(
                              stage
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
                            stage.status === "ACTIVE"
                              ? `Deactivate ${stage.name}`
                              : `Activate ${stage.name}`
                          }
                          title={
                            stage.status === "ACTIVE"
                              ? "Deactivate stage"
                              : "Activate stage"
                          }
                          onClick={() =>
                            toggleProjectTemplateStageStatus(
                              stage.id
                            )
                          }
                        >
                          {stage.status ===
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
                          aria-label={`Delete ${stage.name}`}
                          title="Delete stage"
                          onClick={() =>
                            handleDeleteStage(stage)
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

      {isProjectTemplateStageDialogOpen && (
        <ProjectTemplateStageFormDialog
          key={
            editingProjectTemplateStage?.id ??
            "new-project-template-stage"
          }
          open={
            isProjectTemplateStageDialogOpen
          }
          editingProjectTemplateStage={
            editingProjectTemplateStage
          }
          onClose={
            closeProjectTemplateStageDialog
          }
          onSave={saveProjectTemplateStage}
        />
      )}

      {selectedStageForActivities && (
        <AppModal
          open
          title={`${selectedStageForActivities.name} Activities`}
          description={`Manage the activities included in the "${selectedStageForActivities.name}" stage of the "${projectTemplate.name}" template.`}
          onClose={closeActivitiesDialog}
          footer={
            <AppButton
              type="button"
              variant="outline"
              onClick={closeActivitiesDialog}
            >
              Close
            </AppButton>
          }
        >
          <div className="max-h-[70vh] overflow-y-auto pr-1">
            <ProjectTemplateActivities
              projectTemplateStage={
                selectedStageForActivities
              }
            />
          </div>
        </AppModal>
      )}
    </>
  );
}