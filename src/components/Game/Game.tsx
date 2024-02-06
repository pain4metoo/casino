import styles from './Game.module.scss';
import { Stage, useApp } from '@pixi/react';
import { ISymbol } from './GenerateGameLogic';
import Symbol from './GameSymbol';
import { useEffect } from 'react';

const Game = (props: any) => {
  const playSpin = () => {
    props.setSpinThunk();
  };

  const symbolsArr = props.gameField.map((arr: Array<ISymbol>, i: number) => {
    return arr.map((symbol: ISymbol, g) => {
      let isLastSymbol =
        i === props.gameField.length - 1 && g === arr.length - 1;

      let isFirstSymbol = i === 0 && g === 0;

      return (
        <Symbol
          isRemoveSymbolsStage={props.isRemoveSymbolsStage}
          isOmitSymbols={props.isOmitSymbols}
          omitSymbolsThunk={props.omitSymbolsThunk}
          checkWinThunk={props.checkWinThunk}
          isRunning={props.isRunning}
          isWin={props.isWin}
          symbolData={{ ...symbol }}
          key={g}
          isLastSymbol={isLastSymbol}
          isFirstSymbol={isFirstSymbol}
        />
      );
    });
  });

  return (
    <div className={styles.game}>
      <button
        type='button'
        onClick={() => playSpin()}
        disabled={props.isRunning}>
        SPIN
      </button>

      <Stage
        width={1200}
        height={700}
        options={{
          antialias: true,
          resizeTo: window,
        }}>
        {props.isSpin ? symbolsArr : null}
      </Stage>
    </div>
  );
};

export default Game;
