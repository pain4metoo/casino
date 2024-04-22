import { createSlice } from '@reduxjs/toolkit';

export interface ILoginState {
  email: string;
  password: string;
}

const initialState: ILoginState = {
  email: '',
  password: '',
};

const loginSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    loginPageEmail(state, action) {
      state.email = action.payload.email;
    },
    loginPagePassword(state, action) {
      state.password = action.payload.password;
    },
  },
});

export const { loginPageEmail, loginPagePassword } = loginSlice.actions;

export default loginSlice.reducer;
