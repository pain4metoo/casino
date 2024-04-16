import { Container, Graphics, Sprite, useApp, useTick } from '@pixi/react';
import { Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';
import { ISymbol } from '../GenerateGameLogic';
import LoadSymbol from './LoadSymbol';
import bgLoading from '../../../assets/images/bg-loading-slot.jpg';

const Loading = (props: any) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const setProgressEvent = () => {
      setProgress(progress + 30);
    };

    if (!props.isLoadData && !props.isEndLoadData) {
      props.setDataAction();
      props.loadDataAction(true);
    } else {
      if (Object.keys(props.gameData).length > 0) {
        if (!props.isEndLoadData) {
          for (let i = 0; i < props.gameData.img.symbolsDef.length; i++) {
            props.gameData.videos.symbolsWin[i].baseTexture.on(
              'loaded',
              setProgressEvent,
            );
            props.gameData.img.symbolsDef[i].baseTexture.on(
              'loaded',
              setProgressEvent,
            );

            if (progress >= 600) {
              props.setEndLoadData();
            }
          }
        }
      }
    }

    return () => {
      if (Object.keys(props.gameData).length > 0) {
        for (let i = 0; i < props.gameData.img.symbolsDef.length; i++) {
          props.gameData.img.symbolsDef[i].baseTexture.off(
            'loaded',
            setProgressEvent,
          );
          props.gameData.videos.symbolsWin[i].baseTexture.off(
            'loaded',
            setProgressEvent,
          );
        }
      }
    };
  });

  const drawLoading = (g: any) => {
    g.beginFill(0x927ab1, 1);
    g.drawRect(300, 550, 600, 50);
    g.endFill();
  };

  const drawProgress = (g: any) => {
    g.beginFill(0xff003e, 1);
    g.drawRect(300, 550, progress, 50);
    g.endFill();
  };

  const drawBtnStart = (g: any) => {
    g.beginFill(0x86ff02, 1);
    g.drawRect(400, 500, 400, 70);
    g.eventMode = 'dynamic';
    g.endFill();
    g.on('pointerdown', () => {
      props.setVideoSettings();
      props.setGenerateDefauldField();
    });
  };

  let numberSymbol = 0;

  const loadSymbolsArr = props.loadField.map((arr: Array<ISymbol>) => {
    return arr.map((symbol: ISymbol) => {
      numberSymbol++;
      return (
        <LoadSymbol
          key={numberSymbol}
          symbolData={symbol}
          gameData={props.gameData}
        />
      );
    });
  });

  return (
    <>
      <Container>
        <Sprite image={bgLoading} width={1200} height={700} />
        {props.isLoadData ? (
          <>
            <Sprite image={bgLoading} width={1200} height={700} />
            <Graphics draw={drawLoading}></Graphics>
            <Graphics draw={drawProgress}></Graphics>
          </>
        ) : (
          <>
            <Graphics draw={drawBtnStart}></Graphics>
            <Text
              text='START GAME'
              x={420}
              y={510}
              style={
                new PIXI.TextStyle({
                  align: 'center',
                  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                  fontSize: 40,
                  fontWeight: '400',
                  fill: ['#ffffff', '#00ff99'], // gradient
                  stroke: '#01d27e',
                  strokeThickness: 5,
                  letterSpacing: 10,
                  dropShadow: true,
                  dropShadowColor: '#ccced2',
                  dropShadowBlur: 4,
                  dropShadowAngle: Math.PI / 6,
                  dropShadowDistance: 6,
                  wordWrap: false,
                  wordWrapWidth: 440,
                })
              }
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Loading;
