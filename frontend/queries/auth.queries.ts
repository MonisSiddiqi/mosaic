import {
  createPasswordApi,
  forgotPasswordApi,
  registerApi,
  resendOtpApi,
  vendorRegisterApi,
  verifyOtpApi,
} from "@/apis/auth";
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

export const useVendorRegisterMutation = () => {
  return useMutation({
    mutationKey: ["vendorRegister"],
    mutationFn: vendorRegisterApi,
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationKey: ["verifyOtp"],
    mutationFn: verifyOtpApi,
  });
};

export const useResendOtpMutation = () => {
  return useMutation({
    mutationKey: ["resendOtp"],
    mutationFn: resendOtpApi,
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: forgotPasswordApi,
  });
};

export const useCreatePasswordMutation = () => {
  return useMutation({
    mutationKey: ["createPassword"],
    mutationFn: createPasswordApi,
  });
};
