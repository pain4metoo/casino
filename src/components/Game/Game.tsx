import styles from './Game.module.scss';
import { Stage, Container, Sprite } from '@pixi/react';
import GenerateSpinCycle, { ISymbol } from './GenerateGameLogic';
import Symbol from './GameSymbol';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import LoadingContainer from './Loading/LoadingContainer';
import spinImg from '../../assets/images/spin.png';
import { useEffect, useRef } from 'react';

const Game = (props: any) => {
  let numberSymbol = 0;

  function createSymbols(arr: Array<Array<ISymbol>>) {
    return arr.map((arr: Array<ISymbol>, i: number) => {
      return arr.map((symbol: ISymbol, g) => {
        numberSymbol++;
        const isLastSymbol =
          i === props.gameField.length - 1 && g === arr.length - 1;

        return (
          <Symbol
            key={numberSymbol}
            numberSymbol={numberSymbol}
            winStageAction={props.winStageAction}
            symbolData={symbol}
            isSpin={props.isSpin}
            isLastSymbol={isLastSymbol}
            data={props.data}
          />
        );
      });
    });
  }

  const startingField = createSymbols(props.startingField);
  const gameField = createSymbols(props.gameField);

  const spin = () => {
    props.initStageAction(false);

    setTimeout(() => {
      props.initStageAction(true);
    }, 0);
  };

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
          <>
            {!props.isSpin ? startingField : null}
            {props.isSpin ? gameField : null}
            <Container position={[1000, 575]}>
              <Sprite
                width={100}
                height={100}
                image={spinImg}
                pointerdown={spin}
                eventMode={'dynamic'}
              />
            </Container>
          </>
        )}
      </Stage>
    </div>
  );
};

export default Game;
