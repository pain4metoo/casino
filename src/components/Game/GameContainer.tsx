import { connect } from 'react-redux';
import { compose } from 'redux';
import Game from './Game';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';
import { placeBetThunk, spinCycleThunk } from '../../redux/game-reducer';

const GameContainer = (props: any) => {
  const handleClickSpin = (bet: number, balance: number) => {
    props.placeBetThunk(bet, balance);
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
    isStartGame: state.game.isStartGame,
    isInitStage: state.game.isInitStage,
    isGameOn: state.game.isGameOn,
    isRemoveSymbolsStage: state.game.isRemoveSymbolsStage,
    isAdditionStage: state.game.isAdditionStage,
    startingField: state.game.startingField,
    gameField: state.game.gameField,
    isLoadData: state.loading.isLoadData,
  };
};
export default compose(
  connect(mapStateToProps, {
    placeBetThunk,
    isAuthMeThunk,
    spinCycleThunk,
  }),
  withAuthMeRedirect,
)(GameContainer);
