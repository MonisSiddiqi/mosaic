import {
  AddServiceDto,
  AddVendorServiceApiResponse,
  EditServiceDto,
  GetAllServicesApiResponse,
  Service,
  ServicesListDto,
} from "@/apis/services";
import { apiEndpoints } from "@/apis/api-endpoints";
import httpClient from "@/apis";

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
    name: values.title,
    description: values.description,
    planId: values.planId,
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
  console.log("Hello 2");

  const body = {
    icon: values.icon,
    name: values.title,
    description: values.description,
    planId: values.planId,
  };

  try {
    const response = await httpClient.patch(
      apiEndpoints.services.edit(values.id),
      body,
    );

    console.log("hello 3");
    return response.data.result;
  } catch (error) {
    console.error("🔥 API error:", error);
    throw error;
  }
};

export const addVendorServiceApi = async (
  id: string,
): Promise<AddVendorServiceApiResponse> => {
  const response = await httpClient.post(
    apiEndpoints.services.addVendorService,
    { serviceId: id },
  );

  return response.data.result;
};
