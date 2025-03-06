export type LoginResponse = {
  token_type: string;
  access_token: string;
};

export type User = {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  updatedAt: string;
  createdAt: string;
  UserProfile: UserProfile;
};

export type UserProfile = {
  id: string;
  userId: string;
  name: string;
  image: string | null;
  updatedAt: string;
  createdAt: string;
};

export type Address = {
  id: string;
  userId: string;
  line1: string;
  line2: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
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
