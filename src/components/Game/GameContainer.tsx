import { connect } from 'react-redux';
import { compose } from 'redux';
import Game from './Game';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';
import {
  placeBetThunk,
  setBet,
  spinCycleThunk,
} from '../../redux/game-reducer';

const GameContainer = (props: any) => {
  const handleClickSpin = (bet: number, balance: number) => {
    props.placeBetThunk(bet, balance);
    props.spinCycleThunk(true);

    setTimeout(() => {
      props.spinCycleThunk(false);
    }, 0);
  };

  const handlePlaceBetUp = () => {
    let currentBet = props.bet;

    if (currentBet < 1) {
      currentBet += 0.1;
    } else if (currentBet < 10) {
      currentBet += 1;
    } else if (currentBet < 100) {
      currentBet += 10;
    } else if (currentBet < 1000) {
      currentBet += 100;
    }

    currentBet = +currentBet.toFixed(2);

    props.setBet({ bet: currentBet });
  };

  const handlePlaceBetLow = () => {
    let currentBet = props.bet;

    if (currentBet <= 1) {
      currentBet -= 0.1;
      currentBet = currentBet < 0.1 ? 0.1 : currentBet;
    } else if (currentBet <= 10) {
      currentBet -= 1;
    } else if (currentBet <= 100) {
      currentBet -= 10;
    } else if (currentBet <= 1000) {
      currentBet -= 100;
    }

    currentBet = +currentBet.toFixed(2);
    props.setBet({ bet: currentBet });
  };

  if (!props.isAuth) {
    props.isAuthMeThunk();
  }
  return (
    <Game
      {...props}
      handleClickSpin={handleClickSpin}
      handlePlaceBetUp={handlePlaceBetUp}
      handlePlaceBetLow={handlePlaceBetLow}
    />
  );
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
    balance: state.auth.user.balance,
    bet: state.game.bet,
  };
};
export default compose(
  connect(mapStateToProps, {
    setBet,
    placeBetThunk,
    isAuthMeThunk,
    spinCycleThunk,
  }),
  withAuthMeRedirect,
)(GameContainer);
