import { Pencil, Trash2 } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import EntitySelectDialog from "@/components/common/dialogs/EntitySelectDialog";
import EntityToolbar from "@/components/common/EntityToolbar";
import SectionCard from "@/components/common/SectionCard";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import { activityTemplates } from "@/features/templates/data/activityTemplates";
import type { Worker } from "@/features/company/data/workers";

import { useWorkingDayContext } from "../../context/useWorkingDayContext";
import { useWorkingDayWorkers } from "../../hooks/useWorkingDayWorkers";

import WorkerDialog from "./WorkerDialog";

function getWorker(
  workers: Worker[],
  workerId: string
) {
  return workers.find(
    (worker) => worker.id === workerId
  );
}

function getActivityName(activityTemplateId?: string) {
  if (!activityTemplateId) {
    return "No activity assigned";
  }

  return (
    activityTemplates.find(
      (activity) => activity.id === activityTemplateId
    )?.name ?? "Unknown activity"
  );
}

export default function WorkingDayWorkers() {
  const {
    workers,
    workerEntries,
    selectedWorker,
    editingEntry,

    isSearchOpen,
    isWorkerDialogOpen,

    openSearchDialog,
    closeSearchDialog,
    closeWorkerDialog,

    handleSelectWorker,
    saveWorker,
    deleteWorker,
    editWorker,
  } = useWorkingDayWorkers();

  const { isLocked } = useWorkingDayContext();

  const toolbar = isLocked ? undefined : (
    <EntityToolbar
      searchLabel="Search Worker"
      addLabel="Add Worker"
      onSearch={openSearchDialog}
      onAdd={openSearchDialog}
    />
  );

  const availableWorkers = workers.filter(
    (worker) =>
      worker.status === "ACTIVE" &&
      !workerEntries.some(
        (entry) => entry.workerId === worker.id
      )
  );

  return (
    <>
      <SectionCard
        title="Workers"
        icon="👷"
        actions={toolbar}
      >
        {workerEntries.length === 0 ? (
          <EmptyState
            icon="👷"
            title="No workers assigned"
            description="Add workers from the company workforce."
          />
        ) : (
          workerEntries.map((entry) => {
            const worker = getWorker(
              workers,
              entry.workerId
            );

            return (
              <EntityRow
                key={entry.id}
                title={
                  worker
                    ? `${worker.firstName} ${worker.lastName}`
                    : "Unknown Worker"
                }
                subtitle={`${
                  worker?.role ?? "Unknown role"
                } • ${getActivityName(
                  entry.activityTemplateId
                )}`}
                description={
                  entry.notes ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {entry.notes}
                    </p>
                  ) : undefined
                }
                actions={
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {entry.hoursWorked} h
                    </Badge>

                    <Badge
                      variant={
                        entry.present
                          ? "default"
                          : "secondary"
                      }
                    >
                      {entry.present
                        ? "Present"
                        : "Absent"}
                    </Badge>

                    {!isLocked && (
                      <>
                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={`Edit ${
                            worker
                              ? `${worker.firstName} ${worker.lastName}`
                              : "worker"
                          }`}
                          onClick={() => {
                            editWorker(entry);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={`Delete ${
                            worker
                              ? `${worker.firstName} ${worker.lastName}`
                              : "worker"
                          }`}
                          onClick={() => {
                            deleteWorker(entry.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </AppButton>
                      </>
                    )}
                  </div>
                }
              />
            );
          })
        )}
      </SectionCard>

      <EntitySelectDialog<Worker>
        open={isSearchOpen}
        title="Select Worker"
        description="Search and select a worker from the company workforce."
        items={availableWorkers}
        searchPlaceholder="Search workers..."
        emptyMessage="No active workers are available."
        getItemId={(worker) => worker.id}
        getItemLabel={(worker) =>
          `${worker.firstName} ${worker.lastName}`
        }
        getItemDescription={(worker) => worker.role}
        onClose={closeSearchDialog}
        onSelect={handleSelectWorker}
      />

      {isWorkerDialogOpen && (
        <WorkerDialog
          key={
            editingEntry?.id ??
            selectedWorker?.id ??
            "new-worker-entry"
          }
          open={isWorkerDialogOpen}
          worker={selectedWorker}
          editingEntry={editingEntry}
          onClose={closeWorkerDialog}
          onSave={saveWorker}
        />
      )}
    </>
  );
}