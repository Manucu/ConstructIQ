import { useMemo, useState } from "react";

import { useCompanyContext } from "../context/useCompanyContext";

import type {
  ProjectTemplateStage,
  ProjectTemplateStageStatus,
} from "../data/projectTemplates";

export type SaveProjectTemplateStageValues = {
  name: string;
  description?: string;
  estimatedDurationDays?: number;
  status: ProjectTemplateStageStatus;
};

type UseCompanyProjectTemplateStagesOptions = {
  projectTemplateId: string;
};

export function useCompanyProjectTemplateStages({
  projectTemplateId,
}: UseCompanyProjectTemplateStagesOptions) {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const [searchValue, setSearchValue] =
    useState("");

  const [
    isProjectTemplateStageDialogOpen,
    setIsProjectTemplateStageDialogOpen,
  ] = useState(false);

  const [
    editingProjectTemplateStage,
    setEditingProjectTemplateStage,
  ] = useState<ProjectTemplateStage | null>(
    null
  );

  const projectTemplateStages = useMemo(
    () =>
      companyData.projectTemplateStages
        .filter(
          (stage) =>
            stage.projectTemplateId ===
            projectTemplateId
        )
        .sort(
          (firstStage, secondStage) =>
            firstStage.order - secondStage.order
        ),
    [
      companyData.projectTemplateStages,
      projectTemplateId,
    ]
  );

  const filteredProjectTemplateStages =
    useMemo(() => {
      const normalizedSearch = searchValue
        .trim()
        .toLowerCase();

      if (!normalizedSearch) {
        return projectTemplateStages;
      }

      return projectTemplateStages.filter(
        (stage) =>
          stage.name
            .toLowerCase()
            .includes(normalizedSearch) ||
          stage.description
            ?.toLowerCase()
            .includes(normalizedSearch) ||
          stage.status
            .toLowerCase()
            .includes(normalizedSearch)
      );
    }, [
      projectTemplateStages,
      searchValue,
    ]);

  function openAddProjectTemplateStageDialog() {
    setEditingProjectTemplateStage(null);
    setIsProjectTemplateStageDialogOpen(true);
  }

  function openEditProjectTemplateStageDialog(
    stage: ProjectTemplateStage
  ) {
    setEditingProjectTemplateStage(stage);
    setIsProjectTemplateStageDialogOpen(true);
  }

  function closeProjectTemplateStageDialog() {
    setEditingProjectTemplateStage(null);
    setIsProjectTemplateStageDialogOpen(false);
  }

  function saveProjectTemplateStage(
    values: SaveProjectTemplateStageValues
  ) {
    if (editingProjectTemplateStage) {
      setCompanyData((currentData) => ({
        ...currentData,
        projectTemplateStages:
          currentData.projectTemplateStages.map(
            (stage) =>
              stage.id ===
              editingProjectTemplateStage.id
                ? {
                    ...stage,
                    ...values,
                  }
                : stage
          ),
      }));

      closeProjectTemplateStageDialog();
      return;
    }

    const stagesForCurrentTemplate =
      companyData.projectTemplateStages.filter(
        (stage) =>
          stage.projectTemplateId ===
          projectTemplateId
      );

    const highestOrder =
      stagesForCurrentTemplate.reduce(
        (currentHighestOrder, stage) =>
          Math.max(
            currentHighestOrder,
            stage.order
          ),
        0
      );

    const newStage: ProjectTemplateStage = {
      id: crypto.randomUUID(),
      projectTemplateId,
      order: highestOrder + 1,
      ...values,
    };

    setCompanyData((currentData) => ({
      ...currentData,
      projectTemplateStages: [
        ...currentData.projectTemplateStages,
        newStage,
      ],
    }));

    closeProjectTemplateStageDialog();
  }

  function toggleProjectTemplateStageStatus(
    stageId: string
  ) {
    setCompanyData((currentData) => ({
      ...currentData,
      projectTemplateStages:
        currentData.projectTemplateStages.map(
          (stage) =>
            stage.id === stageId
              ? {
                  ...stage,
                  status:
                    stage.status === "ACTIVE"
                      ? "INACTIVE"
                      : "ACTIVE",
                }
              : stage
        ),
    }));
  }

  function deleteProjectTemplateStage(
    stageId: string
  ) {
    setCompanyData((currentData) => {
      const remainingStages =
        currentData.projectTemplateStages.filter(
          (stage) => stage.id !== stageId
        );

      const reorderedStages =
        remainingStages
          .filter(
            (stage) =>
              stage.projectTemplateId ===
              projectTemplateId
          )
          .sort(
            (firstStage, secondStage) =>
              firstStage.order -
              secondStage.order
          )
          .map((stage, index) => ({
            ...stage,
            order: index + 1,
          }));

      const reorderedStageIds = new Set(
        reorderedStages.map((stage) => stage.id)
      );

      return {
        ...currentData,
        projectTemplateStages:
          remainingStages.map((stage) => {
            if (!reorderedStageIds.has(stage.id)) {
              return stage;
            }

            return (
              reorderedStages.find(
                (reorderedStage) =>
                  reorderedStage.id === stage.id
              ) ?? stage
            );
          }),
      };
    });

    if (
      editingProjectTemplateStage?.id === stageId
    ) {
      closeProjectTemplateStageDialog();
    }
  }

  function moveProjectTemplateStageUp(
    stageId: string
  ) {
    moveProjectTemplateStage(stageId, -1);
  }

  function moveProjectTemplateStageDown(
    stageId: string
  ) {
    moveProjectTemplateStage(stageId, 1);
  }

  function moveProjectTemplateStage(
    stageId: string,
    direction: -1 | 1
  ) {
    setCompanyData((currentData) => {
      const stagesForCurrentTemplate =
        currentData.projectTemplateStages
          .filter(
            (stage) =>
              stage.projectTemplateId ===
              projectTemplateId
          )
          .sort(
            (firstStage, secondStage) =>
              firstStage.order -
              secondStage.order
          );

      const currentStageIndex =
        stagesForCurrentTemplate.findIndex(
          (stage) => stage.id === stageId
        );

      if (currentStageIndex === -1) {
        return currentData;
      }

      const destinationIndex =
        currentStageIndex + direction;

      if (
        destinationIndex < 0 ||
        destinationIndex >=
          stagesForCurrentTemplate.length
      ) {
        return currentData;
      }

      const reorderedStages = [
        ...stagesForCurrentTemplate,
      ];

      const [movedStage] =
        reorderedStages.splice(
          currentStageIndex,
          1
        );

      reorderedStages.splice(
        destinationIndex,
        0,
        movedStage
      );

      const normalizedStages =
        reorderedStages.map(
          (stage, index) => ({
            ...stage,
            order: index + 1,
          })
        );

      const normalizedStagesById = new Map(
        normalizedStages.map((stage) => [
          stage.id,
          stage,
        ])
      );

      return {
        ...currentData,
        projectTemplateStages:
          currentData.projectTemplateStages.map(
            (stage) =>
              normalizedStagesById.get(
                stage.id
              ) ?? stage
          ),
      };
    });
  }

  return {
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
  };
}