import {
  BarChart3,
  Building2,
  ClipboardCheck,
  FileText,
  Users,
  Wallet,
} from "lucide-react";

import { Container } from "@/components/common/Container";
import { FeatureCard } from "@/components/common/FeatureCard";
import { Section } from "@/components/common/Section";
import { SectionTitle } from "@/components/common/SectionTitle";

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
        <SectionTitle
          label="Features"
          title="Everything construction teams need in one platform"
          description="ConstructIQ combines project management, construction knowledge and business analytics into a single reusable SaaS platform."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}