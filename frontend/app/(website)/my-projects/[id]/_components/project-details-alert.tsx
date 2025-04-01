import { ProjectStatusEnum } from "@/apis/projects";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getStatusConfig } from "@/lib/utils";
import { CheckCircleIcon, ClockIcon, HandshakeIcon } from "lucide-react";
import { ElementType, FC } from "react";

type Props = {
  status: ProjectStatusEnum;
};

export const ProjectDetailsAlert: FC<Props> = ({ status }) => {
  const statusConfig = getStatusConfig(status);

  const data: {
    status: ProjectStatusEnum;
    icon: ElementType;
    title: string;
    description: string;
  }[] = [
    {
      status: ProjectStatusEnum.IN_PROGRESS,
      icon: ClockIcon,
      title: "Searching Best Vendor for you.",
      description: `We are actively evaluating trusted vendors to match your project requirements. Sit back while we find the most suitable professionals based on your preferences, location, and project scope.`,
    },
    {
      status: ProjectStatusEnum.AWARDED,
      icon: HandshakeIcon,
      title: "You and the vendor have agreed on the proposal.",
      description: `A vendor has been successfully matched and has accepted your project. You're now ready to begin collaboration and move forward with the work.`,
    },
    {
      status: ProjectStatusEnum.COMPLETED,
      icon: CheckCircleIcon,
      title: "This project is completed.",
      description: `The project has been successfully completed. Thank you for using our platform. You can review the vendor, download final documents, or start a new project.`,
    },
  ];

  const alert = data.find((item) => item.status === status);

  const Icon = alert?.icon;

  return (
    <Alert className={`${statusConfig.className} w-full md:max-w-screen-md`}>
      {Icon && <Icon className={`h-4 w-4`} />}
      <AlertTitle>{alert?.title}</AlertTitle>
      <AlertDescription>{alert?.description}</AlertDescription>
    </Alert>
  );
};
