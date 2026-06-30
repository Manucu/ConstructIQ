import { Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";

export function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Login to access your construction dashboard."
    >
      <AuthCard>
        <form className="space-y-6">
          <AppInput
            label="Email"
            type="email"
            icon={Mail}
            placeholder="emanuel@example.com"
          />

          <AppInput
            label="Password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="rounded border-slate-300" />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>

          <AppButton className="w-full" size="lg">
            Login
          </AppButton>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-sm text-slate-500">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <AppButton variant="outline" className="w-full" type="button">
            Continue with Google
          </AppButton>

          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-700 hover:text-blue-800"
            >
              Create one
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}