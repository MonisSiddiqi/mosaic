import { Button } from "@/components/ui/button";
import { RegisterForm } from "./_components/register-form";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function AuthPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 bg-gray-100 p-4">
      <div className="flex w-full max-w-md flex-col gap-7">
        <div>
          <p className="text-4xl font-bold">
            Mosaic <span className="text-base text-blue-500">Georgia</span>{" "}
          </p>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Register yourself with us
          </h2>
        </div>
        <RegisterForm />
        <Separator />
        <div className="flex items-center justify-center">
          <p>Already have an account ?</p>
          <Button
            type="button"
            className="text-brand-primary"
            asChild
            variant={"link"}
          >
            <Link href="/auth/"> Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
