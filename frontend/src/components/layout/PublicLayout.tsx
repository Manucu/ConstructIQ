import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      {children}
    </div>
  );
}