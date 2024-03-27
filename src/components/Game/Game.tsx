import styles from './Game.module.scss';
import { Stage } from '@pixi/react';
import { ISymbol } from './GenerateGameLogic';
import Symbol from './GameSymbol';
import Loading from './Loading/Loading';

const Game = (props: any) => {
  const symbolsArr = props.gameField.map((arr: Array<ISymbol>, i: number) => {
    return arr.map((symbol: ISymbol, g) => {
      const isLastSymbol =
        i === props.gameField.length - 1 && g === arr.length - 1;

      return (
        <Symbol
          symbolData={symbol}
          key={g}
          isLastSymbol={isLastSymbol}
          isWinStage={props.isWinStage}
          isStartGame={props.isStartGame}
          isOmitStage={props.isOmitStage}
          isAdditionStage={props.isAdditionStage}
          winStageAction={props.winStageAction}
          omitStageAction={props.omitStageAction}
          additionalStageAction={props.additionalStageAction}
        />
      );
    });
  });

  return (
    <div className={styles.game}>
      {props.isStartGame ? (
        <button
          type='button'
          onClick={props.initStageAction}
          disabled={props.isSpin}>
          SPIN
        </button>
      ) : (
        <button
          type='button'
          onClick={() => props.startGameAction(true)}
          disabled={props.isStartGame}>
          START GAME
        </button>
      )}

      <Stage
        width={1200}
        height={700}
        options={{
          antialias: true,
          resizeTo: window,
        }}>
        {!props.isStartGame ? <Loading /> : symbolsArr}
        {props.isSpin ? symbolsArr : null}
      </Stage>
    </div>
  );
};

export default Game;
