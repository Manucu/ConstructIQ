import {
  Pencil,
  Power,
  PowerOff,
  Tractor,
  Trash2,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import SearchInput from "@/components/common/SearchInput";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import { useCompanyEquipment } from "../../hooks/useCompanyEquipment";

import EquipmentFormDialog from "./EquipmentFormDialog";

function formatHourlyRate(rate?: number) {
  if (rate === undefined) {
    return "No hourly rate";
  }

  return `€${rate.toFixed(2)} / h`;
}

export default function CompanyEquipment() {
  const {
    filteredEquipment,
    searchValue,
    isEquipmentDialogOpen,
    editingEquipment,

    setSearchValue,

    openAddEquipmentDialog,
    openEditEquipmentDialog,
    closeEquipmentDialog,

    saveEquipment,
    toggleEquipmentStatus,
    deleteEquipment,
  } = useCompanyEquipment();

  return (
    <>
      <SectionCard
        title="Equipment"
        icon="🚜"
        actions={
          <AppButton
            type="button"
            onClick={openAddEquipmentDialog}
          >
            <Tractor className="mr-2 h-4 w-4" />
            Add Equipment
          </AppButton>
        }
      >
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          label="Search equipment"
          placeholder="Search by name, category or status..."
        />

        {filteredEquipment.length === 0 ? (
          <EmptyState
            icon="🚜"
            title="No equipment found"
            description={
              searchValue.trim()
                ? "No equipment matches the current search."
                : "Add the first piece of equipment to the company catalog."
            }
            action={
              !searchValue.trim() ? (
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={openAddEquipmentDialog}
                >
                  <Tractor className="mr-2 h-4 w-4" />
                  Add First Equipment
                </AppButton>
              ) : undefined
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredEquipment.map((item) => (
              <EntityRow
                key={item.id}
                title={item.name}
                subtitle={item.category}
                description={
                  <div className="mt-2">
                    <Badge variant="outline">
                      {formatHourlyRate(item.internalHourlyRate)}
                    </Badge>
                  </div>
                }
                actions={
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={item.status} />

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Edit ${item.name}`}
                      onClick={() => {
                        openEditEquipmentDialog(item);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={
                        item.status === "ACTIVE"
                          ? `Deactivate ${item.name}`
                          : `Activate ${item.name}`
                      }
                      onClick={() => {
                        toggleEquipmentStatus(item.id);
                      }}
                    >
                      {item.status === "ACTIVE" ? (
                        <PowerOff className="h-4 w-4" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Delete ${item.name}`}
                      onClick={() => {
                        deleteEquipment(item.id);
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

      {isEquipmentDialogOpen && (
        <EquipmentFormDialog
          key={editingEquipment?.id ?? "new-equipment"}
          open={isEquipmentDialogOpen}
          editingEquipment={editingEquipment}
          onClose={closeEquipmentDialog}
          onSave={saveEquipment}
        />
      )}
    </>
  );
}