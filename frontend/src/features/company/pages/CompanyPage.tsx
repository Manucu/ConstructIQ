import { DashboardLayout } from "@/components/layout/DashboardLayout";

import CompanyWorkers from "../components/workers/CompanyWorkers";
import CompanyMaterials from "../components/materials/CompanyMaterials";

export default function CompanyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Company</h1>

          <p className="mt-2 text-muted-foreground">
            Manage the company workforce, materials, equipment,
            clients, suppliers and reusable project data.
          </p>
        </div>

        <CompanyWorkers />
        <CompanyMaterials />  
      </div>
    </DashboardLayout>
  );
}