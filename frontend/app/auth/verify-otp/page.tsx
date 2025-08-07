"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { VerifyOtpForm } from "./_components/verify-otp-form";
import { OtpType } from "@/apis/auth";
import { DefaultErrorPage } from "@/components/default-error-page";
import { ErrorBoundary } from "react-error-boundary";

import { BackButton } from "@/components/back-button";
import { UserRole } from "@/apis/users";
import { useAuth } from "@/hooks/use-auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") as string;
  const typeParam = searchParams.get("type") as unknown as OtpType;
  const role = searchParams.get("role");

  const { isAuthenticated, user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === UserRole.USER) {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    }
  }, []);

  return (
    <ScrollArea className="flex h-full w-full flex-col gap-10 scroll-auto p-4">
      <div className="flex w-full flex-col gap-7">
        <BackButton
          className="w-fit"
          href={
            typeParam === OtpType.FORGOT_PASSWORD
              ? "/auth/forgot-password"
              : role === UserRole.VENDOR
                ? "/auth/register/vendor"
                : "/auth/register"
          }
        />
        <div className="flex h-full w-full flex-col justify-center gap-4 bg-white p-4">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-foreground">
              Verify your OTP
            </h2>
            <p className="mt-2 text-muted-foreground">
              Enter verification code sent on{" "}
              <span className="text-foreground">{emailParam}</span>
            </p>
          </div>

          <ErrorBoundary resetKeys={[]} FallbackComponent={DefaultErrorPage}>
            <VerifyOtpForm email={emailParam} type={typeParam} />
          </ErrorBoundary>
        </div>
      </div>
    </ScrollArea>
  );
}
