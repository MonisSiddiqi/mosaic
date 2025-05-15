import {
  createAirtableRecordApi,
  getAirtableRecordsApi,
} from "@/apis/aittable";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateAirtableRecordMutation = () => {
  return useMutation({
    mutationKey: ["createAirtableRecord"],
    mutationFn: createAirtableRecordApi,
  });
};

export const useGetAirtableRecordsQuery = (email?: string) => {
  return useQuery({
    queryKey: ["createAirtableRecord", email],
    queryFn: () => getAirtableRecordsApi(email),
  });
};
