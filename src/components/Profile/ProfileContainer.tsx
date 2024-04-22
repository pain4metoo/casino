import { connect } from 'react-redux';
import { compose } from 'redux';
import Profile from './Profile';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';

const ProfileContainer = (props: any) => {
  if (!props.isAuth) {
    props.isAuthMeThunk();
  }
  return <Profile {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

export default compose(
  connect(mapStateToProps, {
    isAuthMeThunk,
  }),
  withAuthMeRedirect,
)(ProfileContainer);
