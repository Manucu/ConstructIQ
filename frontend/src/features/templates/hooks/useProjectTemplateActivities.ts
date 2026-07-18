import { useMemo, useState } from "react";

import { useCompanyContext } from "@/features/company/context/useCompanyContext";

import { ProjectTemplateEstimator } from "@/features/templates/services/projectTemplateEstimator";

import type {
  ProjectTemplateActivity,
  ProjectTemplateActivityStatus,
} from "../data/projectTemplateActivities";

export type SaveProjectTemplateActivityValues = {
  activityTemplateId: string;
  description?: string;
  estimatedDurationDays?: number;
  status: ProjectTemplateActivityStatus;
};

type UseProjectTemplateActivitiesOptions = {
  projectTemplateStageId: string;
};

export function useProjectTemplateActivities({
  projectTemplateStageId,
}: UseProjectTemplateActivitiesOptions) {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const [searchValue, setSearchValue] =
    useState("");

  const [
    isProjectTemplateActivityDialogOpen,
    setIsProjectTemplateActivityDialogOpen,
  ] = useState(false);

  const [
    editingProjectTemplateActivity,
    setEditingProjectTemplateActivity,
  ] = useState<ProjectTemplateActivity | null>(
    null
  );

  const availableActivityTemplates = useMemo(
    () =>
      companyData.activityTemplates.filter(
        activityTemplate =>
          activityTemplate.status === "ACTIVE"
      ),
    [companyData.activityTemplates]
  );

  const projectTemplateActivities = useMemo(
    () =>
      companyData.projectTemplateActivities
        .filter(
          activity =>
            activity.projectTemplateStageId ===
            projectTemplateStageId
        )
        .sort(
          (firstActivity, secondActivity) =>
            firstActivity.order -
            secondActivity.order
        ),
    [
      companyData.projectTemplateActivities,
      projectTemplateStageId,
    ]
  );

  const filteredProjectTemplateActivities =
    useMemo(() => {
      const normalizedSearch =
        searchValue.trim().toLowerCase();

      if (!normalizedSearch) {
        return projectTemplateActivities;
      }

      return projectTemplateActivities.filter(
        activity => {
          const activityTemplate =
            companyData.activityTemplates.find(
              template =>
                template.id ===
                activity.activityTemplateId
            );

          return (
            activityTemplate?.name
              .toLowerCase()
              .includes(normalizedSearch) ||
            activity.description
              ?.toLowerCase()
              .includes(normalizedSearch) ||
            activity.status
              .toLowerCase()
              .includes(normalizedSearch)
          );
        }
      );
    }, [
      projectTemplateActivities,
      companyData.activityTemplates,
      searchValue,
    ]);

  function openAddProjectTemplateActivityDialog() {
    setEditingProjectTemplateActivity(null);

    setIsProjectTemplateActivityDialogOpen(
      true
    );
  }

  function openEditProjectTemplateActivityDialog(
    activity: ProjectTemplateActivity
  ) {
    setEditingProjectTemplateActivity(activity);

    setIsProjectTemplateActivityDialogOpen(
      true
    );
  }

  function closeProjectTemplateActivityDialog() {
    setEditingProjectTemplateActivity(null);

    setIsProjectTemplateActivityDialogOpen(
      false
    );
  }

  function saveProjectTemplateActivity(
    values: SaveProjectTemplateActivityValues
  ) {
    if (editingProjectTemplateActivity) {
      setCompanyData(currentData => ({
        ...currentData,

        projectTemplateActivities:
          currentData.projectTemplateActivities.map(
            activity =>
              activity.id ===
              editingProjectTemplateActivity.id
                ? {
                    ...activity,
                    ...values,
                  }
                : activity
          ),
      }));

      closeProjectTemplateActivityDialog();

      return;
    }

    const activitiesForCurrentStage =
      companyData.projectTemplateActivities.filter(
        activity =>
          activity.projectTemplateStageId ===
          projectTemplateStageId
      );

    const alreadyExists =
      activitiesForCurrentStage.some(
        activity =>
          activity.activityTemplateId ===
          values.activityTemplateId
      );

    if (alreadyExists) {
      return;
    }

    const highestOrder =
      activitiesForCurrentStage.reduce(
        (currentHighestOrder, activity) =>
          Math.max(
            currentHighestOrder,
            activity.order
          ),
        0
      );

    const newActivity: ProjectTemplateActivity = {
      id: crypto.randomUUID(),
      projectTemplateStageId,
      order: highestOrder + 1,
      ...values,
    };

    setCompanyData(currentData => ({
      ...currentData,

      projectTemplateActivities: [
        ...currentData.projectTemplateActivities,
        newActivity,
      ],
    }));

    closeProjectTemplateActivityDialog();
  }

  function toggleProjectTemplateActivityStatus(
    activityId: string
  ) {
    setCompanyData(currentData => ({
      ...currentData,

      projectTemplateActivities:
        currentData.projectTemplateActivities.map(
          activity =>
            activity.id === activityId
              ? {
                  ...activity,

                  status:
                    activity.status === "ACTIVE"
                      ? "INACTIVE"
                      : "ACTIVE",
                }
              : activity
        ),
    }));
  }

  function deleteProjectTemplateActivity(
    activityId: string
  ) {
    setCompanyData(currentData => {
      const remainingActivities =
        currentData.projectTemplateActivities.filter(
          activity =>
            activity.id !== activityId
        );

      const reorderedActivities =
        remainingActivities
          .filter(
            activity =>
              activity.projectTemplateStageId ===
              projectTemplateStageId
          )
          .sort(
            (
              firstActivity,
              secondActivity
            ) =>
              firstActivity.order -
              secondActivity.order
          )
          .map((activity, index) => ({
            ...activity,
            order: index + 1,
          }));

      const reorderedActivitiesById =
        new Map(
          reorderedActivities.map(activity => [
            activity.id,
            activity,
          ])
        );

      return {
        ...currentData,

        projectTemplateActivities:
          remainingActivities.map(
            activity =>
              reorderedActivitiesById.get(
                activity.id
              ) ?? activity
          ),

        projectTemplateActivityMaterials:
          currentData.projectTemplateActivityMaterials.filter(
            material =>
              material.projectTemplateActivityId !==
              activityId
          ),
      };
    });

    if (
      editingProjectTemplateActivity?.id ===
      activityId
    ) {
      closeProjectTemplateActivityDialog();
    }
  }

  function moveProjectTemplateActivityUp(
    activityId: string
  ) {
    moveProjectTemplateActivity(
      activityId,
      -1
    );
  }

  function moveProjectTemplateActivityDown(
    activityId: string
  ) {
    moveProjectTemplateActivity(
      activityId,
      1
    );
  }

  function moveProjectTemplateActivity(
    activityId: string,
    direction: -1 | 1
  ) {
    setCompanyData(currentData => {
      const activitiesForCurrentStage =
        currentData.projectTemplateActivities
          .filter(
            activity =>
              activity.projectTemplateStageId ===
              projectTemplateStageId
          )
          .sort(
            (
              firstActivity,
              secondActivity
            ) =>
              firstActivity.order -
              secondActivity.order
          );

      const currentActivityIndex =
        activitiesForCurrentStage.findIndex(
          activity =>
            activity.id === activityId
        );

      if (currentActivityIndex === -1) {
        return currentData;
      }

      const destinationIndex =
        currentActivityIndex + direction;

      if (
        destinationIndex < 0 ||
        destinationIndex >=
          activitiesForCurrentStage.length
      ) {
        return currentData;
      }

      const reorderedActivities = [
        ...activitiesForCurrentStage,
      ];

      const [movedActivity] =
        reorderedActivities.splice(
          currentActivityIndex,
          1
        );

      reorderedActivities.splice(
        destinationIndex,
        0,
        movedActivity
      );

      const normalizedActivities =
        reorderedActivities.map(
          (activity, index) => ({
            ...activity,
            order: index + 1,
          })
        );

      const normalizedActivitiesById =
        new Map(
          normalizedActivities.map(
            activity => [
              activity.id,
              activity,
            ]
          )
        );

      return {
        ...currentData,

        projectTemplateActivities:
          currentData.projectTemplateActivities.map(
            activity =>
              normalizedActivitiesById.get(
                activity.id
              ) ?? activity
          ),
      };
    });
  }

  function getActivityTemplateById(
    activityTemplateId: string
  ) {
    return companyData.activityTemplates.find(
      activityTemplate =>
        activityTemplate.id ===
        activityTemplateId
    );
  }

  function getActivityMaterials(
    projectTemplateActivityId: string
  ) {
    return ProjectTemplateEstimator.getActivityMaterials(
      companyData,
      projectTemplateActivityId
    );
  }

  function getActivitySummary(
    projectTemplateActivityId: string
  ) {
    return ProjectTemplateEstimator.getActivitySummary(
      companyData,
      projectTemplateActivityId
    );
  }

  return {
    projectTemplateActivities,
    filteredProjectTemplateActivities,

    availableActivityTemplates,
    allActivityTemplates:
      companyData.activityTemplates,

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

    getActivityMaterials,
    getActivitySummary,
  };
}