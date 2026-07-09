import { DashboardLayout } from "@/components/layout/DashboardLayout";

import { StageHeader } from "@/features/projects/components/StageHeader";
import { StageOverview } from "@/features/projects/components/StageOverview";
import StageWorkers from "@/features/projects/components/StageWorkers";
import StageDailyTasks from "@/features/projects/components/StageDailyTasks";

import { stageDetails } from "../features/projects/data/stageDetails";

export function StageDetailsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <StageHeader stage={stageDetails} />

        <StageOverview />

        <StageWorkers />

        <StageDailyTasks />
      </div>
    </DashboardLayout>
  );
}