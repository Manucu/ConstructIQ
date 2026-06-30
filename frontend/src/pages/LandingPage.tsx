import { PublicLayout } from "@/components/layout/PublicLayout";

import { Hero } from "@/features/landing/sections/Hero";
import { Features } from "@/features/landing/sections/Features";
import { VideoDemo } from "@/features/landing/sections/VideoDemo";

// import { DashboardPreview } from "@/features/landing/sections/DashboardPreview";

export function LandingPage() {
  return (
    <PublicLayout>
      <Hero />
      <Features />
      <VideoDemo />
    </PublicLayout>
  );
}