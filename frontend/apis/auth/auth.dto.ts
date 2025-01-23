export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  email: string;
  password: string;
  name: string;
};

export type VerifyOtpDto = {
  email: string;
  otp: string;
  type: OtpType;
};

export enum OtpType {
  REGISTRATION,
  FORGOT_PASSWORD,
}
