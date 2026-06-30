import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

export function Hero() {
  return (
    <Section className="overflow-hidden py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              Smart construction management platform
            </div>

            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Building Intelligence into Every Project
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              ConstructIQ helps construction companies manage projects, track costs,
              monitor progress and use smart templates for faster project setup.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                No credit card
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Fast setup
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Smart templates
              </div>
            </div>
          </div>

          <Card className="border-slate-200 bg-white shadow-2xl shadow-blue-900/10">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">ConstructIQ Dashboard</p>
                  <h3 className="text-xl font-bold text-slate-950">Project Overview</h3>
                </div>
                <Building2 className="h-8 w-8 text-blue-700" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Active Projects</p>
                  <p className="mt-2 text-3xl font-bold">12</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">ConstructIQ Index</p>
                  <p className="mt-2 text-3xl font-bold text-green-600">91</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Monthly Profit</p>
                  <p className="mt-2 text-3xl font-bold">€53k</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Updates Today</p>
                  <p className="mt-2 text-3xl font-bold">18</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-blue-950 p-5 text-white">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-blue-300" />
                  <div>
                    <p className="font-semibold">Business Health</p>
                    <p className="text-sm text-blue-100">
                      Projects are on track and profitability is increasing.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}