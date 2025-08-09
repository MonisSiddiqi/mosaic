import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CancelContent() {
  return (
    <div className="flex min-h-screen justify-center rounded border border-red-100 bg-gradient-to-br from-red-50 to-rose-100 p-4 py-10">
      <Card className="h-fit w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-800">
            Payment Failed
          </CardTitle>
          <CardDescription className="text-red-600">
            Your subscription was not activated
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="mb-4 text-sm text-gray-600">
              {
                "Don't worry! No charges were made to your account. You can try again anytime or contact support if you need assistance."
              }
            </p>
          </div>

          <div className="space-y-3">
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/membership">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
