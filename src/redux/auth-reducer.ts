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
  id: null,
};

interface Action {
  type: string;
  value: UserData;
}

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'REGISTER-USER':
      return {
        ...state,
        ...action.value.user,
        isAuth: true,
      };
    case 'LOGIN-USER':
      return {
        ...state,
        ...action.value.user,
        isAuth: true,
      };

    case 'SET-TOKEN':
      if (action.value) {
        localStorage.setItem('token', action.value.accessToken);
        localStorage.setItem('id', action.value.user.id);
        localStorage.setItem('email', action.value.user.email);
      }

      return {
        ...state,
        isAuth: true,
      };

    case 'SET-AUTH-ME':
      return {
        ...state,
        ...action.value,
        isAuth: true,
      };

    case 'EXIT-FROM-PROFILE':
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};

const registerUserAction = (response: AxiosResponse<any, any> | undefined) => ({
  type: 'REGISTER-USER',
  value: response,
});

const loginUserAction = (response: AxiosResponse<any, any> | undefined) => ({
  type: 'LOGIN-USER',
  value: response,
});

const setTokenAction = (response: string) => ({
  type: 'SET-TOKEN',
  value: response,
});

const setAuthMe = (response: any) => ({
  type: 'SET-AUTH-ME',
  value: response,
});

export const exitFromProfile = () => ({
  type: 'EXIT-FROM-PROFILE',
});

export const registerUserThunk = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    AuthController.createNewUser(email, password).then((response: any) => {
      if (response) {
        dispatch(registerUserAction(response.user));
        dispatch(setTokenAction(response));
      }
    });
  };
};

export const loginUserThunk = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    AuthController.isAuthUser(email, password).then(response => {
      if (response) {
        dispatch(loginUserAction(response));
        dispatch(setTokenAction(response));
      }
    });
  };
};

export const isAuthMeThunk = (email: string, id: string) => {
  return (dispatch: Dispatch) => {
    AuthController.isAuthMe(email, id).then(response => {
      if (response) {
        dispatch(setAuthMe(response));
      }
    });
  };
};

export default authReducer;
