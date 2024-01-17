import { connect } from 'react-redux';
import { compose } from 'redux';
import Profile from './Profile';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';

const ProfileContainer = (props: any) => {
  if (props.id && props.email && props.token && !props.isAuth) {
    props.isAuthMeThunk(props.email, props.id);
  }
  return <Profile {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth,
  };
};

export default compose(
  connect(mapStateToProps, {
    isAuthMeThunk,
  }),
  withAuthMeRedirect,
)(ProfileContainer);
