import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { VendorRegisterForm } from "../_components/vendor-register-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AuthPage() {
  return (
    <ScrollArea className="flex h-screen w-full flex-col items-center justify-center gap-10 p-4">
      <div className="flex w-full flex-col gap-4">
        <h2 className="scroll-m-20 text-balance text-3xl font-extrabold tracking-tight text-gray-900">
          Register yourself as <span className="text-brand-gold">Vendor</span>
        </h2>

        <VendorRegisterForm />
        <Separator />

        <div className="mb-20 flex w-full items-center justify-center">
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
