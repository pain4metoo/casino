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
import { useEffect } from 'react';

const GameContainer = (props: any) => {
  useEffect(() => {
    props.setIsPlayAnimAction(true);

    setTimeout(() => {
      props.setIsPlayAnimAction(false);
    }, 3000);
  }, []);

  const handleClickSpin = () => {
    props.spinCycleThunk(true);

    setTimeout(() => {
      props.spinCycleThunk(false);
    }, 0);
  };

  if (!props.isAuth) {
    props.isAuthMeThunk();
  }
  return <Game {...props} handleClickSpin={handleClickSpin} />;
};

const mapStateToProps = (state: any) => {
  return {
    isPlayAnim: state.game.isPlayAnim,
    isStartGame: state.game.isStartGame,
    isInitStage: state.game.isInitStage,
    isGameOn: state.game.isGameOn,
    isRemoveSymbolsStage: state.game.isRemoveSymbolsStage,
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
