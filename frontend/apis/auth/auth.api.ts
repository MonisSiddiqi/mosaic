import {
  CreatePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  LoginResponse,
  RegisterDto,
  ResendOtpDto,
  VendorRegisterDto,
  VerifyOtpDto,
} from "@/apis/auth";
import { apiEndpoints } from "@/apis/api-endpoints";
import httpClient from "..";

export const loginApi = async (values: LoginDto): Promise<LoginResponse> => {
  const response = await httpClient.post(apiEndpoints.auth.login, {
    email: values.email,
    password: values.password,
  });

  return response.data.result;
};

export const logoutApi = async (): Promise<boolean> => {
  const response = await httpClient.delete(apiEndpoints.auth.logout);
  return response.data.result;
};

export const checkSessionApi = async (): Promise<boolean> => {
  const response = await httpClient.post(apiEndpoints.auth.check);

  return response.data.result;
};

export const registerApi = async (values: RegisterDto): Promise<null> => {
  const response = await httpClient.post(apiEndpoints.auth.register, values);

  return response.data.result;
};

export const vendorRegisterApi = async (
  values: VendorRegisterDto,
): Promise<null> => {
  const response = await httpClient.post(
    apiEndpoints.auth.vendorRegister,
    values,
  );

  return response.data.result;
};

export const verifyOtpApi = async (values: VerifyOtpDto): Promise<null> => {
  const response = await httpClient.post(apiEndpoints.auth.verifyOtp, values);

  return response.data.result;
};

export const resendOtpApi = async (payload: ResendOtpDto): Promise<null> => {
  const response = await httpClient.patch(apiEndpoints.auth.resendOtp, payload);

  return response.data.result;
};

export const forgotPasswordApi = async (
  payload: ForgotPasswordDto,
): Promise<null> => {
  const response = await httpClient.post(
    apiEndpoints.auth.forgotPasssword,
    payload,
  );

  return response.data.result;
};

export const createPasswordApi = async (
  payload: CreatePasswordDto,
): Promise<null> => {
  const response = await httpClient.post(
    apiEndpoints.auth.createPassword,
    payload,
  );

  return response.data.result;
};
