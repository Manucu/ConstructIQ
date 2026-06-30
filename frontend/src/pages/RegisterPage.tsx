import { Link } from "react-router-dom";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { Button } from "@/components/ui/button";

export function RegisterPage() {
  return (
    <AuthLayout
      title="Create your company"
      description="Start managing your construction projects with ConstructIQ."
    >
      <AuthCard>
        <form className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Company Name
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
              placeholder="ConstructIQ SRL"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Owner Name
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
              placeholder="Emanuel Niculai"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
              placeholder="emanuel@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
              placeholder="••••••••"
            />
          </div>

          <Button className="w-full" size="lg">
            Create Account
          </Button>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-700">
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}