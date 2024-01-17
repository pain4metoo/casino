import { connect } from 'react-redux';
import { compose } from 'redux';
import Game from './Game';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';

const GameContainer = (props: any) => {
  if (props.id && props.email && props.token) {
    props.isAuthMeThunk(props.email, props.id);
  }
  return <Game {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  connect(mapStateToProps, { isAuthMeThunk }),
  withAuthMeRedirect,
)(GameContainer);
