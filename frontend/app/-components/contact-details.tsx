import { MailIcon, PhoneIcon } from "lucide-react";
import { Copy } from "../(website)/_components/copy";
import { FC } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const ContactDetails: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-fit space-y-4 rounded-lg bg-white p-6 text-gray-700",
        className,
      )}
    >
      <div className="flex items-center gap-3 dark:text-gray-400">
        <MailIcon className="size-5" />
        <a href="mailto:info@craftyfuture.com">info@craftyfuture.com</a>
        <Copy textToCopy="info@craftyfuture.com" label="email" />
      </div>
      <div className="flex items-center gap-3 dark:text-gray-400">
        <PhoneIcon className="size-5" />
        <a href="tel:+15866656670">+1 586-665-6670</a>
        <Copy textToCopy="+1 586-665-6670" label="phone number" />
      </div>
    </div>
  );
};
