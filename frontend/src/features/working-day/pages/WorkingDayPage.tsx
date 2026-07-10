import { DashboardLayout } from "@/components/layout/DashboardLayout";
/*import { Card, CardContent } from "@/components/ui/card";*/
/*import { Badge } from "@/components/ui/badge"; */

import { workingDayMock } from "../data/workingDayMock";
import WorkingDayHeader from "../components/header/WorkingDayHeader";
import WorkingDaySummary from "../components/summary/WorkingDaySummary";
import WorkingDayAttendance from "../components/attendance/WorkingDayAttendance";
import WorkingDayActivities from "../components/activities/WorkingDayActivities";
import WorkingDayMaterials from "../components/materials/WorkingDayMaterials";
import WorkingDayEquipment from "../components/equipment/WorkingDayEquipment";
import WorkingDayExpenses from "../components/expenses/WorkingDayExpenses";
import WorkingDayPhotos from "../components/photos/WorkingDayPhotos";
import WorkingDayDocuments from "../components/documents/WorkingDayDocuments";
import WorkingDayNotes from "../components/notes/WorkingDayNotes";
import WorkingDayApproval from "../components/approval/WorkingDayApproval";
import WorkingDayWorkers from "../components/workers/WorkingDayWorkers";



export default function WorkingDayPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WorkingDayHeader workingDay={workingDayMock} />

        <WorkingDaySummary workingDay={workingDayMock} />

        <WorkingDayAttendance workingDay={workingDayMock} />

        <WorkingDayWorkers workingDay={workingDayMock} />

        <WorkingDayActivities workingDay={workingDayMock} />

        <WorkingDayMaterials workingDay={workingDayMock} />

        <WorkingDayEquipment workingDay={workingDayMock} />

        <WorkingDayExpenses workingDay={workingDayMock} />

        <WorkingDayPhotos workingDay={workingDayMock} />

        <WorkingDayDocuments workingDay={workingDayMock} />

        <WorkingDayNotes workingDay={workingDayMock} />

        <WorkingDayApproval workingDay={workingDayMock} />

      </div>
    </DashboardLayout>
  );
}