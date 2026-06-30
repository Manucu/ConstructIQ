import { Link } from "react-router-dom";
import { Building2, Lock, Mail, User } from "lucide-react";

import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";

export function RegisterPage() {
  return (
    <AuthLayout
      title="Create your company"
      description="Start managing your construction projects with ConstructIQ."
    >
      <AuthCard>
        <form className="space-y-6">
          <AppInput
            label="Company Name"
            icon={Building2}
            placeholder="ConstructIQ SRL"
          />

          <AppInput
            label="Owner Name"
            icon={User}
            placeholder="Emanuel Niculai"
          />

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

          <AppButton className="w-full" size="lg">
            Create Account
          </AppButton>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-sm text-slate-500">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <AppButton
            variant="outline"
            className="w-full"
            type="button"
          >
            Continue with Google
          </AppButton>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-700 hover:text-blue-800"
            >
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}