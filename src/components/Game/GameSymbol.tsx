import { AnimatedSprite, Container, Sprite, useTick } from '@pixi/react';
import { useState } from 'react';
import { gameData } from './textures';
import {
  readyGameDataFireTextures,
  readyGameDataSymbolsWin,
} from './textures-create';
import * as PIXI from 'pixi.js';

const Symbol = (props: any) => {
  const [yStart, setYStart] = useState(props.symbolData.yStart);

  const defaultSymbol: string = gameData.symbolsDef[props.symbolData.id - 1];
  const winSymbol: Array<PIXI.Texture> =
    readyGameDataSymbolsWin[props.symbolData.id - 1];

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
    <>
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
      </Container>
      {props.isDarkGame && props.isLastSymbolInColumn && (
        <AnimatedSprite
          x={350 + props.numberOfColumn * 100}
          y={640}
          isPlaying={true}
          textures={readyGameDataFireTextures}
          width={props.symbolData.width}
          height={props.symbolData.height}
          animationSpeed={0.3}
          loop={true}
        />
      )}
    </>
  );
};

export default Symbol;
