import {
  ClipboardPlus,
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

import { useActivityTemplates } from "../../hooks/useActivityTemplates";

import ActivityTemplateFormDialog from "./ActivityTemplateFormDialog";

export default function ActivityTemplates() {
  const {
    filteredActivityTemplates,
    searchValue,
    isActivityTemplateDialogOpen,
    editingActivityTemplate,

    setSearchValue,

    openAddActivityTemplateDialog,
    openEditActivityTemplateDialog,
    closeActivityTemplateDialog,

    saveActivityTemplate,
    toggleActivityTemplateStatus,
    deleteActivityTemplate,
  } = useActivityTemplates();

  return (
    <>
      <SectionCard
        title="Activity Templates"
        icon="🏗️"
        actions={
          <AppButton
            type="button"
            onClick={openAddActivityTemplateDialog}
          >
            <ClipboardPlus className="mr-2 h-4 w-4" />
            Add Activity Template
          </AppButton>
        }
      >
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          label="Search activity templates"
          placeholder="Search by name, category, description or status..."
        />

        {filteredActivityTemplates.length === 0 ? (
          <EmptyState
            icon="🏗️"
            title="No activity templates found"
            description={
              searchValue.trim()
                ? "No activity templates match the current search."
                : "Add the first reusable activity template."
            }
            action={
              !searchValue.trim() ? (
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={openAddActivityTemplateDialog}
                >
                  <ClipboardPlus className="mr-2 h-4 w-4" />
                  Add First Activity Template
                </AppButton>
              ) : undefined
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredActivityTemplates.map((activityTemplate) => (
              <EntityRow
                key={activityTemplate.id}
                title={activityTemplate.name}
                subtitle={activityTemplate.category}
                description={
                  <div className="mt-2 space-y-2">
                    {activityTemplate.description && (
                      <p className="text-sm text-muted-foreground">
                        {activityTemplate.description}
                      </p>
                    )}

                    <Badge variant="secondary">
                      Reusable template
                    </Badge>
                  </div>
                }
                actions={
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={activityTemplate.status} />

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Edit ${activityTemplate.name}`}
                      onClick={() => {
                        openEditActivityTemplateDialog(
                          activityTemplate
                        );
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={
                        activityTemplate.status === "ACTIVE"
                          ? `Deactivate ${activityTemplate.name}`
                          : `Activate ${activityTemplate.name}`
                      }
                      onClick={() => {
                        toggleActivityTemplateStatus(
                          activityTemplate.id
                        );
                      }}
                    >
                      {activityTemplate.status === "ACTIVE" ? (
                        <PowerOff className="h-4 w-4" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Delete ${activityTemplate.name}`}
                      onClick={() => {
                        deleteActivityTemplate(
                          activityTemplate.id
                        );
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </AppButton>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </SectionCard>

      {isActivityTemplateDialogOpen && (
        <ActivityTemplateFormDialog
          key={
            editingActivityTemplate?.id ??
            "new-activity-template"
          }
          open={isActivityTemplateDialogOpen}
          editingActivityTemplate={editingActivityTemplate}
          onClose={closeActivityTemplateDialog}
          onSave={saveActivityTemplate}
        />
      )}
    </>
  );
}