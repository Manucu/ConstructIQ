import { Link } from "react-router-dom";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Login to access your construction dashboard."
    >
      <AuthCard>
        <form className="space-y-5">
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
            Login
          </Button>

          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-700">
              Create one
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}