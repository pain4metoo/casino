import styles from './Game.module.scss';
import { Stage, Container, Sprite, useApp, AnimatedSprite } from '@pixi/react';
import { ISymbol } from './GenerateGameLogic';
import Symbol from './GameSymbol';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import LoadingContainer from './Loading/LoadingContainer';
import { gameData } from './textures';
import GameControls from './GameControls';
import {
  readyGameDataFireTextures,
  readyGameDataStormTextures,
} from './textures-create';

const Game = (props: any) => {
  const startingField = createSymbols(props.startingField);
  const gameField = createSymbols(props.gameField);

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
          />
        );
      });
    });
  }

  return (
    <div className={styles.game}>
      <Stage
        width={1200}
        height={700}
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
              width={1200}
              height={700}
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
              isNotEnoughMoney={props.isNotEnoughMoney}
              isOnSound={props.isOnSound}
              setSoundState={props.setSoundState}
            />
          </Container>
        )}
      </Stage>
    </div>
  );
};

export default Game;
