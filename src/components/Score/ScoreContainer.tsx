import { connect } from 'react-redux';
import { compose } from 'redux';
import Score from './Score';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';

const ScoreContainer = (props: any) => {
  if (!props.isAuth) {
    props.isAuthMeThunk();
  }
  return <Score {...props} />;
};

const mapStateToProps = (state: any) => {
  return {};
};

export default compose(
  connect(mapStateToProps, {
    isAuthMeThunk,
  }),
  withAuthMeRedirect,
)(ScoreContainer);
