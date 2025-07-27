import httpClient from "..";
import { apiEndpoints } from "../api-endpoints";

type SingupItem = {
  total: number;
  homeowners: number;
  vendors: number;
};

type GetDashboardDataApiResponse = {
  homeOwners: number;
  vendors: number;
  projects: number;
  openBids: number;
  signups: {
    today: SingupItem;
    thisWeek: SingupItem;
    thisMonth: SingupItem;
  };
  subscriptions: {
    total: number;
    active: number;
    expired: number;
  };
  signupTrend: {
    year: number;
    data: {
      month: string;
      signups: number;
    }[];
  };
};

export const getDashboardDataApi =
  async (): Promise<GetDashboardDataApiResponse> => {
    const response = await httpClient.get(apiEndpoints.dashboard.getData);

    return response.data.result;
  };
