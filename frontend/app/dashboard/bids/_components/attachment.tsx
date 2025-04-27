import { Badge } from "@/components/ui/badge";
import { PaperclipIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  attachmentName: string;
  attachmentUrl: string;
};

export const Attachment: FC<Props> = ({ attachmentName }) => {
  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <PaperclipIcon className="h-3 w-3" />
      {attachmentName}
    </Badge>
  );
};
