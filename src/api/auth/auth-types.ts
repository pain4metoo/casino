export interface UserData {
  email: string;
  password: string;
  login: string;
  avatar: null;
  coins: number;
  achievements: Array<string>;
  exp: number;
  level: number;
  isAuth: boolean;
  id: null | string;
}

export interface UserResponse {
  accessToken: string;
  user: UserData;
}
