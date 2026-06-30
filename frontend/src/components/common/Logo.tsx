import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link
      to="/"
      className="text-2xl font-bold tracking-tight text-slate-900"
    >
      ConstructIQ
    </Link>
  );
}