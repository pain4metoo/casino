import * as PIXI from 'pixi.js';
import { AnimatedSprite, Container, Sprite, Text } from '@pixi/react';
import { gameData } from './textures';
import {
  readyGameDataArrowLow,
  readyGameDataArrowUp,
  readyGameDataSpinBtnOff,
} from './textures-create';
import useSound from 'use-sound';
import btnBetSound from '../../assets/sounds/button_click.mp3';

const GameControls = (props: any) => {
  const [playBtnBetSound] = useSound(btnBetSound, {
    volume: props.isOnSound ? 0.3 : 0,
  });

  return (
    <>
      <Container>
        <Sprite
          x={15}
          y={15}
          width={70}
          height={70}
          image={props.isOnSound ? gameData.volumeOn : gameData.volumeOff}
          pointerdown={() => {
            props.setSoundState({ flag: !props.isOnSound });
          }}
          eventMode={'dynamic'}
        />
        <Text
          text={'Balance: ' + props.balance + '$'}
          x={20}
          y={620}
          style={
            new PIXI.TextStyle({
              align: 'center',
              fontFamily: '"Thasadith", Helvetica, sans-serif',
              fontSize: 30,
              fontWeight: '600',
              fill: props.isNotEnoughMoney
                ? ['#f01414', '#c2c2c2']
                : ['#FFA07A', '#FFA07A'], // gradient
              stroke: '#01d27e',
              wordWrap: false,
              wordWrapWidth: 100,
            })
          }
        />
        <Text
          text={'Total win: ' + props.totalWinAmount + '$'}
          x={20}
          y={520}
          style={
            new PIXI.TextStyle({
              align: 'center',
              fontFamily: '"Thasadith", Helvetica, sans-serif',
              fontSize: 30,
              fontWeight: '600',
              fill: ['#FFA07A', '#FFA07A'], // gradient
              stroke: '#01d27e',
              wordWrap: false,
              wordWrapWidth: 100,
            })
          }
        />
        <Text
          text={'Last win: ' + props.winAmount + '$'}
          x={20}
          y={570}
          style={
            new PIXI.TextStyle({
              align: 'center',
              fontFamily: '"Thasadith", Helvetica, sans-serif',
              fontSize: 30,
              fontWeight: '600',
              fill: ['#FFA07A', '#FFA07A'], // gradient
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
              fontWeight: '600',
              fill: props.isNotEnoughMoney
                ? ['#f01414', '#c2c2c2']
                : ['#FFA07A', '#FFA07A'], // gradient
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
            pointerdown={() => {
              props.handlePlaceBetUp();
              playBtnBetSound();
            }}
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
            pointerdown={() => {
              props.handlePlaceBetLow();
              playBtnBetSound();
            }}
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
