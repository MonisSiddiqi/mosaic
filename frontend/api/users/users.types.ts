export type LoginResponse = {
  token_type: string;
  access_token: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRoleEnum;
  isActive: boolean;
  updatedAt: string;
  createdAt: string;
};

export type UserProfile = {
  id: string;
  userId: string;
  name: string;
  updatedAt: string;
  createdAt: string;
};

export type GetAllUsersApiResponseItem = User & {
  UserProfile: UserProfile | null;
};

export type GetAllUsersApiResponse = {
  total: number;
  list: GetAllUsersApiResponseItem[];
};

export type AuthUser = User;

export enum UserRoleEnum {
  USER = "USER",
  VENDOR = "VENDOR",
  ADMIN = "ADMIN",
}
