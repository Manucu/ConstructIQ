import type { ReactNode } from "react";
import { Logo } from "@/components/common/Logo";
import authImage from "@/assets/images/auth-construction.jpg";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden lg:block">
          <img
            src={authImage}
            alt="Construction site"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-blue-950/60 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
            <div className="[&_a]:text-white">
              <Logo />
            </div>

            <div>
              <h1 className="max-w-xl text-5xl font-bold leading-tight">
                Construction management made intelligent.
              </h1>

              <p className="mt-6 max-w-lg text-lg text-blue-100">
                Track projects, budgets, photos, documents and business health
                from one modern platform.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950/80 p-6 backdrop-blur">
              <p className="font-semibold">Business Health</p>
              <p className="mt-2 text-sm text-blue-100">
                Monitor the overall health of your construction company in real
                time.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-3xl font-bold">91%</p>
                  <p className="text-sm text-blue-100">Company score</p>
                </div>

                <div>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-sm text-blue-100">Active projects</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <Logo />
            </div>

            <h2 className="text-3xl font-bold text-slate-950">{title}</h2>
            <p className="mt-2 text-slate-600">{description}</p>

            <div className="mt-8">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}