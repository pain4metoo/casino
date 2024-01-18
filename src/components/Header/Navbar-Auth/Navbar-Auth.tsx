import { NavLink } from 'react-router-dom';
import styles from './Navbar-Auth.module.scss';
import Button from 'react-bootstrap/Button';

const NavbarAuth = (props: any) => {
  return (
    <nav className={styles.nav}>
      <NavLink to='/profile' className={styles.link}>
        <Button className={styles.button} variant='secondary' size='lg'>
          Profile
        </Button>
      </NavLink>
      <NavLink to='/game' className={styles.link}>
        <Button className={styles.button} variant='secondary' size='lg'>
          Game
        </Button>
      </NavLink>
      <NavLink to='/score' className={styles.link}>
        <Button className={styles.button} variant='secondary' size='lg'>
          Score
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
