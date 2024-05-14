import { AnimatedSprite, Container, Sprite, useTick } from '@pixi/react';
import { useEffect, useState } from 'react';
import { gameData } from './textures';
import {
  readyGameDataFireTextures,
  readyGameDataSymbolsWin,
} from './textures-create';

const Symbol = (props: any) => {
  const [yStart, setYStart] = useState(props.symbolData.yStart);

  const defaultSymbol: any = gameData.symbolsDef[props.symbolData.id - 1];
  const winSymbol: any = readyGameDataSymbolsWin[props.symbolData.id - 1];

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
          loop={true}
        />
      ) : (
        <Sprite
          image={defaultSymbol}
          width={props.symbolData.width}
          height={props.symbolData.height}
        />
      )}
      {props.isDarkGame && props.isLastSymbolInColumn && (
        <AnimatedSprite
          x={0}
          y={85}
          isPlaying={true}
          textures={readyGameDataFireTextures}
          width={props.symbolData.width}
          height={props.symbolData.height}
          animationSpeed={0.3}
          loop={true}
        />
      )}
    </Container>
  );
};

export default Symbol;
