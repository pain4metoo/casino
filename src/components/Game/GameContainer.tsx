import { connect } from 'react-redux';
import { compose } from 'redux';
import Game from './Game';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';
import {
  additionalStageAction,
  initStageAction,
  omitStageAction,
  startGameAction,
  winStageAction,
} from '../../redux/game-reducer';

const GameContainer = (props: any) => {
  if (!props.isAuth) {
    props.isAuthMeThunk();
  }
  return <Game {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isStartGame: state.game.isStartGame,
    isSpin: state.game.isSpin,
    isWinStage: state.game.isWinStage,
    isOmitStage: state.game.isOmitStage,
    isAdditionStage: state.game.isAdditionStage,
    gameField: state.game.gameField,
  };
};

export default compose(
  connect(mapStateToProps, {
    isAuthMeThunk,
    startGameAction,
    initStageAction,
    winStageAction,
    omitStageAction,
    additionalStageAction,
  }),
  withAuthMeRedirect,
)(GameContainer);
