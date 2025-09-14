import httpClient from "@/apis";
import { apiEndpoints } from "@/apis/api-endpoints";
import {
  AssignBidDto,
  BidActionDto,
  GetAllBidsDto,
  GetAllBidsApiResponse,
  GetBidsStatisticsApiResponse,
  Bid,
} from "@/apis/bids";

export const getAllBidsApi = async (
  getAllBidsDto: GetAllBidsDto,
): Promise<GetAllBidsApiResponse> => {
  const response = await httpClient.get(apiEndpoints.bids.getAll, {
    params: getAllBidsDto,
  });

  return response.data.result;
};

export const bidActionApi = async (
  bidActionDto: BidActionDto,
): Promise<string> => {
  const response = await httpClient.post(
    apiEndpoints.bids.action,
    bidActionDto,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.message;
};

export const getBidsStatisticsApi =
  async (): Promise<GetBidsStatisticsApiResponse> => {
    const response = await httpClient.get(apiEndpoints.bids.statistics);

    return response.data.result;
  };

export const assignBidApi = async (payload: AssignBidDto): Promise<Bid> => {
  const response = await httpClient.post(apiEndpoints.bids.assign, payload);

  return response.data.result;
};

export const martProjectAsCompleteApi = async (bidId: string) => {
  const response = await httpClient.patch(
    apiEndpoints.bids.markProjectAsComplete(bidId),
  );

  return response.data.result;
};
