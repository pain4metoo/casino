import { connect } from 'react-redux';
import Welcome from './Welcome';
import { isAuthMeThunk } from '../../redux/auth-reducer';
import { compose } from 'redux';

const WelcomeContainer = (props: any) => {
  if (props.id && props.email && props.token) {
    props.isAuthMeThunk(props.email, props.id);
  }

  return <Welcome {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: localStorage.getItem('id'),
    email: localStorage.getItem('email'),
    token: localStorage.getItem('token'),
  };
};

export default compose(
  connect(mapStateToProps, {
    isAuthMeThunk,
  }),
)(WelcomeContainer);
