import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";
import { FC } from "react";
import { Plan } from "@/apis/payments";

export const CurrentPlanNote: FC<Plan> = (plan) => {
  return (
    <div className="relative max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/10" />

      <div className="relative p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Crown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Current Plan
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {plan.name}
            </h3>
          </div>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Displaying services included in your current plan. Enable the ones you
          offer to receive relevant job bids.
        </p>

        <Button
          variant="outline"
          className="group w-full transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
          asChild
        >
          <Link
            href="/dashboard/membership"
            className="flex items-center justify-center gap-2"
          >
            View Plan Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
