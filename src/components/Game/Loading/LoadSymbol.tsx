import { Container, Sprite } from '@pixi/react';

const LoadSymbol = (props: any) => {
  let defaultSymbol = props.data.symbols[props.symbolData.id - 1];
  let winSymbol = props.data.symbolsWin[props.symbolData.id - 1];
  const pixelsPerDownload = 30;

  if (props.isWinSymbol) {
    winSymbol.baseTexture.on('loaded', () => {
      props.setNewProgress(pixelsPerDownload);
    });
  } else {
    defaultSymbol.baseTexture.on('loaded', () => {
      props.setNewProgress(pixelsPerDownload);
    });
  }

  return (
    <Container position={[350, 350]}>
      <Sprite
        texture={props.isWinSymbol ? winSymbol : defaultSymbol}
        width={props.symbolData.width}
        height={props.symbolData.height}
      />
    </Container>
  );
};

export default LoadSymbol;
