import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Score from './Score';

const ScoreContainer = (props: any) => {
  return <Score {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  connect(mapStateToProps),
  withAuthRedirect,
)(ScoreContainer);
