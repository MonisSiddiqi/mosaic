import { Button } from "@/components/ui/button";
import { RegisterForm } from "./_components/register-form";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AuthPage() {
  return (
    <ScrollArea className="flex h-full w-full flex-col items-center justify-center gap-10 bg-gray-100 p-4">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <h2 className="mt-4 scroll-m-20 text-balance text-3xl font-extrabold tracking-tight text-gray-900 lg:text-nowrap">
          Register yourself as{" "}
          <span className="text-brand-primary">Home Owner</span>
        </h2>
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
    </ScrollArea>
  );
}
