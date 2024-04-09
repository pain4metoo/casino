import styles from './Game.module.scss';
import { Stage, Container, Sprite } from '@pixi/react';
import { ISymbol } from './GenerateGameLogic';
import Symbol from './GameSymbol';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import LoadingContainer from './Loading/LoadingContainer';
import spinImg from '../../assets/images/spin.png';

const Game = (props: any) => {
  let numberSymbol = 0;

  function createSymbols(arr: Array<Array<ISymbol>>) {
    return arr.map((arr: Array<ISymbol>, i: number) => {
      return arr.map((symbol: ISymbol, g) => {
        numberSymbol += 1;

        return (
          <Symbol
            key={numberSymbol}
            isRemoveSymbolsStage={props.isRemoveSymbolsStage}
            isOmitStage={props.isOmitStage}
            symbolData={symbol}
            gameData={props.gameData}
            isAdditionStage={props.isAdditionStage}
          />
        );
      });
    });
  }

  const startingField = createSymbols(props.startingField);
  const gameField = createSymbols(props.gameField);

  const spin = () => {
    props.spinCycleThunk(true);

    setTimeout(() => {
      props.spinCycleThunk(false);
    }, 500);
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
            {!props.isInitStage ? startingField : null}
            {props.isInitStage && !props.isAdditionStage ? gameField : null}

            {props.isAdditionStage ? gameField : null}

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
