import { useState } from "react";

import { useWorkingDayContext } from "../context/useWorkingDayContext";

export function useWorkingDayNotes() {
  const { notes, setNotes } = useWorkingDayContext();

  const [draftNotes, setDraftNotes] = useState(notes);
  const [isEditing, setIsEditing] = useState(false);

  function startEditing() {
    setDraftNotes(notes);
    setIsEditing(true);
  }

  function cancelEditing() {
    setDraftNotes(notes);
    setIsEditing(false);
  }

  function saveNotes() {
    setNotes(draftNotes.trim());
    setIsEditing(false);
  }

  return {
    notes,
    draftNotes,
    isEditing,

    setDraftNotes,

    startEditing,
    cancelEditing,
    saveNotes,
  };
}