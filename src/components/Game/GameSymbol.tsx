import { Container, Sprite, useApp, useTick } from '@pixi/react';
import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { symbols, symbolsWin } from './Textures';

const Symbol = (props: any) => {
  const [yStart, setYStart] = useState(props.symbolData.yStart);

  useTick(() => {
    if (yStart <= props.symbolData.yEnd) {
      setYStart(yStart + 25);
    }
  });

  if (props.isLastSymbol) {
    // if (!props.isWinStage && props.isSpin) {
    //   setTimeout(() => {
    //     props.winStageAction();
    //   }, 1500);
    // }
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

  let defaultSymbol = props.data.symbols[props.symbolData.id - 1];
  let winSymbol = props.data.symbolsWin[props.symbolData.id - 1];

  // if (props.isLoadData) {
  //   if (props.isWinSymbols) {
  //     console.log(1);
  //     const videoResource = new PIXI.VideoResource(winSymbol, {
  //       autoPlay: false,
  //     });

  //     const videoTexture = PIXI.Texture.from(videoResource as any);

  //     winSymbol = videoTexture;
  //   }
  // }

  if (props.symbolData.isWin) {
    defaultSymbol = props.data.symbolsWin[props.symbolData.id - 1];

    const bg = PIXI.Texture.from(defaultSymbol);

    (bg.baseTexture.resource as any).resource.autoPlay = false;
  }

  return (
    <Container position={[props.symbolData.xStart, yStart]}>
      <Sprite
        texture={defaultSymbol}
        width={props.symbolData.width}
        height={props.symbolData.height}
      />
    </Container>
  );
};

export default Symbol;
