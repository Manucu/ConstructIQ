import { useContext } from "react";

import { WorkingDayContext } from "./workingDayContextDefinition";

export function useWorkingDayContext() {
  const context = useContext(WorkingDayContext);

  if (!context) {
    throw new Error(
      "useWorkingDayContext must be used inside WorkingDayProvider"
    );
  }

  return context;
}