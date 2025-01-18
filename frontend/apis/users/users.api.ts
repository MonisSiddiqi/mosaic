import { apiEndpoints } from "@/apis/api-endpoints";
import httpClient from "@/apis";
import { GetAllUsersApiResponse, GetUsersDto, User } from "@/apis/users";

export const getMyProfileApi = async (): Promise<User> => {
  const response = await httpClient.get(apiEndpoints.users.me);
  return response.data.result;
};

export const getAllUsersApi = async ({
  page,
  filter,
  limit,
  sortField,
  sortValue,
}: GetUsersDto): Promise<GetAllUsersApiResponse> => {
  const response = await httpClient.get(apiEndpoints.users.getAll, {
    params: {
      page,
      filter,
      limit,
      sortField,
      sortValue,
    },
  });
  return response.data.result;
};
