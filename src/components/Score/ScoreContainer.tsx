import { connect } from 'react-redux';
import { compose } from 'redux';
import Score from './Score';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';

const ScoreContainer = (props: any) => {
  if (props.id && props.email && props.token) {
    props.isAuthMeThunk(props.email, props.id);
  }

  return <Score {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  connect(mapStateToProps, {
    isAuthMeThunk,
  }),
  withAuthMeRedirect,
)(ScoreContainer);
