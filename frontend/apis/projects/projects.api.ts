import { apiEndpoints } from "@/apis/api-endpoints";
import httpClient from "@/apis";
import {
  GetProjectsDto,
  AddProjectDto,
  GetAllProjectsApiResponse,
  Project,
  GetProjectApiResponse,
} from "@/apis/projects";

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

export const addProjectApi = async (
  values: AddProjectDto,
): Promise<Project> => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value && typeof value !== "object") {
      formData.append(key, value as string);
    }
  });

  if (values.tags && values.tags.length > 0) {
    values.tags.forEach((tag) => formData.append("tags[]", tag));
  }

  if (values.files && values.files.length > 0) {
    values.files.forEach((file) => formData.append("files", file));
  }

  if (values.sampleFiles && values.sampleFiles.length > 0) {
    values.sampleFiles.forEach((file) => formData.append("sampleFiles", file));
  }

  const response = await httpClient.post(apiEndpoints.projects.add, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.result;
};

export const getProjectApi = async (
  id: string,
): Promise<GetProjectApiResponse> => {
  const response = await httpClient.get(apiEndpoints.projects.get(id));

  return response.data.result;
};

export const toggleUserActiveApi = async (userId: string): Promise<void> => {
  const response = await httpClient.patch(
    apiEndpoints.users.toggleActive(userId),
  );
  return response.data.result;
};
