"use client";

import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { toast } from "@/hooks/use-toast";
import { toggleUserActiveApi } from "@/apis/projects";

type Props = {
  isActive: boolean;
  userId: string;
};

const UserActiveSwitch: FC<Props> = ({ isActive, userId }) => {
  const clientQuery = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["toggle-active", userId],
    mutationFn: toggleUserActiveApi,
  });

  const handleClick = async () => {
    try {
      //TODO: Check request hanging
      await mutation.mutateAsync(userId);
      await clientQuery.invalidateQueries({ queryKey: ["users"] });

      toast({
        title: "Updated successfully",
        variant: "success",
      });
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: e.message,
      });
    }
  };

  return (
    <Switch
      checked={isActive}
      onCheckedChange={handleClick}
      disabled={mutation.isPending}
      className="disabled:cursor-wait"
    />
  );
};

export default UserActiveSwitch;
