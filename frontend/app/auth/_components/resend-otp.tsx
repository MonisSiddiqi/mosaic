"use client";

import { OtpType } from "@/apis/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useResendOtpMutation } from "@/queries/auth.queries";
import { FC, useEffect, useState } from "react";

type Props = {
  className?: string;
  email: string;
  type: OtpType;
  compact: boolean;
};

export const ResendOtp: FC<Props> = ({ className, email, type, compact }) => {
  const [timer, setTimer] = useState(60);

  const mutation = useResendOtpMutation();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    if (timer === 0 && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const handleResendOtp = async () => {
    try {
      await mutation.mutateAsync({ email, type });
      toast({
        title: "OTP has been resent to your email.",
        variant: "success",
      });
      setTimer(60);
    } catch (error) {
      toast({
        title:
          error instanceof Error
            ? error.message
            : "Failed to resend OTP. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {compact ? null : (
        <>
          {" "}
          <h1 className="mb-4 text-2xl font-bold">Resend OTP</h1>
          <p className="mb-6 text-gray-600">
            If you did not receive the OTP, click the button below to resend it.
          </p>
        </>
      )}

      <Button
        disabled={mutation.isPending || timer > 0}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={handleResendOtp}
        type="button"
        size={"lg"}
      >
        {mutation.isPending
          ? "Resending..."
          : `Resend OTP ${timer > 0 ? `(${timer})` : ""}`}
      </Button>
    </div>
  );
};
