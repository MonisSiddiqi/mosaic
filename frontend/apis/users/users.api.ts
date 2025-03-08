import { apiEndpoints } from "@/apis/api-endpoints";
import httpClient from "@/apis";
import {
  Address,
  CreateAddressDto,
  EditProfileApiResponse,
  EditProfileDto,
  GetAllUsersApiResponse,
  GetUsersDto,
  ProfileApiResponse,
  User,
} from "@/apis/users";
import { headers } from "next/headers";

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

export const editProfileApi = async (
  values: EditProfileDto,
): Promise<EditProfileApiResponse> => {
  console.log(values);

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
