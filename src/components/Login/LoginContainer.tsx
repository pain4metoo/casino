import { connect } from 'react-redux';
import Login from './Login';
import {
  loginPageEmailAction,
  loginPagePasswordAction,
} from '../../redux/login-reducer';
import { isAuthMeThunk, loginUserThunk } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';

const LoginContainer = (props: any) => {
  if (!props.isAuth) {
    props.isAuthMeThunk();
  }
  if (props.isAuth) return <Navigate to={'/'} />;
  return <Login {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isShowModalError: state.auth.isShowModalError,
    isAuth: state.auth.isAuth,
    email: state.loginPage.email,
    password: state.loginPage.password,
    errorTextLogin: state.auth.errorTextLogin,
  };
};
export default connect(mapStateToProps, {
  loginPageEmailAction,
  loginPagePasswordAction,
  loginUserThunk,
  isAuthMeThunk,
})(LoginContainer);
