import { logoutApi } from "@/apis/auth";
import { API_URL } from "@/config";
import { toast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";

interface ErrorResponse {
  path: string;
  status: boolean;
  statusCode: number;
  message: string;
  error?: string;
}

const authRoutes = [
  "/api/v1/auth/login",
  "/api/v1/auth/check",
  "/api/v1/auth/logout",
];

const httpClient = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

httpClient.interceptors.request.use(
  (config) => {
    config.headers.set("Accept", "application/json");
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    if (error.code === "ERR_NETWORK") {
      throw new Error(
        "It looks like there is a problem with your network connection. Please check your internet connection and try again.",
      );
    }

    const response = error.response;

    if (
      response &&
      response.status === 401 &&
      !authRoutes.find((route) => route === error?.config?.url)
    ) {
      await logoutAndRedirect();
    }

    let message = response?.data?.error;

    if (!message && response?.data?.message) {
      message = response?.data?.message;
    }

    if (message) {
      return Promise.reject(new Error(message));
    }

    return Promise.reject(error);
  },
);

const logoutAndRedirect = async () => {
  try {
    await logoutApi();
    // window.location.replace("/auth");
  } catch (e) {
    if (e instanceof Error) {
      toast({
        variant: "destructive",
        title: e.message,
      });
    }
  }
};
export default httpClient;
