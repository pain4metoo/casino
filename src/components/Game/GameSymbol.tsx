import { Container, Sprite, useApp, useTick } from '@pixi/react';
import { useEffect, useState } from 'react';
import { gameData } from './Textures';

const Symbol = (props: any) => {
  const [yStart, setYStart] = useState(props.symbolData.yStart);

  const defaultSymbol = gameData.img.symbolsDef[props.symbolData.id - 1];
  let winSymbol = gameData.videos.symbolsWin[props.symbolData.id - 1];

  useTick((delta, ticker) => {
    if (yStart < props.symbolData.yEnd) {
      setYStart(yStart + 25);
    }
  });

  if (props.symbolData.isWin) {
    if (props.isRemoveSymbolsStage) {
      return null;
    }

    winSymbol.baseTexture.resource.source.play();
  }

  return (
    <Container position={[props.symbolData.xStart, yStart]}>
      <Sprite
        texture={props.symbolData.isWin ? winSymbol : defaultSymbol}
        width={props.symbolData.width}
        height={props.symbolData.height}
      />
    </Container>
  );
};

export default Symbol;
