import styles from './WelcomeAuth.module.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import casinoIMG from '../../../assets/images/casino.png';
import { NavLink } from 'react-router-dom';
import useSound from 'use-sound';
import moneySound from '../../../assets/sounds/give-money.mp3';

const WelcomeAuth = (props: any) => {
  const [playMoneySound] = useSound(moneySound, {
    volume: 0.1,
  });

  return (
    <div>
      <p className={styles.welcome}>Hello {props.login}!</p>
      <Card className={styles.card} style={{ width: '40rem' }}>
        <Card.Img className={styles.img} variant='top' src={casinoIMG} />
        <Card.Body className={styles.welcome_card}>
          <Card.Title className={styles.welcome_title}>
            Anubis's Fortune
          </Card.Title>
          <Card.Text className={styles.welcome_text}>
            Immerse yourself in the world of ancient Egypt and test your luck in
            the Anubis's Fortune slot. To win you must find 7 or more identical
            symbols.
          </Card.Text>
          <NavLink to='/game' className={styles.link}>
            <Button className={styles.btn} variant='secondary' size='lg'>
              Play
            </Button>
          </NavLink>
        </Card.Body>
      </Card>
      <Button
        className={`${styles.btn} ${styles.money}`}
        variant='secondary'
        size='lg'
        disabled={props.isMoneyBtnOff}
        onClick={() => {
          props.giveMeMoneyThunk();
          playMoneySound();
        }}>
        {props.isMoneyBtnOff && props.giveMeMoneyCount > 0
          ? `+ ${props.giveMeMoneyCount}$`
          : 'Give me money!'}
      </Button>
    </div>
  );
};

export default WelcomeAuth;
