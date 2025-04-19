import { getAddresses } from "@/apis/addresses";
import { useQuery } from "@tanstack/react-query";

export const useAddressesQuery = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: () => getAddresses(),
  });
};
