import styles from './Game.module.scss';
import { Stage, Container, Sprite, useApp, AnimatedSprite } from '@pixi/react';
import { ISymbol } from './GenerateGameLogic';
import Symbol from './GameSymbol';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import LoadingContainer from './Loading/LoadingContainer';
import { gameData } from './textures';
import GameControls from './GameControls';
import { useEffect } from 'react';

const Game = (props: any) => {
  const startingField = createSymbols(props.startingField);
  const gameField = createSymbols(props.gameField);

  function resize(event: any) {
    if (event.target) {
      const windowInnerWidth = window.innerWidth;
      const windowInnerHeight = window.innerHeight;
    }
  }

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  function createSymbols(arrSymbols: Array<Array<ISymbol>>) {
    let numberSymbol = 0;
    if (numberSymbol === 29) {
      props.setShowFire({ flag: true });
    }
    return arrSymbols.map((arrSymbolsColumn: Array<ISymbol>, i: number) => {
      return arrSymbolsColumn.map((symbol: ISymbol, g) => {
        numberSymbol += 1;

        return (
          <Symbol
            key={numberSymbol}
            isRemoveSymbolsStage={props.isRemoveSymbolsStage}
            symbolData={symbol}
            isLastSymbolInColumn={g === arrSymbolsColumn.length - 1}
            isDarkGame={props.isDarkGame}
            numberOfColumn={i}
          />
        );
      });
    });
  }

  return (
    <div className={styles.game}>
      <Stage
        width={props.positionElements.gameField.width}
        height={props.positionElements.gameField.height}
        options={{
          antialias: true,
          resizeTo: window,
        }}>
        {!props.isStartGame ? (
          <Provider store={store}>
            <LoadingContainer />
          </Provider>
        ) : (
          <Container>
            <Sprite
              image={
                props.isDarkGame ? gameData.bgSlotDark : gameData.bgSlotGame
              }
              width={props.positionElements.gameField.width}
              height={props.positionElements.gameField.height}
            />
            {!props.isInitStage ? startingField : null}
            {props.isInitStage && !props.isAdditionStage ? gameField : null}

            {props.isAdditionStage ? gameField : null}

            <GameControls
              handlePlaceBetUp={props.handlePlaceBetUp}
              handlePlaceBetLow={props.handlePlaceBetLow}
              handleClickSpin={props.handleClickSpin}
              balance={props.balance}
              bet={props.bet}
              isGameOn={props.isGameOn}
              winAmount={props.winAmount}
              totalWinAmount={props.totalWinAmount}
              isNotEnoughMoney={props.isNotEnoughMoney}
              isOnSound={props.isOnSound}
              setSoundState={props.setSoundState}
              positionElements={props.positionElements}
            />
          </Container>
        )}
      </Stage>
    </div>
  );
};

export default Game;
