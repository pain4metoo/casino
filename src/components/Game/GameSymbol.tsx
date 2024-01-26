import { Container, Sprite, useApp, useTick } from '@pixi/react';
import { useEffect, useRef, useState } from 'react';
import '@pixi/gif';
import { Assets } from '@pixi/assets';

const Symbol = (props: any) => {
  const app = useApp();
  const symbolContainer: any = useRef(null);
  let currentImage: any = null;

  useEffect(() => {
    const imageWIN = require(`../../assets/images/symbols-win/${props.symbolData.id}.gif`);
    const loadFIG = async () => {
      const gif = await Assets.load(imageWIN);

      return gif;
    };

    loadFIG().then(res => {
      currentImage = res;
    });
  });

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

  useTick(() => {
    if (y >= props.symbolData.yEnd) {
      if (props.symbolData.yEnd === 50) {
        props.setSpinIsRunningAction(false);
        if (props.symbolData.isWin) {
          if (symbolContainer.current) {
            symbolContainer.current.addChild(currentImage);
          }
        }
      }

      return false;
    }

    setY(y + 30);
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
