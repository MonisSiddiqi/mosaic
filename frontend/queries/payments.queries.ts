import {
  createStripeCheckoutApi,
  getAllPlansApi,
} from "@/apis/payments/payments.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAllPlansQuery = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getAllPlansApi,
  });
};

export const useCreateStripeCheckout = () => {
  return useMutation({
    mutationKey: ["createCheckout"],
    mutationFn: createStripeCheckoutApi,
  });
};
