export interface ILoginState {
  login: string;
  password: string;
}

const initialState: ILoginState = {
  login: '',
  password: '',
};

const LoginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET-AUTH-LOGIN':
      return {
        ...state,
        login: action.login,
      };

    case 'SET-AUTH-PASSWORD':
      return {
        ...state,
        password: action.password,
      };
    default:
      return state;
  }
};

export const changeLoginAction = (login: string) => ({
  type: 'SET-AUTH-LOGIN',
  login,
});

export const changePasswordAction = (password: string) => ({
  type: 'SET-AUTH-PASSWORD',
  password,
});

export default LoginReducer;
