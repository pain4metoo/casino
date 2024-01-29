import styles from './Game.module.scss';
import { Stage } from '@pixi/react';
import { ISymbol } from './GenerateGameLogic';
import Symbol from './GameSymbol';

const Game = (props: any) => {
  const playSpin = () => {
    props.setSpinThunk();
  };

  const symbolsArr = props.gameField.map((arr: Array<ISymbol>, i: number) => {
    return arr.map((symbol: ISymbol, i) => {
      return (
        <Symbol
          isRunning={props.isRunning}
          isWin={props.isWin}
          symbolData={{ ...symbol }}
          key={i}
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
