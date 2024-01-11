export interface UserData {
  email: string;
  password: string;
  avatar: null;
  coins: number;
  achievements: Array<string>;
  exp: number;
  level: number;
  isAuth: boolean;
}

export interface UserResponse {
  accessToken: string;
  user: UserData;
}
