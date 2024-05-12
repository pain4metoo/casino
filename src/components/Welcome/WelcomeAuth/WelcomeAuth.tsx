import styles from './WelcomeAuth.module.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import casinoIMG from '../../../assets/images/casino.jpg';
import { NavLink } from 'react-router-dom';

const WelcomeAuth = (props: any) => {
  return (
    <div>
      <p className={styles.welcome}>Hello {props.login}!</p>
      <Card className={styles.card} style={{ width: '40rem' }}>
        <Card.Img variant='top' src={casinoIMG} />
        <Card.Body>
          <Card.Title>Anubis's Fortune</Card.Title>
          <Card.Text>
            Immerse yourself in the world of ancient Egypt and test your luck in
            the Anubis's Fortune slot.
          </Card.Text>
          <NavLink to='/game'>
            <Button className={styles.btn} variant='primary' size='lg'>
              Play
            </Button>
          </NavLink>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WelcomeAuth;
