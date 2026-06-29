export function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
          ConstructIQ
        </p>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-950 md:text-7xl">
          Building Intelligence into Every Project
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          A modern SaaS platform for construction project management,
          site diaries, smart templates, cost tracking and analytics.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-900/20">
            Start Free Trial
          </button>

          <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900">
            Login
          </button>
        </div>
      </section>
    </main>
  )
}