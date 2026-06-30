import { PublicLayout } from "@/components/layout/PublicLayout";
import { Hero } from "@/features/landing/sections/Hero";
import { Features } from "@/features/landing/sections/Features";

export function LandingPage() {
  return (
    <PublicLayout>
      <Hero />
      <Features />
    </PublicLayout>
  );
}