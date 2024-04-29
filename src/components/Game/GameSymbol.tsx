import { AnimatedSprite, Container, Sprite, useTick } from '@pixi/react';
import { useState } from 'react';
import { gameDataDef } from './textures';
import { readyGameDataSymbolsWin } from './textures-create';

const Symbol = (props: any) => {
  const [yStart, setYStart] = useState(props.symbolData.yStart);

  let winSymbol: any = readyGameDataSymbolsWin[props.symbolData.id - 1];

  const defaultSymbol: any = gameDataDef.symbolsDef[props.symbolData.id - 1];

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

  return (
    <Container position={[props.symbolData.xStart, yStart]}>
      {props.symbolData.isWin ? (
        <AnimatedSprite
          isPlaying={true}
          textures={winSymbol}
          width={props.symbolData.width}
          height={props.symbolData.height}
          animationSpeed={0.3}
          initialFrame={0}
        />
      ) : (
        <Sprite
          image={defaultSymbol}
          width={props.symbolData.width}
          height={props.symbolData.height}
        />
      )}
    </Container>
  );
};

export default Symbol;
