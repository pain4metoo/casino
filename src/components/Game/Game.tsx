import styles from './Game.module.scss';
import { Stage } from '@pixi/react';
import { ISymbol } from './GenerateGameLogic';
import Symbol from './GameSymbol';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import LoadingContainer from './Loading/LoadingContainer';

const Game = (props: any) => {
  let numberSymbol = 0;
  const symbolsArr = props.gameField.map((arr: Array<ISymbol>, i: number) => {
    return arr.map((symbol: ISymbol, g) => {
      numberSymbol++;
      const isLastSymbol =
        i === props.gameField.length - 1 && g === arr.length - 1;

      return (
        <Symbol
          key={numberSymbol}
          numberSymbol={numberSymbol}
          symbolData={symbol}
          isLastSymbol={isLastSymbol}
          data={props.data}
        />
      );
    });
  });

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
          symbolsArr
        )}
      </Stage>
    </div>
  );
};

export default Game;
