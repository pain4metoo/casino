import { Container, Sprite } from '@pixi/react';

const LoadSymbol = (props: any) => {
  let defaultSymbol = props.gameData.img.symbolsDef[props.symbolData.id - 1];
  let winSymbol = props.gameData.videos.symbolsWin[props.symbolData.id - 1];

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
