import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { VendorRegisterForm } from "../_components/vendor-register-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AuthPage() {
  return (
    <ScrollArea className="flex h-screen w-full flex-col items-center justify-center gap-10 p-4">
      <div className="flex w-full flex-col gap-7">
        <div>
          <p className="text-4xl font-bold">
            Crafty <span className="text-base text-blue-500">Future</span>{" "}
          </p>
          <h2 className="mt-6 text-xl font-extrabold text-gray-900">
            Register yourself as Vendor
          </h2>
        </div>
        <VendorRegisterForm />
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
