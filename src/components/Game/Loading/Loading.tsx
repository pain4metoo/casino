import { Container, Graphics } from '@pixi/react';
import styles from './Loading.scss';

const Loading = () => {
  const draw = (g: any) => {
    g.beginFill(0x0033cc, 1);
    g.drawRect(0, 0, 1200, 700);
    g.endFill();
  };

  return (
    <>
      <Container>
        <Graphics draw={draw}></Graphics>
      </Container>
    </>
  );
};

export default Loading;
