import { apiEndpoints } from "@/api/api-endpoints";
import httpClient from "@/api";
import { User } from "@/api/users";

export const getMyProfileApi = async (): Promise<User> => {
  const response = await httpClient.get(apiEndpoints.users.me);
  return response.data.result;
};
