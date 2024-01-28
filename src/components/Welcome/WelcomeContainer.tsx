import { connect } from 'react-redux';
import Welcome from './Welcome';
import { isAuthMeThunk } from '../../redux/auth-reducer';

const WelcomeContainer = (props: any) => {
  if (!props.isAuth) {
    props.isAuthMeThunk();
  }
  return <Welcome {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isShowModalError: state.auth.isShowModalError,
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, {
  isAuthMeThunk,
})(WelcomeContainer);
