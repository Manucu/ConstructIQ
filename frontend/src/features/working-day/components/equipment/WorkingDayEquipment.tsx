import { Pencil, Trash2 } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import EntitySelectDialog from "@/components/common/dialogs/EntitySelectDialog";
import EntityToolbar from "@/components/common/EntityToolbar";
import SectionCard from "@/components/common/SectionCard";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import type { Equipment } from "@/features/company/data/equipment";

import { useWorkingDayContext } from "../../context/useWorkingDayContext";
import { useWorkingDayEquipment } from "../../hooks/useWorkingDayEquipment";

import EquipmentHoursDialog from "./EquipmentHoursDialog";

function getEquipment(
  equipment: Equipment[],
  equipmentId: string
) {
  return equipment.find(
    (item) => item.id === equipmentId
  );
}

export default function WorkingDayEquipment() {
  const {
    equipment,
    equipmentEntries,
    selectedEquipment,
    editingEntry,

    isSearchOpen,
    isHoursOpen,

    openSearchDialog,
    closeSearchDialog,
    closeHoursDialog,

    handleSelectEquipment,
    saveEquipment,
    deleteEquipment,
    editEquipment,
  } = useWorkingDayEquipment();

  const { isLocked } = useWorkingDayContext();

  const toolbar = isLocked ? undefined : (
    <EntityToolbar
      searchLabel="Search Equipment"
      addLabel="Add Equipment"
      onSearch={openSearchDialog}
      onAdd={openSearchDialog}
    />
  );

  const availableEquipment = equipment.filter(
    (item) =>
      item.status === "ACTIVE" &&
      !equipmentEntries.some(
        (entry) => entry.equipmentId === item.id
      )
  );

  return (
    <>
      <SectionCard
        title="Equipment"
        icon="🚜"
        actions={toolbar}
      >
        {equipmentEntries.length === 0 ? (
          <EmptyState
            icon="🚜"
            title="No equipment added"
            description="Add the equipment used during this working day."
          />
        ) : (
          equipmentEntries.map((entry) => {
            const equipmentItem = getEquipment(
              equipment,
              entry.equipmentId
            );

            return (
              <EntityRow
                key={entry.id}
                title={
                  equipmentItem?.name ??
                  "Unknown Equipment"
                }
                subtitle={`Hours used: ${entry.hoursUsed} h`}
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
                      {entry.hoursUsed} h
                    </Badge>

                    {!isLocked && (
                      <>
                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={`Edit ${
                            equipmentItem?.name ??
                            "equipment"
                          }`}
                          onClick={() => {
                            editEquipment(entry);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </AppButton>

                        <AppButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={`Delete ${
                            equipmentItem?.name ??
                            "equipment"
                          }`}
                          onClick={() => {
                            deleteEquipment(entry.id);
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

      <EntitySelectDialog<Equipment>
        open={isSearchOpen}
        title="Select Equipment"
        description="Search and select equipment from the company catalog."
        items={availableEquipment}
        searchPlaceholder="Search equipment..."
        emptyMessage="No active equipment is available."
        getItemId={(item) => item.id}
        getItemLabel={(item) => item.name}
        getItemDescription={(item) =>
          item.internalHourlyRate !== undefined
            ? `${item.category} • €${item.internalHourlyRate.toFixed(
                2
              )}/h`
            : item.category
        }
        onClose={closeSearchDialog}
        onSelect={handleSelectEquipment}
      />

      {isHoursOpen && (
        <EquipmentHoursDialog
          key={
            editingEntry?.id ??
            selectedEquipment?.id ??
            "new-equipment-entry"
          }
          open={isHoursOpen}
          equipment={selectedEquipment}
          editingEntry={editingEntry}
          onClose={closeHoursDialog}
          onSave={saveEquipment}
        />
      )}
    </>
  );
}