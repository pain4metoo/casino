import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import styles from './Navbar-Unauth.module.scss';

const NavbarUnauth = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to='/' className={styles.link}>
        <Button className={styles.button} variant='secondary' size='lg'>
          register
        </Button>
      </NavLink>
      <NavLink to='/login' className={styles.link}>
        <Button className={styles.button} variant='secondary' size='lg'>
          login
        </Button>
      </NavLink>
    </nav>
  );
};

export default NavbarUnauth;
