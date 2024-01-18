export interface ILoginState {
  email: string;
  password: string;
}

const initialState: ILoginState = {
  email: '',
  password: '',
};

const LoginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET-AUTH-EMAIL':
      return {
        ...state,
        email: action.email,
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

export const loginPageEmailAction = (email: string) => ({
  type: 'SET-AUTH-EMAIL',
  email,
});

export const loginPagePasswordAction = (password: string) => ({
  type: 'SET-AUTH-PASSWORD',
  password,
});

export default LoginReducer;
