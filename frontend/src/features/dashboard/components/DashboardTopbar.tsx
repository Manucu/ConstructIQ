import { Bell, Search, Settings } from "lucide-react";

export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-6 lg:px-10">
        <div>
          <p className="text-sm text-slate-500">Good morning,</p>
          <h1 className="text-2xl font-bold text-slate-950">
            Emanuel Niculai 👋
          </h1>
        </div>

        <div className="hidden w-full max-w-md items-center rounded-xl border border-slate-200 bg-slate-50 px-4 lg:flex">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            placeholder="Search projects, reports, documents..."
            className="w-full bg-transparent px-3 py-3 text-sm outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
            <Bell className="h-5 w-5" />
          </button>

          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
            <Settings className="h-5 w-5" />
          </button>

          <div className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 md:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
              EN
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-950">
                Emanuel Niculai
              </p>
              <p className="text-xs text-slate-500">Owner</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}