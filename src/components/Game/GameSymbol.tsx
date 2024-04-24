import { Container, Sprite, useApp, useTick } from '@pixi/react';
import { useState } from 'react';
import { pixiData } from '../../redux/loading-reducer';
import { gameData } from './Textures';

const Symbol = (props: any) => {
  const app = useApp();
  const [yStart, setYStart] = useState(props.symbolData.yStart);

  let winSymbol: any = gameData.symbolsWin[props.symbolData.id - 1];
  const defaultSymbol: any = pixiData.symbolsDef[props.symbolData.id - 1];
  console.log(winSymbol);
  useTick((delta, ticker) => {
    if (yStart < props.symbolData.yEnd) {
      setYStart(yStart + 25);
    }
  });

  if (props.symbolData.isWin) {
    if (props.isRemoveSymbolsStage) {
      return null;
    }
  }

  // const gif = pixiData.symbolsWin[props.symbolData.id - 1];
  // gif.width = 100;
  // gif.height = 100;
  // gif.x = props.symbolData.xStart;
  // gif.y = yStart;
  // app.stage.addChild(gif);

  return (
    <Container position={[props.symbolData.xStart, yStart]}>
      {props.symbolData.isWin ? (
        <Sprite
          image={winSymbol}
          width={props.symbolData.width}
          height={props.symbolData.height}
        />
      ) : (
        <Sprite
          texture={defaultSymbol}
          width={props.symbolData.width}
          height={props.symbolData.height}
        />
      )}
    </Container>
  );
};

export default Symbol;
