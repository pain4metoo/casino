import { compose } from 'redux';
import WelcomeUnauth from './Welcome-Unauth';
import { connect } from 'react-redux';
import {
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
    login: state.welcomePage.login,
    password: state.welcomePage.password,
  };
};

export default compose(
  connect(mapStateToProps, {
    changeLoginAction,
    changePasswordAction,
    registerUserThunk,
  })(WelcomeUnauthContainer),
);
