import { NavLink } from 'react-router-dom';
import styles from './Navbar-Auth.module.scss';
import Button from 'react-bootstrap/Button';

const NavbarAuth = (props: any) => {
  return (
    <nav className={styles.nav}>
      <NavLink className={`${styles.link} ${styles.header_info}`} to='/'>
        <p className={styles.name}>{props.name}</p>
        <p className={styles.balance}>{'Balance: ' + props.balance + '$'}</p>
      </NavLink>
      <NavLink to='/game' className={styles.link}>
        <Button className={styles.button} variant='secondary' size='lg'>
          Game
        </Button>
      </NavLink>
      <NavLink
        to='/'
        className={styles.link}
        onClick={() => props.exitFromProfile()}>
        <Button className={styles.button} variant='secondary' size='lg'>
          Exit
        </Button>
      </NavLink>
    </nav>
  );
};

export default NavbarAuth;
