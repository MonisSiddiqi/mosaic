import httpClient from "@/apis";
import {
  LoginDto,
  LoginResponse,
  RegisterDto,
  VerifyOtpDto,
} from "@/apis/auth";
import { apiEndpoints } from "@/apis/api-endpoints";

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

export const verifyOtpApi = async (values: VerifyOtpDto): Promise<null> => {
  const response = await httpClient.post(apiEndpoints.auth.verifyOtp, values);

  return response.data.result;
};
