import { connect } from 'react-redux';
import { compose } from 'redux';
import Game from './Game';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';
import {
  checkWinThunk,
  setIsSpinClickAction,
  setSpinIsRunningAction,
  setSpinThunk,
} from '../../redux/game-reducer';

const GameContainer = (props: any) => {
  if (!props.isAuth) {
    props.isAuthMeThunk();
  }
  return <Game {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isWin: state.game.isWin,
    isRunning: state.game.isRunning,
    isSpin: state.game.isSpin,
    gameField: state.game.gameField,
    isOmitSymbols: state.game.isOmitSymbols,
    isRemoveSymbolsStage: state.game.isRemoveSymbolsStage,
  };
};
export default compose(
  connect(mapStateToProps, {
    isAuthMeThunk,
    setSpinThunk,
    setSpinIsRunningAction,
    setIsSpinClickAction,
    checkWinThunk,
  }),
  withAuthMeRedirect,
)(GameContainer);
