export type LoginResponse = {
  token_type: string;
  access_token: string;
};

export enum OtpType {
  REGISTRATION = "REGISTRATION",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
}
