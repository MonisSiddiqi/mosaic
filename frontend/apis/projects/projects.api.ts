import { apiEndpoints } from "@/apis/api-endpoints";
import httpClient from "@/apis";
import { GetProjectsDto } from "./projects.dto";
import { GetAllProjectsApiResponse } from "./projects.type";

export const getAllProjectsApi = async ({
  page,
  filter,
  limit,
  sortField,
  sortValue,
}: GetProjectsDto): Promise<GetAllProjectsApiResponse> => {
  const response = await httpClient.get(apiEndpoints.projects.getAll, {
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
