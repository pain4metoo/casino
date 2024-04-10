import { connect } from 'react-redux';
import { compose } from 'redux';
import Game from './Game';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';
import {
  additionalStageAction,
  initStageAction,
  omitStageAction,
  removeSymbolsStage,
  setGameOnAction,
  setIsPlayAnimAction,
  spinCycleThunk,
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
    isPlayAnim: state.game.isPlayAnim,
    isStartGame: state.game.isStartGame,
    isInitStage: state.game.isInitStage,
    isGameOn: state.game.isGameOn,
    isWinStage: state.game.isWinStage,
    isRemoveSymbolsStage: state.game.isRemoveSymbolsStage,
    isOmitStage: state.game.isOmitStage,
    isAdditionStage: state.game.isAdditionStage,
    startingField: state.game.startingField,
    gameField: state.game.gameField,
    gameData: state.loading.gameData,
  };
};
export default compose(
  connect(mapStateToProps, {
    isAuthMeThunk,
    setIsPlayAnimAction,
    spinCycleThunk,
    setGameOnAction,
    initStageAction,
    winStageAction,
    removeSymbolsStage,
    omitStageAction,
    additionalStageAction,
  }),
  withAuthMeRedirect,
)(GameContainer);
