export interface IWelcomeState {
  login: string;
  password: string;
}

const initialState: IWelcomeState = {
  login: '',
  password: '',
};

const WelcomeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'CHANGE-LOGIN':
      return {
        ...state,
        login: action.login,
      };
    case 'CHANGE-PASSWORD':
      return {
        ...state,
        password: action.password,
      };
    default:
      return state;
  }
};

export const changeLoginAction = (login: string) => ({
  type: 'CHANGE-LOGIN',
  login,
});

export const changePasswordAction = (password: string) => ({
  type: 'CHANGE-PASSWORD',
  password,
});

export default WelcomeReducer;
