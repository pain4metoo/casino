import styles from './Game.module.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import casinoIMG from '../../assets/images/casino.jpg';

const Game = (props: any) => {
  return (
    <div className='game'>
      <Card className={styles.card} style={{ width: '40rem' }}>
        <Card.Img variant='top' src={casinoIMG} />
        <Card.Body>
          <Card.Title>Anubis's Fortune</Card.Title>
          <Card.Text>
            Immerse yourself in the world of ancient Egypt and test your luck in
            the Anubis's Fortune slot.
          </Card.Text>
          <Button className={styles.btn} variant='primary' size='lg'>
            Play
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Game;
