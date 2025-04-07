import { getDashboardDataApi } from "@/apis/dashboard/dashboard.api";
import { useQuery } from "@tanstack/react-query";

export const useDashboardQuery = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardDataApi(),
  });
};
