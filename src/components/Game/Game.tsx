import styles from './Game.module.scss';
import { Stage, Graphics, createRoot } from '@pixi/react';
import { ISymbol } from './GenerateGameLogic';
import Symbol from './GameSymbol';

const Game = (props: any) => {
  const field = (g: any) => {
    g.beginFill(0x0033cc, 0);
    g.drawRect(350, 50, 500, 600);
    g.endFill();
  };

  const playSpin = () => {
    props.setSpinThunk();
  };

  const symbolsArr = props.gameField.map((arr: Array<ISymbol>, i: number) => {
    return arr.map((symbol: ISymbol, i) => {
      return (
        <Symbol
          setSpinIsRunningAction={props.setSpinIsRunningAction}
          symbolData={{ ...symbol }}
          key={i}
        />
      );
    });
  });

  if (props.isWin) {
    symbolsArr.map((arr: any) => {
      arr.map((el: any, i: number) => {
        if (el.props.symbolData.isWin) {
          return (
            <Symbol
              setSpinIsRunningAction={props.setSpinIsRunningAction}
              symbolData={{ ...el.props.symbolData }}
              key={i}
            />
          );
        }
      });
    });
  }
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
        }}>
        {props.isSpin ? symbolsArr : null}
        <Graphics draw={field} />
      </Stage>
    </div>
  );
};

export default Game;
