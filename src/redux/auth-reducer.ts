import { Dispatch } from 'redux';
import AuthController from '../api/auth/auth-controller';
import { UserData } from '../api/auth/auth-types';
import { AxiosResponse } from 'axios';

const initialState: UserData = {
  email: '',
  password: '',
  avatar: null,
  coins: 0,
  achievements: [],
  exp: 0,
  level: 1,
  isAuth: false,
};

interface Action {
  type: string;
  value: UserData;
}

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'REGISTER-USER':
      return {
        ...state,
        ...action.value,
        isAuth: true,
      };
    case 'LOGIN-USER':
      return {
        ...state,
        ...action.value,
      };
  }
};

export const registerUserAction = (
  response: AxiosResponse<any, any> | undefined,
) => ({
  type: 'REGISTER-USER',
  value: response,
});

export const loginUserAction = (
  response: AxiosResponse<any, any> | undefined,
) => ({
  type: 'LOGIN-USER',
  value: response,
});

export const registerUserThunk = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    AuthController.createNewUser(email, password).then(response => {
      dispatch(registerUserAction(response));
    });
  };
};

export const loginUserThunk = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    AuthController.isAuthUser(email, password).then(response => {
      dispatch(loginUserAction(response));
    });
  };
};

export default authReducer;
