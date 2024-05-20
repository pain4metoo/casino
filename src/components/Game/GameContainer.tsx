import { connect } from 'react-redux';
import { compose } from 'redux';
import Game from './Game';
import { withAuthMeRedirect } from '../../hoc/withAuthMeRedirect';
import { isAuthMeThunk } from '../../redux/auth-reducer';
import {
  checkAmountMoney,
  placeBetThunk,
  playWinMusic,
  playWinSound,
  resizePixiTexture,
  restartGame,
  setBet,
  setSoundState,
  showDarkSlot,
  spinCycleThunk,
} from '../../redux/game-reducer';
import GenerateSpinCycle from './GenerateGameLogic';
import { useEffect } from 'react';
import useSound from 'use-sound';
import gameMusicDef from '../../assets/sounds/anubis_def.mp3';
import gameMusicWin from '../../assets/sounds/anubis_win.mp3';
import gameMusicStone from '../../assets/sounds/stone_fall.mp3';
import gameWinSound from '../../assets/sounds/win_sound.mp3';
import gameColumnFallSound from '../../assets/sounds/column_fall.mp3';

const GameContainer = (props: any) => {
  const [playGameMusicDef, controlsDef] = useSound(gameMusicDef, {
    volume: props.isOnSound ? 0.6 : 0,
    interrupt: true,
    loop: true,
  });
  const [playGameMusicWin, controlsWin] = useSound(gameMusicWin, {
    volume: props.isOnSound ? 0.6 : 0,
    loop: true,
    interrupt: true,
  });

  const [playMusicStoneFall, controlsStoneFall] = useSound(gameMusicStone, {
    volume: props.isOnSound ? 1 : 0,
    interrupt: true,
  });

  const [playWinSound] = useSound(gameWinSound, {
    volume: props.isOnSound ? 1 : 0,
  });

  const [playColumnFallSound, controlsColumnFallSound] = useSound(
    gameColumnFallSound,
    {
      volume: props.isOnSound ? 1 : 0,
    },
  );

  props.isAuthMeThunk();

  useEffect(() => {
    return () => {
      GenerateSpinCycle.clearLastResults();
      props.restartGame();
    };
  }, []);

  useEffect(() => {
    if (props.isColumnFallSound) {
      playColumnFallSound();
    } else {
      controlsColumnFallSound.stop();
    }
  }, [props.isColumnFallSound]);

  useEffect(() => {
    if (props.isWinSound) {
      playWinSound();
    }
  }, [props.isWinSound]);

  useEffect(() => {
    if (props.isWinMusic) {
      controlsDef.pause();
      playGameMusicWin();
    } else {
      controlsWin.stop();
      playGameMusicDef();
    }
  }, [props.isWinMusic]);

  useEffect(() => {
    if (props.isStoneFallSound) {
      playMusicStoneFall();
    } else {
      controlsStoneFall.stop();
    }
  }, [props.isStoneFallSound]);

  useEffect(() => {
    if (props.isStartGame) {
      playGameMusicDef();
    } else {
      controlsDef.stop();
    }

    return () => {
      controlsDef.stop();
      controlsWin.stop();
      controlsStoneFall.stop();
      controlsColumnFallSound.stop();
    };
  }, [props.isStartGame]);

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
    balance: state.auth.user.balance,
    bet: state.game.bet,
    winAmount: state.game.winAmount,
    totalWinAmount: state.game.totalWinAmount,
    isNotEnoughMoney: state.game.isNotEnoughMoney,
    isWinMusic: state.game.isWinMusic,
    isOnSound: state.game.isOnSound,
    isStoneFallSound: state.game.isStoneFallSound,
    isDarkGame: state.game.isDarkGame,
    isWinSound: state.game.isWinSound,
    isColumnFallSound: state.game.isColumnFallSound,
    positionElements: state.game.positionElements,
  };
};

export default compose(
  connect(mapStateToProps, {
    placeBetThunk,
    isAuthMeThunk,
    spinCycleThunk,
    resizePixiTexture,
    setBet,
    checkAmountMoney,
    restartGame,
    playWinMusic,
    setSoundState,
    showDarkSlot,
    playWinSound,
  }),
  withAuthMeRedirect,
)(GameContainer);
