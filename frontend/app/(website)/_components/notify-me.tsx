import { cn } from "@/lib/utils";
import { EmailCaptureForm } from "./email-capture.form";

export const NotifyMe = ({ calssName }: { calssName?: string }) => {
  return (
    <div className={cn("mx-auto max-w-md", calssName)}>
      <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
        <p className="mb-4 text-lg font-medium">
          Be the first to know when we launch. (launching soon!)
        </p>
        <EmailCaptureForm simplified={false} />
      </div>
    </div>
  );
};
