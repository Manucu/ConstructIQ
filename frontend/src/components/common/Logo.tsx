import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="text-2xl font-bold tracking-tight text-slate-950">
      Construct<span className="text-blue-700">IQ</span>
    </Link>
  );
}