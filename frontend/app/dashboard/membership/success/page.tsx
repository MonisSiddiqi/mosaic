"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUpdateSessionMutation } from "@/queries/payments.queries";
import { toast } from "@/hooks/use-toast";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const planName = searchParams.get("plan");
  const sessionId = searchParams.get("session_id");

  const mutation = useUpdateSessionMutation();

  useEffect(() => {
    const updateSession = async (sessionId: string) => {
      try {
        await mutation.mutateAsync(sessionId);
        toast({
          title: "Subscription Activated",
          variant: "success",
        });
      } catch (error) {
        toast({
          title:
            error instanceof Error
              ? error.message
              : "Failed to activate subscription",
          variant: "destructive",
        });
      }
    };

    if (sessionId) {
      updateSession(sessionId);
    }
  }, []);

  return (
    <div className="flex min-h-screen justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4 py-10">
      <Card className="h-fit w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Welcome to {planName || "Crafty Future"}!
          </CardTitle>
          <CardDescription className="text-green-600">
            Your subscription is now active
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Button variant={"outline"} asChild className="w-full">
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {sessionId && (
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-xs text-gray-500">Session ID: {sessionId}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
