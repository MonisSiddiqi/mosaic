import { Project } from "@/apis/projects";
import { User, UserProfile } from "@/apis/users";

export type Bid = {
  id: string;
  projectId: string;
  vendorId: string;
  vendorStatus: BidStatus;
  userStatus: BidStatus;
  vendorMessage: string | null;
  vendorAttachmentName: string | null;
  vendorAttachmentUrl: string | null;
  updatedAt: string;
  createdAt: string;
};

export type GetAllBidsApiResponseItem = Bid & {
  project: Project & { user: User & { UserProfile: UserProfile } };
};

export type GetAllBidsApiResponse = {
  total: number;
  list: GetAllBidsApiResponseItem[];
};

export type GetBidsStatisticsApiResponse = {
  totolBids: number;
  pendingBids: number;
  acceptedBids: number;
  rejectedBids: number;
};

export enum BidStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}
