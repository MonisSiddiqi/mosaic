import { registerApi, verifyOtpApi } from "@/apis/auth";
import { getMyProfileApi } from "@/apis/users";
import { useMutation } from "@tanstack/react-query";

export const useProfileMutation = () => {
  return useMutation({
    mutationKey: ["user", "getProfile"],
    mutationFn: getMyProfileApi,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: registerApi,
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationKey: ["auth", "verifyOtp"],
    mutationFn: verifyOtpApi,
  });
};
