import { NavLink } from 'react-router-dom';
import styles from './Navbar-Auth.module.scss';

const NavbarAuth = (props: any) => {
  return (
    <nav className={styles.nav}>
      <NavLink to='/profile' className={styles.link}>
        profile
      </NavLink>
      <NavLink to='/game' className={styles.link}>
        game
      </NavLink>
      <NavLink to='/score' className={styles.link}>
        score
      </NavLink>
      <NavLink
        to='/'
        className={styles.link}
        onClick={() => props.exitFromProfile()}>
        exit
      </NavLink>
    </nav>
  );
};

export default NavbarAuth;
