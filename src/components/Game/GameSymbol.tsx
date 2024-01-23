import { Sprite, useTick } from '@pixi/react';
import { useState } from 'react';

const Symbol = (props: any) => {
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

  let tickerTime = 0;

  useTick(delta => {
    if (y >= props.symbolData.yEnd) {
      if (props.symbolData.yEnd === 50) {
        props.setSpinIsRunningAction(false);
      }
      return false;
    }

    tickerTime = 20 * delta;

    setY(tickerTime + y + 10);
  });

  const image = require(`../../assets/images/symbols/${props.symbolData.id}.png`);
  const imageWIN = require(`../../assets/images/symbols-win/${props.symbolData.id}.gif`);

  return (
    <Sprite
      image={props.symbolData.isWin ? imageWIN : image}
      x={props.symbolData.xStart}
      y={y}
      width={props.symbolData.width}
      height={props.symbolData.height}
    />
  );
};

export default Symbol;
