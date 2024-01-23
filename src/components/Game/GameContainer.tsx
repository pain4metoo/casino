import { connect } from 'react-redux';
import { compose } from 'redux';
import Game from './Game';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';
import {
  setIsSpinClickAction,
  setSpinIsRunningAction,
  setSpinThunk,
} from '../../redux/game-reducer';

const GameContainer = (props: any) => {
  if (props.id && props.email && props.token) {
    props.isAuthMeThunk(props.email, props.id);
  }
  return <Game {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
    isWin: state.game.isWin,
    isRunning: state.game.isRunning,
    isSpin: state.game.isSpin,
    gameField: state.game.gameField,
  };
};
export default compose(
  connect(mapStateToProps, {
    isAuthMeThunk,
    setSpinThunk,
    setSpinIsRunningAction,
    setIsSpinClickAction,
  }),
  withAuthMeRedirect,
)(GameContainer);
