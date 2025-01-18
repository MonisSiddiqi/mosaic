import { getMyProfileApi } from "@/apis/users";
import { useMutation } from "@tanstack/react-query";

export const useProfileMutation = () => {
  return useMutation({
    mutationKey: ["user", "getProfile"],
    mutationFn: getMyProfileApi,
  });
};
