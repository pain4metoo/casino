import * as PIXI from 'pixi.js';
import { AnimatedSprite, Container, Sprite, Text } from '@pixi/react';
import { gameData, spinBtnOffTexture } from './textures';
import {
  readyGameDataArrowLow,
  readyGameDataArrowUp,
  readyGameDataSpinBtnOff,
} from './textures-create';

const GameControls = (props: any) => {
  return (
    <>
      <Container>
        <Text
          text={'Balance: ' + props.balance + '$'}
          x={20}
          y={620}
          style={
            new PIXI.TextStyle({
              align: 'center',
              fontFamily: '"Thasadith", Helvetica, sans-serif',
              fontSize: 30,
              fontWeight: '400',
              fill: props.isNotEnoughMoney
                ? ['#f01414', '#c2c2c2']
                : ['#ffffff', '#00ff99'], // gradient
              stroke: '#01d27e',
              wordWrap: false,
              wordWrapWidth: 100,
            })
          }
        />
        <Text
          text={'Win: ' + props.winAmount + '$'}
          x={20}
          y={560}
          style={
            new PIXI.TextStyle({
              align: 'center',
              fontFamily: '"Thasadith", Helvetica, sans-serif',
              fontSize: 30,
              fontWeight: '400',
              fill: ['#ffffff', '#00ff99'], // gradient
              stroke: '#01d27e',
              wordWrap: false,
              wordWrapWidth: 100,
            })
          }
        />
        <Text
          text={props.bet + '$'}
          x={940}
          y={610}
          style={
            new PIXI.TextStyle({
              align: 'center',
              fontFamily: 'Thasadith, sans-serif',
              fontSize: 30,
              fontWeight: '400',
              fill: props.isNotEnoughMoney
                ? ['#f01414', '#c2c2c2']
                : ['#ffffff', '#00ff99'], // gradient
              stroke: '#01d27e',
              wordWrap: false,
              wordWrapWidth: 100,
            })
          }
        />
        {props.isGameOn ? (
          <AnimatedSprite
            x={1035}
            y={590}
            width={30}
            height={30}
            isPlaying={true}
            textures={readyGameDataArrowUp}
            animationSpeed={0.5}
          />
        ) : (
          <Sprite
            x={1035}
            y={590}
            width={30}
            height={30}
            image={gameData.arrowTop}
            pointerdown={props.handlePlaceBetUp}
            eventMode={props.isGameOn ? 'none' : 'dynamic'}
          />
        )}
        {props.isGameOn ? (
          <AnimatedSprite
            x={1035}
            y={630}
            width={30}
            height={30}
            isPlaying={true}
            textures={readyGameDataArrowLow}
            animationSpeed={0.5}
          />
        ) : (
          <Sprite
            x={1035}
            y={630}
            width={30}
            height={30}
            image={gameData.arrowBottom}
            pointerdown={props.handlePlaceBetLow}
            eventMode={props.isGameOn ? 'none' : 'dynamic'}
          />
        )}

        {props.isGameOn ? (
          <AnimatedSprite
            x={1070}
            y={575}
            width={100}
            height={100}
            isPlaying={true}
            textures={readyGameDataSpinBtnOff}
            animationSpeed={0.5}
          />
        ) : (
          <Sprite
            x={1070}
            y={575}
            width={100}
            height={100}
            image={gameData.spinBtn}
            pointerdown={() => props.handleClickSpin(props.bet)}
            eventMode={props.isGameOn ? 'none' : 'dynamic'}
          />
        )}
      </Container>
    </>
  );
};

export default GameControls;
