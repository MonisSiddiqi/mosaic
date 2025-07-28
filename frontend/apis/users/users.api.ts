import { apiEndpoints } from "@/apis/api-endpoints";
import httpClient from "@/apis";
import {
  CreateAddressDto,
  EditProfileApiResponse,
  EditProfileDto,
  GetAllUsersApiResponse,
  GetLoginHistoryApiResponse,
  GetLoginHistoryDto,
  GetUserApiResponse,
  GetUsersDto,
  ProfileApiResponse,
  User,
} from "@/apis/users";
import { Address } from "../addresses";

export const getMyProfileApi = async (): Promise<ProfileApiResponse> => {
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

export const getUserApi = async (
  userId: string,
): Promise<GetUserApiResponse> => {
  const response = await httpClient.get(apiEndpoints.users.get(userId));

  return response.data.result;
};

export const editProfileApi = async (
  values: EditProfileDto,
): Promise<EditProfileApiResponse> => {
  const response = await httpClient.patch(
    apiEndpoints.users.editProfile,
    values,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response.data.result;
};

export const createAddressApi = async (
  createAddressDto: CreateAddressDto,
): Promise<Address> => {
  const response = await httpClient.post(
    apiEndpoints.users.createAddress,
    createAddressDto,
  );

  return response.data.result;
};

export const getLoginHistoryApi = async (
  getLoginHistoryDto: GetLoginHistoryDto,
): Promise<GetLoginHistoryApiResponse> => {
  const response = await httpClient.get(apiEndpoints.users.loginHistory, {
    params: getLoginHistoryDto,
  });
  return response.data.result;
};
