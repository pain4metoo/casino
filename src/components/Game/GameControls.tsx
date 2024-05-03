import { Container, Sprite } from '@pixi/react';
import { gameData } from './textures';

const GameControls = (props: any) => {
  return (
    <>
      <Container position={[1000, 575]}>
        <Sprite
          width={100}
          height={100}
          image={gameData.spinBtn}
          pointerdown={() => props.handleClickSpin(100, 1000)}
          eventMode={'dynamic'}
        />
      </Container>
    </>
  );
};

export default GameControls;
