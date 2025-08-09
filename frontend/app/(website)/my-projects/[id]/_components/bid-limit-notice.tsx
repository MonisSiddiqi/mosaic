"use client";

import { AlertTriangle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { DeleteProjectAlert } from "@/app/dashboard/projects/_components/alerts/delete-project-alert";

export default function BidRejectionNotice({ id }: { id: string }) {
  return (
    <div className="max-w-3xl">
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Bid Rejection Limit Reached
          </CardTitle>
          <CardDescription className="text-gray-600">
            You have rejected 3 bids for this project
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertDescription className="text-gray-700">
              <strong>Important:</strong> You will not receive any more bids on
              this project. you need to review requirements and adjust your
              project details then you can resubmit a new project with the
              updated requirements and details.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Link href={"/my-projects/add"}>
                <Plus className="h-4 w-4" />
                Add New Project
              </Link>
            </Button>
            <DeleteProjectAlert text="Delete This Project" id={id} />
          </div>

          <p className="pt-2 text-center text-xs text-gray-500">
            Need help? Contact our support team for assistance with your project
            requirements.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
