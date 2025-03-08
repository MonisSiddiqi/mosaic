import { apiEndpoints } from "@/apis/api-endpoints";
import httpClient from "@/apis";
import {
  AddVendorTagApiResponse,
  GetAllTagsApiResponse,
  Tag,
  AddTagDto,
  EditTagDto,
  TagsListDto,
} from "@/apis/tags";

export const getAllTagsApi = async ({
  page,
  filter,
  limit,
  sortField,
  sortValue,
}: TagsListDto): Promise<GetAllTagsApiResponse> => {
  const response = await httpClient.get(apiEndpoints.tags.getAll, {
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

export const deleteTagApi = async (id: string): Promise<Tag> => {
  const response = await httpClient.delete(apiEndpoints.tags.delete(id));

  return response.data.result;
};

export const addTagApi = async (values: AddTagDto): Promise<Tag> => {
  const response = await httpClient.post(apiEndpoints.tags.add, values);

  return response.data.result;
};

export const editTagApi = async (values: EditTagDto): Promise<Tag> => {
  const body = {
    name: values.name,
  };

  const response = await httpClient.patch(
    apiEndpoints.tags.edit(values.id),
    body,
  );

  return response.data.result;
};

export const addVendorTagApi = async (
  id: string,
): Promise<AddVendorTagApiResponse> => {
  const response = await httpClient.post(apiEndpoints.tags.addVendorTag, {
    tagId: id,
  });

  return response.data.result;
};
