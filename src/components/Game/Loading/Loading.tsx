import { Container, Graphics, Sprite } from '@pixi/react';
import { Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import GenerateSpinCycle from '../GenerateGameLogic';
import bgLoading from '../../../assets/images/bg-loading-slot.jpg';
import preloader from '../../../assets/images/preloader-test.svg';

const Loading = (props: any) => {
  const maxProgress = 600;

  const drawLoading = (g: any) => {
    g.beginFill(0x927ab1, 1);
    g.drawRect(300, 550, 600, 50);
    g.endFill();
  };

  const drawProgress = (g: any) => {
    g.beginFill(0xff003e, 1);
    g.drawRect(300, 550, props.loadProgress * maxProgress, 50);
    g.endFill();
  };

  const drawBtnStart = (g: any) => {
    g.beginFill(0x86ff02, 1);
    g.drawRect(400, 500, 400, 70);
    g.eventMode = 'dynamic';
    g.endFill();
    g.on('pointerdown', () => {
      props.setGenerateDefauldField({
        isStartGame: true,
        startingField: GenerateSpinCycle.generateDefaultField(),
      });
    });
  };

  return (
    <>
      <Container>
        {props.isShowPreloader ? (
          <Sprite image={preloader} width={400} height={400} x={400} y={100} />
        ) : (
          <Sprite image={bgLoading} x={0} y={0} width={1200} height={700} />
        )}

        {props.isShowLoadProgress && (
          <>
            <Graphics draw={drawLoading}></Graphics>
            <Graphics draw={drawProgress}></Graphics>
          </>
        )}

        {props.isEndLoadData && (
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
