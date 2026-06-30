import { Navbar } from "../components/layout/Navbar";

export function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <h1 className="text-5xl font-bold">
          Landing Page
        </h1>
      </main>
    </>
  );
}