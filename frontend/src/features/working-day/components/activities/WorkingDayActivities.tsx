import { Pencil, Trash2 } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import EntityToolbar from "@/components/common/EntityToolbar";
import EntitySelectDialog from "@/components/common/dialogs/EntitySelectDialog";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import {
  activityTemplates,
  type ActivityTemplate,
} from "@/features/company/data/activityTemplates";

import { useWorkingDayActivities } from "../../hooks/useWorkingDayActivities";

import ActivityDialog from "./ActivityDialog";


function getActivity(activityTemplateId: string) {
  return activityTemplates.find(
    (activity) => activity.id === activityTemplateId
  );
}

export default function WorkingDayActivities() {
  const {
    activityEntries,
    selectedActivity,
    editingEntry,

    isSearchOpen,
    isActivityDialogOpen,

    openSearchDialog,
    closeSearchDialog,
    closeActivityDialog,

    handleSelectActivity,
    saveActivity,
    deleteActivity,
    editActivity,
  } = useWorkingDayActivities();

  const toolbar = (
    <EntityToolbar
      searchLabel="Search Activity"
      addLabel="Add Activity"
      onSearch={openSearchDialog}
      onAdd={openSearchDialog}
    />
  );

  return (
    <>
      <SectionCard title="Activities" icon="📋" actions={toolbar}>
        {activityEntries.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No activities added"
            description="Add the first construction activity for this working day."
          />
        ) : (
          activityEntries.map((entry) => {
            const activity = getActivity(entry.activityTemplateId);

            return (
              <EntityRow
                key={entry.id}
                title={activity?.name ?? "Unknown Activity"}
                subtitle={`${entry.workersAssigned} workers • ${entry.hoursWorked} h`}
                description={
                  entry.notes ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {entry.notes}
                    </p>
                  ) : undefined
                }
                actions={
                  <div className="flex items-center gap-2">
                    {typeof entry.progressPercentage === "number" && (
                      <Badge variant="outline">
                        {entry.progressPercentage}%
                      </Badge>
                    )}

                    <StatusBadge status={entry.status} />

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label="Edit activity"
                      onClick={() => editActivity(entry)}
                    >
                      <Pencil className="h-4 w-4" />
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label="Delete activity"
                      onClick={() => deleteActivity(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </AppButton>
                  </div>
                }
              />
            );
          })
        )}
      </SectionCard>

      <EntitySelectDialog<ActivityTemplate>
        open={isSearchOpen}
        title="Select Activity"
        description="Search and select an activity from the company templates."
        items={activityTemplates.filter(
          (activity) => activity.status === "ACTIVE"
        )}
        searchPlaceholder="Search activities..."
        emptyMessage="No matching activities found."
        getItemId={(activity) => activity.id}
        getItemLabel={(activity) => activity.name}
        getItemDescription={(activity) =>
          activity.description
            ? `${activity.category} • ${activity.description}`
            : activity.category
        }
        onClose={closeSearchDialog}
        onSelect={handleSelectActivity}
      />

      {isActivityDialogOpen && (
        <ActivityDialog
          key={editingEntry?.id ?? selectedActivity?.id ?? "new-activity"}
          open={isActivityDialogOpen}
          activity={selectedActivity}
          editingEntry={editingEntry}
          onClose={closeActivityDialog}
          onSave={saveActivity}
        />
      )}
    </>
  );
}