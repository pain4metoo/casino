import * as PIXI from 'pixi.js';
import { AnimatedSprite, Container, Sprite, Text } from '@pixi/react';
import { gameData } from './Textures';
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
          x={props.positionElements.volume.x}
          y={props.positionElements.volume.y}
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
          x={props.positionElements.textBalance.x}
          y={props.positionElements.textBalance.y}
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
          x={props.positionElements.textTotalWin.x}
          y={props.positionElements.textTotalWin.y}
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
          x={props.positionElements.textLastWin.x}
          y={props.positionElements.textLastWin.y}
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
          x={props.positionElements.textBet.x}
          y={props.positionElements.textBet.y}
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
            x={props.positionElements.arrowTop.x}
            y={props.positionElements.arrowTop.y}
            width={30}
            height={30}
            isPlaying={true}
            textures={readyGameDataArrowUp}
            animationSpeed={0.5}
          />
        ) : (
          <Sprite
            x={props.positionElements.arrowTop.x}
            y={props.positionElements.arrowTop.y}
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
            x={props.positionElements.arrowBottom.x}
            y={props.positionElements.arrowBottom.y}
            width={30}
            height={30}
            isPlaying={true}
            textures={readyGameDataArrowLow}
            animationSpeed={0.5}
          />
        ) : (
          <Sprite
            x={props.positionElements.arrowBottom.x}
            y={props.positionElements.arrowBottom.y}
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
            x={props.positionElements.spinBtn.x}
            y={props.positionElements.spinBtn.y}
            width={100}
            height={100}
            isPlaying={true}
            textures={readyGameDataSpinBtnOff}
            animationSpeed={0.5}
          />
        ) : (
          <Sprite
            x={props.positionElements.spinBtn.x}
            y={props.positionElements.spinBtn.y}
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
