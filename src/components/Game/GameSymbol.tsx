import { Container, Sprite, useApp, useTick } from '@pixi/react';
import { useState } from 'react';
import { symbols, symbolsWin } from './Textures';

const Symbol = (props: any) => {
  const app = useApp();

  const [yStart, setYStart] = useState(props.symbolData.yStart);

  useTick(() => {
    if (yStart <= props.symbolData.yEnd) {
      setYStart(yStart + 25);
    }
  });

  if (props.isLastSymbol) {
    if (!props.isWinStage) {
      setTimeout(() => {
        props.winStageAction();
      }, 1000);
    }
    // if (props.isOmitStage) {
    //   setTimeout(() => {
    //     props.omitStageAction();
    //   }, 1000);
    // }
    // if (!props.isAdditionStage) {
    //   setTimeout(() => {
    //     props.additionalStageAction();
    //   }, 1000);
    // }
  }

  let image = symbols[props.symbolData.id - 1];

  if (props.symbolData.isWin) {
    image = symbolsWin[props.symbolData.id - 1];

    // const bg = PIXI.Texture.from(image);

    // (bg.baseTexture.resource as any).source.loop = true;
  }

  return (
    <Container position={[props.symbolData.xStart, yStart]}>
      <Sprite
        image={image}
        width={props.symbolData.width}
        height={props.symbolData.height}
      />
    </Container>
  );
};

export default Symbol;
