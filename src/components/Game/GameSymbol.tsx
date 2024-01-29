import { Container, Sprite, useApp, useTick } from '@pixi/react';
import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

const Symbol = (props: any) => {
  const symbolContainer: any = useRef(null);

  let startY = -500;

  if (props.symbolData.yEnd > 500) {
    startY = 0;
  } else if (props.symbolData.yEnd > 400) {
    startY = -1000;
  } else if (props.symbolData.yEnd > 300) {
    startY = -2000;
  } else if (props.symbolData.yEnd > 200) {
    startY = -3000;
  } else if (props.symbolData.yEnd > 100) {
    startY = -4000;
  } else if (props.symbolData.yEnd > 0) {
    startY = -5000;
  }

  let [y, setY] = useState(startY);

  // useEffect(() => {
  //   if (props.symbolData.isWin && !props.isRunning) {
  //     if (symbolContainer.current) {
  //       symbolContainer.current.addChild(resultGIFImages[props.symbolData.id]);
  //     }
  //   }
  // });

  useTick(() => {
    if (y <= props.symbolData.yEnd) {
      setY(y + 30);
    }
    if (y >= props.symbolData.yEnd) {
    }
  });

  const image = require(`../../assets/images/symbols/${props.symbolData.id}.png`);
  let winImage = '';

  if (props.symbolData.isWin) {
    winImage = require(`../../assets/images/symbols-win/${props.symbolData.id}.mp4`);

    const bg = PIXI.Texture.from(winImage);

    (bg.baseTexture.resource as any).source.loop = true;
  }

  return (
    <Container ref={symbolContainer} position={[props.symbolData.xStart, y]}>
      <Sprite
        image={props.symbolData.isWin ? winImage : image}
        width={props.symbolData.width}
        height={props.symbolData.height}
      />
    </Container>
  );
};

export default Symbol;
