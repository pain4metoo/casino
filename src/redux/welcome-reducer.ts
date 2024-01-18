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

const WelcomeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'CHANGE-EMAIL':
      return {
        ...state,
        email: action.email,
      };
    case 'CHANGE-PASSWORD':
      return {
        ...state,
        password: action.password,
      };
    case 'CHANGE-LOGIN':
      return {
        ...state,
        login: action.login,
      };
    default:
      return state;
  }
};

export const changeEmailAction = (email: string) => ({
  type: 'CHANGE-EMAIL',
  email,
});

export const changePasswordAction = (password: string) => ({
  type: 'CHANGE-PASSWORD',
  password,
});

export const changeLoginAction = (login: string) => ({
  type: 'CHANGE-LOGIN',
  login,
});

export default WelcomeReducer;
