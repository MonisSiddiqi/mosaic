import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BackButton } from "@/components/back-button";
import { CreatePasswordForm } from "./_components/create-password-form";

export default function ForgotPasswordPage() {
  return (
    <ScrollArea className="flex h-screen w-full items-center justify-center gap-10 p-4">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <BackButton className="w-fit" href="/auth" />

        <h2 className="scroll-m-20 text-balance text-3xl font-extrabold tracking-tight text-gray-900">
          Forgot Password
        </h2>

        <CreatePasswordForm />
        <Separator />

        <div className="mb-20 flex w-full items-center justify-center">
          <p>Remembered your password ?</p>
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
