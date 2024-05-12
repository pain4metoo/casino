import { AuthData } from './../api/auth/auth-types';
import { Dispatch } from 'redux';
import AuthController from '../api/auth/auth-controller';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthData = {
  user: {
    email: '',
    password: '',
    login: '',
    avatar: null,
    balance: 0,
    achievements: [],
    exp: 0,
    level: 1,
    isAuth: false,
    id: null,
  },
  authWarnings: {
    errorTextLogin: '',
    errorTextRegister: '',
    isShowModalError: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser(state, action) {
      state.user = action.payload.user;
      state.user.isAuth = true;
    },
    loginUser(state, action) {
      state.user = action.payload.user;
      state.user.isAuth = true;
    },
    setToken(state, action) {
      localStorage.setItem('token', action.payload.data.accessToken);
      localStorage.setItem('id', action.payload.data.user.id);
    },
    setAuthMe(state, action) {
      state.user = action.payload.user;
      state.user.isAuth = true;
    },
    setAuthErrorRegister(state, action) {
      state.authWarnings.errorTextRegister = action.payload.errorTextRegister;
    },
    setAuthErrorLogin(state, action) {
      state.authWarnings.errorTextLogin = action.payload.errorTextLogin;
    },
    setShowModalAuthError(state, action) {
      state.authWarnings.isShowModalError = action.payload.flag;
    },
    exitFromProfile(state) {
      localStorage.clear();
      state.user.isAuth = false;
    },
    updateUserBalance(state, action) {
      state.user.balance = action.payload.balance;
    },
  },
});

export const {
  registerUser,
  loginUser,
  setToken,
  setAuthMe,
  setAuthErrorRegister,
  setAuthErrorLogin,
  setShowModalAuthError,
  exitFromProfile,
  updateUserBalance,
} = authSlice.actions;

export default authSlice.reducer;

export const registerUserThunk = (
  email: string,
  password: string,
  login: string,
) => {
  return async (dispatch: Dispatch) => {
    const response = await AuthController.createNewUser(email, password, login);

    if (response.user) {
      dispatch(setToken({ data: response }));
      dispatch(registerUser({ user: response.user }));
    } else {
      dispatch(setAuthErrorRegister({ errorTextRegister: response }));
    }
  };
};

export const loginUserThunk = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    const response = await AuthController.isAuthUser(email, password);

    if (response.user) {
      dispatch(setToken({ data: response }));
      dispatch(loginUser({ user: response.user }));
    } else {
      dispatch(setAuthErrorLogin({ errorTextLogin: response }));
    }
  };
};

export const isAuthMeThunk = () => {
  return async (dispatch: Dispatch) => {
    if (AuthController.isAuthMeCheckData()) {
      const response = await AuthController.isAuthMe();

      if (response) {
        dispatch(setAuthMe({ user: response }));
      } else {
        dispatch(exitFromProfile());
        dispatch(setShowModalAuthError({ flag: true }));
      }
    } else {
      dispatch(exitFromProfile());
    }
  };
};
