import { createSlice } from '@reduxjs/toolkit';

export interface IWelcomeState {
  email: string;
  password: string;
  login: string;
}

const initialState: IWelcomeState = {
  email: '',
  password: '',
  login: '',
};

const welcomeSlice = createSlice({
  name: 'welcome',
  initialState,
  reducers: {
    changeEmail(state, action) {
      state.email = action.payload.email;
    },
    changePassword(state, action) {
      state.password = action.payload.password;
    },
    changeLogin(state, action) {
      state.login = action.payload.login;
    },
  },
});

export const { changeEmail, changePassword, changeLogin } =
  welcomeSlice.actions;

export default welcomeSlice.reducer;
