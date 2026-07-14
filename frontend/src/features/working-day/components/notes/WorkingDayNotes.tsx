import { Edit3, Save, X } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import SectionCard from "@/components/common/SectionCard";
import { AppButton } from "@/components/ui/AppButton";

import { useWorkingDayNotes } from "../../hooks/useWorkingDayNotes";

import { useWorkingDayContext } from "../../context/useWorkingDayContext";

export default function WorkingDayNotes() {
  const {
    notes,
    draftNotes,
    isEditing,
    setDraftNotes,
    startEditing,
    cancelEditing,
    saveNotes,
  } = useWorkingDayNotes();

  const { isLocked } = useWorkingDayContext();

  return (
    <SectionCard
      title="Notes"
      icon="📝"
      actions={
        isLocked ? undefined : !isEditing ? (
          <AppButton
            type="button"
            variant="outline"
            onClick={startEditing}
          >
            <Edit3 className="mr-2 h-4 w-4" />
            Edit
          </AppButton>
        ) : (
          <div className="flex gap-2">
            <AppButton
              type="button"
              variant="outline"
              onClick={cancelEditing}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </AppButton>

            <AppButton
              type="button"
              onClick={saveNotes}
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </AppButton>
          </div>
        )
      }
    >
      {isEditing ? (
        <textarea
          rows={8}
          className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none transition-colors focus:border-blue-700"
          placeholder="Write working day notes..."
          value={draftNotes}
          onChange={(event) => {
            setDraftNotes(event.target.value);
          }}
        />
      ) : notes.trim() ? (
        <div className="rounded-xl border bg-slate-50 p-4">
          <p className="whitespace-pre-wrap leading-7">
            {notes}
          </p>
        </div>
      ) : (
        <EmptyState
          icon="📝"
          title="No notes"
          description="Add notes about today's work, issues, weather or observations."
        />
      )}
    </SectionCard>
  );
}