"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useCurrentPlanQuery } from "@/queries/payments.queries";
import { useAuth } from "@/hooks/use-auth";

export function ExpiredPlanNotice() {
  const { data, isLoading } = useCurrentPlanQuery();

  const { user } = useAuth();

  if (isLoading) {
    return null;
  }

  if (data?.Plan) {
    return null;
  }

  return (
    <Card className="mt-6 border-orange-200 bg-orange-50">
      <CardContent className="flex flex-col items-center justify-between gap-4 p-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-orange-500" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              You don&apos;t have any active plan
            </h3>
            <p className="text-sm text-gray-600">
              You will not receive new bids until you have active plan.
            </p>
          </div>
        </div>
        <Button
          asChild
          className="whitespace-nowrap bg-orange-600 hover:bg-orange-700"
        >
          <Link href="/dashboard/membership">Upgrade Plan</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
