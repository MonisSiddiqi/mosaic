import {
  addProjectApi,
  addProjectUpdateApi,
  deleteProjectApi,
  deleteProjectUpdateApi,
  getAllProjectsApi,
  getProjectApi,
  getProjectUpdatesApi,
  updateProjectUpdateApi,
} from "@/apis/projects/projects.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export const useProjectsQuery = (getProjectDto?: {
  sorting?: SortingState;
  pagination?: PaginationState;
  filter?: ColumnFiltersState;
}) => {
  const { sorting, pagination, filter } = getProjectDto || {};

  return useQuery({
    queryKey: ["projects", { sorting, pagination, filter }],
    queryFn: ({ queryKey }) => {
      const { sorting, pagination, filter } = queryKey[1] as {
        sorting: SortingState;
        pagination: PaginationState;
        filter: ColumnFiltersState;
      };

      let field;

      if (sorting) {
        [field] = sorting;
      }

      return getAllProjectsApi({
        sortField: field?.id,
        sortValue: field ? (field?.desc ? "desc" : "asc") : "desc",
        page: pagination?.pageIndex,
        limit: pagination?.pageSize,
        filter: filter,
      });
    },
  });
};

export const useAddProjectMutation = () => {
  return useMutation({
    mutationKey: ["addProject"],
    mutationFn: addProjectApi,
  });
};

export const useProjectQuery = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectApi(id),
  });
};

export const useDeletProjectMutation = () => {
  return useMutation({
    mutationKey: ["deleteProject"],
    mutationFn: deleteProjectApi,
  });
};

export const useAddProjectUpdateMutation = () => {
  return useMutation({
    mutationKey: ["addProjectUpdate"],
    mutationFn: addProjectUpdateApi,
  });
};

export const useGetProjectUpdatesQuery = (id: string) => {
  return useQuery({
    queryKey: ["getProjectUpdates", id],
    queryFn: () => getProjectUpdatesApi(id),
  });
};

export const useUpdateProjectUpdateMutation = () => {
  return useMutation({
    mutationKey: ["updateProjectUpdate"],
    mutationFn: updateProjectUpdateApi,
  });
};

export const useDeleteProjectUpdateMutation = () => {
  return useMutation({
    mutationKey: ["deleteProjectUpdate"],
    mutationFn: deleteProjectUpdateApi,
  });
};
