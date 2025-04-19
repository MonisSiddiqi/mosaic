import { getAllPlansApi } from "@/apis/payments/payments.api";
import { useQuery } from "@tanstack/react-query";

export const useAllPlansQuery = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getAllPlansApi,
  });
};
