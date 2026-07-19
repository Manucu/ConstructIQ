import { useState } from "react";

import {
  Boxes,
  ClipboardList,
  Package,
  Users,
} from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

import ActivityTemplates from "../components/activity-templates/ActivityTemplates";
import LabourTemplates from "../components/labour-templates/LabourTemplates";
import MaterialTemplates from "../components/materials-templates/MaterialTemplates";
import ProjectTemplates from "../components/project-templates/ProjectTemplates";

type TemplateSection =
  | "materials"
  | "labour"
  | "projects"
  | "activities";

type TemplateSectionDefinition = {
  id: TemplateSection;
  title: string;
  description: string;
  icon: typeof Package;
};

const templateSections: TemplateSectionDefinition[] = [
  {
    id: "materials",
    title: "Materials",
    description:
      "Manage reusable material definitions and default estimated unit costs.",
    icon: Package,
  },
  {
    id: "labour",
    title: "Labour",
    description:
      "Manage reusable labour roles and default estimated hourly rates.",
    icon: Users,
  },
  {
    id: "projects",
    title: "Project Templates",
    description:
      "Manage reusable project structures, stages, activities and resources.",
    icon: Boxes,
  },
  {
    id: "activities",
    title: "Activity Templates",
    description:
      "Manage reusable construction activities used inside project templates.",
    icon: ClipboardList,
  },
];

export default function TemplatesPage() {
  const [selectedSection, setSelectedSection] =
    useState<TemplateSection>("materials");

  const selectedSectionDefinition =
    templateSections.find(
      section => section.id === selectedSection
    ) ?? templateSections[0];

  function renderSelectedSection() {
    switch (selectedSection) {
      case "materials":
        return <MaterialTemplates />;

      case "labour":
        return <LabourTemplates />;

      case "projects":
        return <ProjectTemplates />;

      case "activities":
        return <ActivityTemplates />;

      default:
        return null;
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold">
            Templates
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create and manage reusable structures
            for future construction projects.
          </p>
        </header>

        <section
          aria-label="Template sections"
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {templateSections.map(section => {
            const Icon = section.icon;

            const isSelected =
              selectedSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  setSelectedSection(section.id)
                }
                className={[
                  "group rounded-2xl border p-5 text-left transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-card text-card-foreground hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={[
                      "flex h-11 w-11 items-center justify-center rounded-xl",
                      isSelected
                        ? "bg-primary-foreground/15"
                        : "bg-primary/10 text-primary",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span
                    className={[
                      "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
                      isSelected
                        ? "bg-primary-foreground/15 text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    ].join(" ")}
                  >
                    {isSelected
                      ? "Selected"
                      : "Open"}
                  </span>
                </div>

                <div className="mt-5">
                  <h2 className="text-lg font-semibold">
                    {section.title}
                  </h2>

                  <p
                    className={[
                      "mt-2 text-sm leading-6",
                      isSelected
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {section.description}
                  </p>
                </div>

                <div
                  className={[
                    "mt-5 text-sm font-medium",
                    isSelected
                      ? "text-primary-foreground"
                      : "text-primary",
                  ].join(" ")}
                >
                  {isSelected
                    ? "Currently viewing"
                    : `Open ${section.title}`}
                </div>
              </button>
            );
          })}
        </section>

        <section className="space-y-4">
          <div className="rounded-2xl border bg-muted/30 px-5 py-4">
            <h2 className="font-semibold">
              {selectedSectionDefinition.title}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {
                selectedSectionDefinition.description
              }
            </p>
          </div>

          {renderSelectedSection()}
        </section>
      </div>
    </DashboardLayout>
  );
}