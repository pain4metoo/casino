import { Dispatch } from 'redux';
import AuthController from '../api/auth/auth-controller';
import { UserData } from '../api/auth/auth-types';
import { AxiosResponse } from 'axios';

const initialState: UserData = {
  email: '',
  password: '',
  login: '',
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
        ...action.value,
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
      }

      return {
        state,
      };

    case 'SET-AUTH-ME':
      return {
        ...state,
        ...action.value,
        isAuth: true,
      };

    case 'SET-AUTH-ERROR-LOGIN':
      return {
        ...state,
        errorTextLogin: action.text,
      };

    case 'SET-AUTH-ERROR-REGISTER':
      return {
        ...state,
        errorTextRegister: action.text,
      };

    case 'EXIT-FROM-PROFILE':
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
      };

    case 'SHOW-MODAL-AUTH-ERROR':
      return {
        ...state,
        isShowModalError: action.flag,
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

const setAuthErrorRegister = (error: string) => ({
  type: 'SET-AUTH-ERROR-REGISTER',
  text: error,
});

const setAuthErrorLogin = (error: string) => ({
  type: 'SET-AUTH-ERROR-LOGIN',
  text: error,
});

export const setShowModalAuthError = (flag: boolean) => ({
  type: 'SHOW-MODAL-AUTH-ERROR',
  flag,
});

export const exitFromProfile = () => ({
  type: 'EXIT-FROM-PROFILE',
});

export const registerUserThunk = (
  email: string,
  password: string,
  login: string,
) => {
  return (dispatch: Dispatch) => {
    AuthController.createNewUser(email, password, login).then(
      (response: any) => {
        if (response.user) {
          dispatch(setTokenAction(response));
          dispatch(registerUserAction(response.user));
        } else {
          dispatch(setAuthErrorRegister(response));
        }
      },
    );
  };
};

export const loginUserThunk = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    AuthController.isAuthUser(email, password).then((response: any) => {
      if (response.user) {
        dispatch(setTokenAction(response));
        dispatch(loginUserAction(response));
      } else {
        dispatch(setAuthErrorLogin(response));
      }
    });
  };
};

export const isAuthMeThunk = () => {
  return (dispatch: Dispatch) => {
    if (AuthController.isAuthMeCheckData()) {
      AuthController.isAuthMe().then(response => {
        if (response) {
          dispatch(setAuthMe(response));
        } else {
          dispatch(exitFromProfile());
          dispatch(setShowModalAuthError(true));
        }
      });
    }
  };
};

export default authReducer;
