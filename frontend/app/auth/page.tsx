import { Separator } from "@/components/ui/separator";
import { LoginForm } from "./_components/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 bg-gray-100 p-4">
      <div className="flex w-full max-w-md flex-col gap-7">
        <h2 className="scroll-m-20 text-balance text-3xl font-extrabold tracking-tight text-gray-900">
          Welcome to <span className="text-brand-primary">Crafty Future</span>
        </h2>
        <LoginForm />
        <Separator className="mt-5" />
        <div className="flex items-center justify-center">
          <p>{"Don't"} have an account ?</p>
          <Button
            type="button"
            className="text-brand-primary"
            asChild
            variant={"link"}
          >
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
