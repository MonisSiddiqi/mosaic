import { ServicesListItem } from "@/apis/services";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useAddVendorServiceMutation } from "@/queries/services.queries";
import { QueryClient } from "@tanstack/react-query";
import { CheckCircleIcon, Loader2Icon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

type Props = {
  service: ServicesListItem;
};
export const VendorServiceCard: FC<Props> = ({ service }) => {
  const [isProviding, setIsProviding] = useState(
    service.VendorService.length > 0,
  );

  const queryClient = new QueryClient();

  const addVendorServiceMutation = useAddVendorServiceMutation();

  const handleAddService = async (serviceId: string) => {
    try {
      await addVendorServiceMutation.mutateAsync(serviceId);
      await queryClient.invalidateQueries({
        queryKey: ["services"],
        exact: true,
      });
      setIsProviding((prev) => !prev);
      toast({
        title: "Service has been removed from your account.",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : "Failed to remove service.",
      });
    }
  };

  return (
    <Card
      key={service.id}
      className={`overflow-hidden ${isProviding ? "bg-primary/5" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-md">
            {service.iconUrl ? (
              <Image
                src={service.iconUrl || "/placeholder.svg"}
                alt={service.name}
                width={64}
                height={44}
                className="object-contain"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center bg-muted text-sm text-muted-foreground">
                No icon
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-xl">{service.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="min-h-[60px]">
          {service.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/20 pt-4">
        <div className="flex items-center justify-center">
          {isProviding ? (
            <CheckCircleIcon className="mr-2 h-5 w-5 text-green-500" />
          ) : (
            <XCircleIcon className="mr-2 h-5 w-5 text-muted-foreground" />
          )}
          <span
            className={
              isProviding
                ? "font-medium text-green-500"
                : "text-muted-foreground"
            }
          >
            {isProviding ? "Providing" : "Not providing"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {addVendorServiceMutation.isPending ? (
            <Loader2Icon className="size-5 animate-spin" />
          ) : (
            <Switch
              checked={isProviding}
              onCheckedChange={() => handleAddService(service.id)}
              aria-label={`Toggle ${service.name} service`}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
