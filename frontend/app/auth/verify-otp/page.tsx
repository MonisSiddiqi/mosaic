"use client";

import { useSearchParams } from "next/navigation";
import { VerifyOtpForm } from "./_components/verify-otp-form";
import { OtpType } from "@/apis/auth";
import { DefaultErrorPage } from "@/components/default-error-page";
import { ErrorBoundary } from "react-error-boundary";

import { BackButton } from "@/components/back-button";

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") as string;
  const typeParam = searchParams.get("type") as unknown as OtpType;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 bg-gray-100 p-4">
      <div className="flex w-full max-w-md flex-col gap-7">
        <BackButton
          className="w-fit"
          href={
            typeParam === OtpType.FORGOT_PASSWORD
              ? "/auth/forgot-password"
              : "/auth/register"
          }
        />
        <div>
          <p className="text-4xl font-bold">
            Mosaic <span className="text-base text-blue-500">Georgia</span>{" "}
          </p>
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
  );
}
