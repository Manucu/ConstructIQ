import {
  BarChart3,
  Building2,
  ClipboardCheck,
  FileText,
  Users,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

const features = [
  {
    icon: Building2,
    title: "Smart Project Templates",
    description:
      "Create construction projects faster using reusable templates for houses, villas, commercial buildings and custom workflows.",
  },
  {
    icon: FileText,
    title: "Digital Site Diary",
    description:
      "Track daily activities, workforce, materials, weather, problems and progress directly from the construction site.",
  },
  {
    icon: Wallet,
    title: "Cost Tracking",
    description:
      "Monitor budgets, expenses and change costs in real time to keep every project financially under control.",
  },
  {
    icon: BarChart3,
    title: "Business Health",
    description:
      "Understand if the company is growing through indicators based on profitability, productivity and project performance.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Checklists",
    description:
      "Use stage-based checklists to reduce errors and standardize the execution process across different project types.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Connect owners, project managers, site engineers and clients in a single platform with shared project visibility.",
  },
];

export function Features() {
  return (
    <Section id="features" className="bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            Features
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Everything construction teams need in one platform
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            ConstructIQ combines project management, construction knowledge and
            business analytics into a single reusable SaaS platform.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-950">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}