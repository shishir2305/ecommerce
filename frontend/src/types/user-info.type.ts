export interface IUserInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface IAuthResponse {
  user: IUserInfo;
  accessToken: string;
}
