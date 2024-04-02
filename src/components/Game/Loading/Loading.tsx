import { Container, Graphics, useApp, useTick } from '@pixi/react';
import { Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';
import { ISymbol } from '../GenerateGameLogic';
import LoadSymbol from './LoadSymbol';

const Loading = (props: any) => {
  useEffect(() => {
    props.setDataAction();
    props.loadDataAction(true);
  }, []);

  const [progress, setProgress] = useState(0);

  function setNewProgress(value: number): void {
    const maxProgress = 600;
    const currentValue = progress + value;

    if (currentValue === maxProgress) {
      setTimeout(() => {
        props.setEndLoadData();
      }, 200);
    }

    setProgress(currentValue);
  }

  const drawScreen = (g: any) => {
    g.beginFill(0x0033cc, 1);
    g.drawRect(0, 0, 1200, 700);
    g.endFill();
  };

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
    g.interactive = true;
    g.endFill();
    g.on('pointerdown', () => {
      props.setGenerateDefauldField();
    });
  };

  let numberSymbol = 0;

  const symbolsArr = props.loadField.map((arr: Array<ISymbol>, i: number) => {
    return arr.map((symbol: ISymbol) => {
      numberSymbol++;
      return (
        <LoadSymbol
          isLoadData={props.isLoadData}
          key={numberSymbol}
          symbolData={symbol}
          data={props.data}
          isWinSymbol={i === 0 ? true : false}
          setNewProgress={setNewProgress}
        />
      );
    });
  });

  return (
    <>
      <Container>
        <Graphics draw={drawScreen}></Graphics>
        {props.isLoadData ? (
          <>
            {symbolsArr}
            <Graphics draw={drawScreen}></Graphics>
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
