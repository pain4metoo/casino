import { connect } from 'react-redux';
import Login from './Login';
import { loginPageEmail, loginPagePassword } from '../../redux/login-reducer';
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
    isShowModalError: state.auth.authWarnings.isShowModalError,
    isAuth: state.auth.user.isAuth,
    email: state.loginPage.email,
    password: state.loginPage.password,
    errorTextLogin: state.auth.authWarnings.errorTextLogin,
  };
};
export default connect(mapStateToProps, {
  loginPageEmail,
  loginPagePassword,
  loginUserThunk,
  isAuthMeThunk,
})(LoginContainer);
