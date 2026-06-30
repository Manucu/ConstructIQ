import { CheckCircle2, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

const demoItems = [
  "Dashboard overview",
  "Project management",
  "Site diary and photos",
  "Budget tracking",
  "Reports and analytics",
];

export function VideoDemo() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
              See ConstructIQ in action
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              A quick tour of what happens after login
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Watch how owners and site managers can access projects, budgets,
              photos, daily reports and business insights from one place.
            </p>

            <div className="mt-8 space-y-3">
              {demoItems.map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-700" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="mt-10">
              Watch demo
              <PlayCircle className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-blue-900/10">
            <div className="relative overflow-hidden rounded-2xl bg-slate-950">
              <div className="aspect-video flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-blue-700 shadow-xl">
                  <PlayCircle className="h-10 w-10" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <p className="font-semibold">ConstructIQ Platform Demo</p>
                <p className="text-sm text-white/70">
                  90-second product overview
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}