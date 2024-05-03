export interface UserData {
  email: string;
  password: string;
  login: string;
  avatar: null;
  balance: number;
  achievements: Array<string>;
  exp: number;
  level: number;
  isAuth: boolean;
  id: null | string;
}

type AuthWarnings = {
  errorTextLogin: string;
  errorTextRegister: string;
  isShowModalError: boolean;
};

export type AuthData = {
  user: UserData;
  authWarnings: AuthWarnings;
};

export interface UserResponse {
  accessToken: string;
  user: UserData;
}
