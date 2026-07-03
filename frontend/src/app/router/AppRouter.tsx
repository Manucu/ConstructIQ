import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProjectDetailsPage } from "@/pages/ProjectDetailsPage";
import { StageDetailsPage } from "@/pages/StageDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
  path: "/projects",
  element: <ProjectsPage />,
  },
  {
  path: "/projects/:projectId",
  element: <ProjectDetailsPage />,
  },
  {
  path: "/projects/:projectId/stages/:stageId",
  element: <StageDetailsPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}