import { Container, Sprite } from '@pixi/react';
import { gameData } from '../Textures';

const LoadSymbol = (props: any) => {
  let defaultSymbol = gameData.img.symbolsDef[props.symbolData.id - 1];
  let winSymbol = gameData.videos.symbolsWin[props.symbolData.id - 1];

  return (
    <Container position={[350, 350]}>
      <Sprite
        texture={props.symbolData.isWin ? winSymbol : defaultSymbol}
        width={props.symbolData.width}
        height={props.symbolData.height}
      />
    </Container>
  );
};

export default LoadSymbol;
