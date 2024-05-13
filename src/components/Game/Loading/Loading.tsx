import * as PIXI from 'pixi.js';
import { AnimatedSprite, Container, Graphics, Sprite, Text } from '@pixi/react';
import GenerateSpinCycle from '../GenerateGameLogic';
import bgLoading from '../../../assets/images/bg-loading-slot.jpg';
import { readyGameDataPreloader } from '../textures-create';

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
    g.beginFill(0x7a785c, 1);
    g.drawRect(400, 500, 400, 70);
    g.eventMode = 'dynamic';
    g.endFill();
    g.on('pointerdown', () => {
      props.setGenerateDefauldField({
        startingField: GenerateSpinCycle.generateDefaultField(),
      });
    });
  };

  return (
    <>
      <Container>
        {props.isShowPreloader ? (
          <AnimatedSprite
            x={390}
            y={80}
            isPlaying={true}
            textures={readyGameDataPreloader}
          />
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
              x={494}
              y={510}
              style={
                new PIXI.TextStyle({
                  align: 'center',
                  fontFamily: '"Thasadith", Helvetica, sans-serif',
                  fontSize: 40,
                  fontWeight: '400',
                  fill: ['#ffffff', '#ffffff'], // gradient
                  stroke: '#01d27e',
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
