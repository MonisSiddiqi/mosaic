import {
  AddServiceDto,
  EditServiceDto,
  GetAllServicesApiResponse,
  Service,
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

export const deleteServiceApi = async (id: string): Promise<Service> => {
  const response = await httpClient.delete(apiEndpoints.services.delete(id));

  return response.data.result;
};

export const addServiceApi = async (
  values: AddServiceDto,
): Promise<Service> => {
  const body = {
    icon: values.icon,
    title: values.title,
    description: values.description,
  };

  const response = await httpClient.post(apiEndpoints.services.add, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.result;
};

export const editServiceApi = async (
  values: EditServiceDto,
): Promise<Service> => {
  const body = {
    icon: values.icon,
    name: values.title,
    description: values.description,
  };

  const response = await httpClient.patch(
    apiEndpoints.services.edit(values.id),
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.result;
};
