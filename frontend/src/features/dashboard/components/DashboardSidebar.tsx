import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  FileText,
  BarChart3,
  Settings,
  Building2,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { Logo } from "@/components/common/Logo";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Templates",
    href: "/templates",
    icon: ClipboardList,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Company",
    href: "/company",
    icon: Building2,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-200 p-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
                  isActive
                    ? "bg-blue-700 text-white"
                    : "text-slate-600 hover:bg-slate-100",
                ].join(" ")
              }
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-6">
        <div className="rounded-2xl bg-blue-700 p-5 text-white">
          <p className="text-sm text-blue-100">Business Health</p>

          <p className="mt-2 text-4xl font-bold">91</p>

          <p className="mt-3 text-sm text-blue-100">
            Your company is performing very well.
          </p>
        </div>
      </div>
    </aside>
  );
}