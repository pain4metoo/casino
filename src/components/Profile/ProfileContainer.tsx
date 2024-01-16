import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Profile from './Profile';

const ProfileContainer = (props: any) => {
  return <Profile {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  connect(mapStateToProps),
  // withAuthRedirect,
)(ProfileContainer);
