import { CompanyProvider } from "@/features/company/context/CompanyContext";
import { AppRouter } from "@/app/router/AppRouter";

export default function App() {
  return (
    <CompanyProvider>
      <AppRouter />
    </CompanyProvider>
  );
}