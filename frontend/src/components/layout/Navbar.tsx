import { Link } from "react-router-dom";
import { Logo } from "@/components/common/Logo";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-700">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-700">
            Pricing
          </a>
          <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-blue-700">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden text-sm font-medium text-slate-700 hover:text-blue-700 sm:block">
            Login
          </Link>

          <Button asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}