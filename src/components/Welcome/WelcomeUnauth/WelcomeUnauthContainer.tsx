import { compose } from 'redux';
import WelcomeUnauth from './WelcomeUnauth';
import { connect } from 'react-redux';
import {
  changeEmailAction,
  changeLoginAction,
  changePasswordAction,
} from '../../../redux/welcome-reducer';
import { registerUserThunk } from '../../../redux/auth-reducer';

const WelcomeUnauthContainer = (props: any) => {
  return <WelcomeUnauth {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
    email: state.welcomePage.email,
    login: state.welcomePage.login,
    password: state.welcomePage.password,
  };
};

export default compose(
  connect(mapStateToProps, {
    changeLoginAction,
    changeEmailAction,
    changePasswordAction,
    registerUserThunk,
  })(WelcomeUnauthContainer),
);
