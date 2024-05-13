import { connect } from 'react-redux';
import { compose } from 'redux';
import Game from './Game';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';
import {
  checkAmountMoney,
  placeBetThunk,
  restartGame,
  setBet,
  spinCycleThunk,
} from '../../redux/game-reducer';
import GenerateSpinCycle from './GenerateGameLogic';
import { useEffect } from 'react';

const GameContainer = (props: any) => {
  props.isAuthMeThunk();
  useEffect(() => {
    return () => {
      GenerateSpinCycle.clearLastResults();
      props.restartGame();
    };
  }, []);

  const handleClickSpin = (bet: number) => {
    if (bet > props.balance) {
      props.checkAmountMoney({ flag: true });
      return;
    }
    props.checkAmountMoney({ flag: false });
    props.placeBetThunk(bet, props.balance);
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
    } else {
      currentBet = 0.1;
    }

    currentBet = +currentBet.toFixed(2);
    GenerateSpinCycle.changeCurrentBet(currentBet);

    if (currentBet > props.balance) {
      props.checkAmountMoney({ flag: true });
    } else {
      props.checkAmountMoney({ flag: false });
    }

    props.setBet({ bet: currentBet });
  };

  const handlePlaceBetLow = () => {
    let currentBet = props.bet;

    if (currentBet <= 1) {
      currentBet -= 0.1;
      currentBet = currentBet < 0.1 ? 1000 : currentBet;
    } else if (currentBet <= 10) {
      currentBet -= 1;
    } else if (currentBet <= 100) {
      currentBet -= 10;
    } else if (currentBet <= 1000) {
      currentBet -= 100;
    }

    currentBet = +currentBet.toFixed(2);
    GenerateSpinCycle.changeCurrentBet(currentBet);

    if (currentBet > props.balance) {
      props.checkAmountMoney({ flag: true });
    } else {
      props.checkAmountMoney({ flag: false });
    }

    props.setBet({ bet: currentBet });
  };

  return (
    <Game
      {...props}
      handleClickSpin={handleClickSpin}
      handlePlaceBetUp={handlePlaceBetUp}
      handlePlaceBetLow={handlePlaceBetLow}
      isAuthMeThunk={props.isAuthMeThunk}
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
    winAmount: state.game.winAmount,
    isNotEnoughMoney: state.game.isNotEnoughMoney,
  };
};
export default compose(
  connect(mapStateToProps, {
    setBet,
    placeBetThunk,
    isAuthMeThunk,
    spinCycleThunk,
    checkAmountMoney,
    restartGame,
  }),
  withAuthMeRedirect,
)(GameContainer);
