import { apiEndpoints } from "@/apis/api-endpoints";
import httpClient from "@/apis";
import { GetProjectsDto } from "./projects.dto";
import {
  AddProjectDto,
  GetAllProjectsApiResponse,
  Project,
} from "./projects.type";

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

  // Append all text fields
  Object.entries(values).forEach(([key, value]) => {
    if (value && typeof value !== "object") {
      formData.append(key, value as string);
    }
  });

  // ✅ Append tags[] correctly
  if (values.tags && values.tags.length > 0) {
    values.tags.forEach((tag) => formData.append("tags[]", tag));
  }

  // Append files
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
