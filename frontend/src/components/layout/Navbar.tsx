import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          ConstructIQ
        </Link>

        <nav className="hidden gap-8 md:flex">

          <a href="#features" className="text-slate-600 hover:text-blue-900">
            Features
          </a>

          <a href="#pricing" className="text-slate-600 hover:text-blue-900">
            Pricing
          </a>

          <a href="#contact" className="text-slate-600 hover:text-blue-900">
            Contact
          </a>

        </nav>

        <div className="flex gap-4">

          <button className="rounded-lg px-4 py-2 hover:bg-slate-100">
            Login
          </button>

          <button className="rounded-lg bg-blue-900 px-5 py-2 font-semibold text-white">
            Get Started
          </button>

        </div>

      </div>
    </header>
  );
}