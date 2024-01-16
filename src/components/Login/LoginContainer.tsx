import { connect } from 'react-redux';
import Login from './Login';
import {
  changeLoginAction,
  changePasswordAction,
} from '../../redux/login-reducer';
import { loginUserThunk } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';

const LoginContainer = (props: any) => {
  if (props.isAuth) return <Navigate to={'/game/'} />;
  return <Login {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    login: state.loginPage.login,
    password: state.loginPage.password,
    isAuth: state.auth.isAuth,
  };
};
export default connect(mapStateToProps, {
  changeLoginAction,
  changePasswordAction,
  loginUserThunk,
})(LoginContainer);
