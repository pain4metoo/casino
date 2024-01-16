import { NavLink } from 'react-router-dom';
import styles from './Navbar-Unauth.module.scss';

const NavbarUnauth = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to='/' className={styles.link}>
        register
      </NavLink>
      <NavLink to='/login' className={styles.link}>
        login
      </NavLink>
    </nav>
  );
};

export default NavbarUnauth;
