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

export type AuthUser = User;

export enum UserRoleEnum {
  USER = "USER",
  VENDOR = "VENDOR",
  ADMIN = "ADMIN",
}
