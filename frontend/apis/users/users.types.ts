import { Address } from "@/apis/addresses";

export type LoginResponse = {
  token_type: string;
  access_token: string;
};

export type User = {
  id: string;
  email: string;
  isEmailVerified: boolean;
  phone: string | null;
  isPhoneVerified: boolean;
  isActive: boolean;
  role: UserRole;
  sameAsAddress: boolean;
  serviceDistance: number;
  updatedAt: string;
  createdAt: string;
};

export type UserProfile = {
  id: string;
  userId: string;
  name: string;
  image: string | null;
  updatedAt: string;
  createdAt: string;
};

export type ProfileApiResponse = User & {
  UserProfile: UserProfile | null;
  Address: Address | null;
};

export type GetAllUsersApiResponseItem = User & {
  UserProfile: UserProfile | null;
};

export type GetAllUsersApiResponse = {
  total: number;
  list: GetAllUsersApiResponseItem[];
};

export type AuthUser = User;

export enum UserRole {
  USER = "USER",
  VENDOR = "VENDOR",
  ADMIN = "ADMIN",
}

export type EditProfileApiResponse = ProfileApiResponse;

export type LoginHistory = {
  id: string;
  userId: string;
  status: boolean;
  message: string | null;
  updatedAt: string;
  createdAt: string;
};

export type GetLoginHistoryApiResponseItem = LoginHistory & {
  user: User & { UserProfile: UserProfile };
};

export type GetUserApiResponse = User & {
  UserProfile: UserProfile | null;
} & { LoginHistory: LoginHistory[] } & { Address: Address | null };

export type GetLoginHistoryApiResponse = {
  total: number;
  list: GetLoginHistoryApiResponseItem[];
};

export const roleOptions = [
  { value: UserRole.USER, label: "User" },
  { value: UserRole.VENDOR, label: "Vendor" },
  { value: UserRole.ADMIN, label: "Admin" },
];

export const activeOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "IN_ACTIVE", label: "In Active" },
];
