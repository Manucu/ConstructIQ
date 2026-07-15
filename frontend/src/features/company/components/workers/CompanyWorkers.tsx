import {
  Pencil,
  Power,
  PowerOff,
  Trash2,
  UserPlus,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import SectionCard from "@/components/common/SectionCard";
import SearchInput from "@/components/common/SearchInput";
import StatusBadge from "@/components/common/StatusBadge";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import { useCompanyWorkers } from "../../hooks/useCompanyWorkers";

import WorkerFormDialog from "./WorkerFormDialog";

export default function CompanyWorkers() {
  const {
    filteredWorkers,
    searchValue,
    isWorkerDialogOpen,
    editingWorker,

    setSearchValue,

    openAddWorkerDialog,
    openEditWorkerDialog,
    closeWorkerDialog,

    saveWorker,
    toggleWorkerStatus,
    deleteWorker,
  } = useCompanyWorkers();

  return (
    <>
      <SectionCard
        title="Workforce"
        icon="👷"
        actions={
          <AppButton
            type="button"
            onClick={openAddWorkerDialog}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Worker
          </AppButton>
        }
      >
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          label="Search workers"
          placeholder="Search by name, role, phone or status..."
        />

        {filteredWorkers.length === 0 ? (
          <EmptyState
            icon="👷"
            title="No workers found"
            description={
              searchValue.trim()
                ? "No workers match the current search."
                : "Add the first worker to the company workforce."
            }
            action={
              !searchValue.trim() ? (
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={openAddWorkerDialog}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add First Worker
                </AppButton>
              ) : undefined
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredWorkers.map((worker) => (
              <EntityRow
                key={worker.id}
                title={`${worker.firstName} ${worker.lastName}`}
                subtitle={worker.role}
                description={
                  worker.phone ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Phone: {worker.phone}
                    </p>
                  ) : undefined
                }
                actions={
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">
                      €{worker.internalHourlyRate}/h
                    </Badge>

                    <StatusBadge status={worker.status} />

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Edit ${worker.firstName} ${worker.lastName}`}
                      onClick={() => {
                        openEditWorkerDialog(worker);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={
                        worker.status === "ACTIVE"
                          ? `Deactivate ${worker.firstName} ${worker.lastName}`
                          : `Activate ${worker.firstName} ${worker.lastName}`
                      }
                      onClick={() => {
                        toggleWorkerStatus(worker.id);
                      }}
                    >
                      {worker.status === "ACTIVE" ? (
                        <PowerOff className="h-4 w-4" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Delete ${worker.firstName} ${worker.lastName}`}
                      onClick={() => {
                        deleteWorker(worker.id);
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

      {isWorkerDialogOpen && (
        <WorkerFormDialog
          key={editingWorker?.id ?? "new-worker"}
          open={isWorkerDialogOpen}
          editingWorker={editingWorker}
          onClose={closeWorkerDialog}
          onSave={saveWorker}
        />
      )}
    </>
  );
}