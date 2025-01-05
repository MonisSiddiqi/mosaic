import {
  AddServiceDto,
  GetAllServicesApiResponse,
  ServicesListDto,
} from "@/api/services";
import { apiEndpoints } from "@/api/api-endpoints";
import httpClient from "@/api";

export const getAllServicesApi = async ({
  page,
  filter,
  limit,
  sortField,
  sortValue,
}: ServicesListDto): Promise<GetAllServicesApiResponse> => {
  const response = await httpClient.get(apiEndpoints.services.getAll, {
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

export const deleteServiceApi = async (id: string) => {
  const response = await httpClient.delete(apiEndpoints.services.delete(id));

  return response.data.result;
};

export const addServiceApi = async (values: AddServiceDto) => {
  const body = {
    title: values.title,
    icon: values.icon,
    description: values.description,
  };
  const response = await httpClient.post(apiEndpoints.services.add, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.result;
};
