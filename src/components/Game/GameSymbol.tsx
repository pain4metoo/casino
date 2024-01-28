import { Container, Sprite, useApp, useTick } from '@pixi/react';
import { useEffect, useRef, useState } from 'react';
import '@pixi/gif';
import * as PIXI from 'pixi.js';
import { Assets } from '@pixi/assets';
import { resultGIFImages } from './GameImagesData';

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

  useEffect(() => {
    if (props.symbolData.isWin && !props.isRunning) {
      if (symbolContainer.current) {
        // symbolContainer.current.removeChildren();
        symbolContainer.current.addChild(resultGIFImages[props.symbolData.id]);
      }
    }
  });

  useTick(() => {
    if (y <= props.symbolData.yEnd) {
      setY(y + 30);
    } else {
      if (props.symbolData.yEnd === 50) {
        props.setSpinIsRunningAction(false);
      }
    }
  });

  const image = require(`../../assets/images/symbols/${props.symbolData.id}.png`);

  return (
    <Container ref={symbolContainer} position={[props.symbolData.xStart, y]}>
      <Sprite
        image={image}
        width={props.symbolData.width}
        height={props.symbolData.height}
      />
    </Container>
  );
};

export default Symbol;
