import { Container, Sprite, useApp, useTick } from '@pixi/react';
import { useEffect, useState } from 'react';

const Symbol = (props: any) => {
  const app = useApp();
  const [yStart, setYStart] = useState(props.symbolData.yStart);

  useEffect(() => {
    app.start();

    return () => app.stop();
  }, []);

  useTick((delta, ticker) => {
    if (yStart <= props.symbolData.yEnd) {
      setYStart(yStart + 25);
    } else {
      if (props.isLastSymbol) {
        props.winStageAction();
        app.stop();
      }
    }
  });

  let defaultSymbol = props.data.symbols[props.symbolData.id - 1];
  let winSymbol = props.data.symbolsWin[props.symbolData.id - 1];

  if (props.symbolData.isWin) {
    return null;
  }

  return (
    <Container position={[props.symbolData.xStart, yStart]}>
      <Sprite
        texture={props.symbolData.isWin ? winSymbol : defaultSymbol}
        width={props.symbolData.width}
        height={props.symbolData.height}
      />
    </Container>
  );
};

export default Symbol;
