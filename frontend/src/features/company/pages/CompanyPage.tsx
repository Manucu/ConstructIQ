import { DashboardLayout } from "@/components/layout/DashboardLayout";

import CompanyWorkers from "../components/workers/CompanyWorkers";
import CompanyMaterials from "../components/materials/CompanyMaterials";
import CompanyEquipment from "../components/equipment/CompanyEquipment";
import CompanyActivityTemplates from "../components/activity-templates/CompanyActivityTemplates";
import CompanyClients from "../components/clients/CompanyClients";
import CompanySuppliers from "../components/suppliers/CompanySuppliers";
import CompanyExpenseCategories from "../components/expense-categories/CompanyExpenseCategories";
import CompanyProjectTemplates from "../components/project-templates/CompanyProjectTemplates";



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
        <CompanyEquipment />
        <CompanyActivityTemplates /> 
        <CompanyClients />
        <CompanySuppliers />
        <CompanyExpenseCategories />
        <CompanyProjectTemplates />
      </div>
    </DashboardLayout>
  );
}