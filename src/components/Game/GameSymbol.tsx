import { Container, Sprite, useApp, useTick } from '@pixi/react';
import { useState } from 'react';
import * as PIXI from 'pixi.js';

const Symbol = (props: any) => {
  const app = useApp();

  const [yStart, setYStart] = useState(props.symbolData.yStart);

  useTick(() => {
    if (props.isRunning) {
      if (yStart <= props.symbolData.yEnd) {
        setYStart(yStart + 25);
      } else {
        if (props.isLastSymbol && !props.isWin) {
          app.stop();
          setTimeout(() => {
            props.checkWinThunk();
            app.start();
          }, 1000);
        }
      }
    }
  });

  let image = require(`../../assets/images/symbols/${props.symbolData.id}.png`);
  let winImage = '';

  if (props.symbolData.isWin) {
    winImage = require(`../../assets/images/symbols-win/${props.symbolData.id}.mp4`);

    const bg = PIXI.Texture.from(winImage);

    (bg.baseTexture.resource as any).source.loop = true;

    if (props.isRemoveSymbolsStage) {
      return null;
    }
  }

  return (
    <Container position={[props.symbolData.xStart, yStart]}>
      <Sprite
        image={props.symbolData.isWin ? winImage : image}
        width={props.symbolData.width}
        height={props.symbolData.height}
      />
    </Container>
  );
};

export default Symbol;
