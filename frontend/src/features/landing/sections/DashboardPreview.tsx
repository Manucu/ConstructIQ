import { BarChart3, CircleDollarSign, TrendingUp } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { SectionTitle } from "@/components/common/SectionTitle";
import { MetricCard } from "@/components/common/MetricCard";
import { ProgressCard } from "@/components/common/ProgressCard";
import { DashboardCard } from "@/components/common/DashboardCard";

export function DashboardPreview() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <SectionTitle
          label="Dashboard Preview"
          title="Know what happens in your company before problems become expensive"
          description="ConstructIQ gives owners and managers a clear view of projects, budget usage, profitability and business health."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          <MetricCard
            label="Active Projects"
            value="12"
            description="8 residential, 4 commercial"
          />

          <MetricCard
            label="Business Health"
            value="91%"
            description="Strong financial performance"
          />

          <MetricCard
            label="Estimated Profit"
            value="€53.2k"
            description="+12% compared to last month"
          />

          <MetricCard
            label="Today Updates"
            value="18"
            description="From 6 active sites"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashboardCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Project Performance
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-950">
                    Construction portfolio overview
                  </h3>
                </div>

                <BarChart3 className="h-8 w-8 text-blue-700" />
              </div>

              <div className="mt-8 space-y-5">
                {[
                  ["Casa P+1 Cluj", "76%"],
                  ["Duplex Residence", "54%"],
                  ["Commercial Hall", "89%"],
                  ["Villa Project", "41%"],
                ].map(([name, value]) => (
                  <div key={name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{name}</span>
                      <span className="font-semibold text-slate-950">
                        {value}
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-blue-700"
                        style={{ width: value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>

          <div className="space-y-6">
            <ProgressCard
              title="Budget Used"
              value={74}
              description="€186k spent from €250k"
            />

            <DashboardCard className="bg-blue-950 text-white">
              <div className="flex items-center gap-3">
                <CircleDollarSign className="h-8 w-8 text-blue-300" />
                <div>
                  <p className="text-sm text-blue-100">Cost Control</p>
                  <p className="text-2xl font-bold">Under control</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-blue-100">
                Current spending trend indicates the project portfolio remains
                inside the planned monthly budget.
              </p>
            </DashboardCard>

            <DashboardCard>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-slate-500">Growth Signal</p>
                  <p className="text-2xl font-bold text-slate-950">Positive</p>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </Container>
    </Section>
  );
}