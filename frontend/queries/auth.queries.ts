import { registerApi, verifyOtpApi, VerifyOtpDto } from "@/apis/auth";
import { getMyProfileApi } from "@/apis/users";
import { useMutation } from "@tanstack/react-query";

export const useProfileMutation = () => {
  return useMutation({
    mutationKey: ["profile"],
    mutationFn: getMyProfileApi,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerApi,
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationKey: ["verifyOtp"],
    mutationFn: verifyOtpApi,
  });
};
