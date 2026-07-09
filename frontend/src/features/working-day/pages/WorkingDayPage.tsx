import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
/*import { Badge } from "@/components/ui/badge"; */

import { workingDayMock } from "../data/workingDayMock";
import WorkingDayHeader from "../components/header/WorkingDayHeader";
import WorkingDaySummary from "../components/summary/WorkingDaySummary";
import WorkingDayAttendance from "../components/attendance/WorkingDayAttendance";
import WorkingDayActivities from "../components/activities/WorkingDayActivities";



export default function WorkingDayPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WorkingDayHeader workingDay={workingDayMock} />

        <WorkingDaySummary workingDay={workingDayMock} />

        <WorkingDayAttendance workingDay={workingDayMock} />
        
        <WorkingDayActivities workingDay={workingDayMock} />

        {/* Placeholder */}
        <Card>
          <CardContent className="py-16 text-center">
            <h2 className="text-2xl font-semibold">
              🚧 Working Day Module
            </h2>

            <p className="mt-3 text-muted-foreground">
              Next we will split this page into dedicated sections:
            </p>

            <div className="mt-6 grid gap-2 text-left md:grid-cols-2">
              <div>✅ Attendance</div>
              <div>✅ Workers</div>
              <div>✅ Activities</div>
              <div>✅ Materials</div>
              <div>✅ Equipment</div>
              <div>✅ Expenses</div>
              <div>✅ Photos</div>
              <div>✅ Documents</div>
              <div>✅ Notes</div>
              <div>✅ Approval</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}