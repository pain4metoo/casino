import { connect } from 'react-redux';
import Login from './Login';
import {
  loginPageEmailAction,
  loginPagePasswordAction,
} from '../../redux/login-reducer';
import { loginUserThunk } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';

const LoginContainer = (props: any) => {
  if (props.isAuth) return <Navigate to={'/game/'} />;
  return <Login {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    email: state.loginPage.email,
    password: state.loginPage.password,
    isAuth: state.auth.isAuth,
  };
};
export default connect(mapStateToProps, {
  loginPageEmailAction,
  loginPagePasswordAction,
  loginUserThunk,
})(LoginContainer);
