import { Pencil, Trash2 } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import EntityToolbar from "@/components/common/EntityToolbar";
import EntitySelectDialog from "@/components/common/dialogs/EntitySelectDialog";
import SectionCard from "@/components/common/SectionCard";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import {
  equipment,
  type Equipment,
} from "@/features/company/data/equipment";

import { useWorkingDayEquipment } from "../../hooks/useWorkingDayEquipment";
import type { WorkingDay } from "../../types/workingDay";

import EquipmentHoursDialog from "./EquipmentHoursDialog";

type WorkingDayEquipmentProps = {
  workingDay: WorkingDay;
};

function getEquipment(equipmentId: string) {
  return equipment.find((item) => item.id === equipmentId);
}

export default function WorkingDayEquipment({
  workingDay,
}: WorkingDayEquipmentProps) {
  const {
    equipmentEntries,
    selectedEquipment,
    isSearchOpen,
    isHoursOpen,
    openSearchDialog,
    closeSearchDialog,
    closeHoursDialog,
    handleSelectEquipment,
    saveEquipment,
    deleteEquipment,
    editEquipment,
  } = useWorkingDayEquipment({ workingDay });

  const toolbar = (
    <EntityToolbar
      searchLabel="Search Equipment"
      addLabel="Add Equipment"
      onSearch={openSearchDialog}
      onAdd={openSearchDialog}
    />
  );

  return (
    <>
      <SectionCard title="Equipment" icon="🚜" actions={toolbar}>
        {equipmentEntries.length === 0 ? (
          <EmptyState
            icon="🚜"
            title="No equipment added"
            description="Add the equipment used during this working day."
          />
        ) : (
          equipmentEntries.map((entry) => {
            const equipmentItem = getEquipment(entry.equipmentId);

            return (
              <EntityRow
                key={entry.id}
                title={equipmentItem?.name ?? "Unknown Equipment"}
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

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label="Edit equipment"
                      onClick={() => editEquipment(entry)}
                    >
                      <Pencil className="h-4 w-4" />
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label="Delete equipment"
                      onClick={() => deleteEquipment(entry.id)}
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

      <EntitySelectDialog<Equipment>
        open={isSearchOpen}
        title="Select Equipment"
        description="Search and select equipment from the company catalog."
        items={equipment.filter((item) => item.status === "ACTIVE")}
        searchPlaceholder="Search equipment..."
        emptyMessage="No matching equipment found."
        getItemId={(item) => item.id}
        getItemLabel={(item) => item.name}
        getItemDescription={(item) => item.category}
        onClose={closeSearchDialog}
        onSelect={handleSelectEquipment}
      />

      <EquipmentHoursDialog
        open={isHoursOpen}
        equipment={selectedEquipment}
        onClose={closeHoursDialog}
        onSave={saveEquipment}
      />
    </>
  );
}