import { PublicLayout } from "@/components/layout/PublicLayout";
import { Hero } from "@/features/landing/sections/Hero";
import { Features } from "@/features/landing/sections/Features";
import { DashboardPreview } from "@/features/landing/sections/DashboardPreview";

export function LandingPage() {
  return (
    <PublicLayout>
      <Hero />
      <Features />
      <DashboardPreview />
    </PublicLayout>
  );
}