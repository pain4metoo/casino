import styles from './Header.module.scss';
import logo from '../../assets/images/logo.jpg';
import NavbarAuth from './Navbar-Auth/Navbar-Auth';
import NavbarUnauth from './Navbar-Unauth/Navbar-Unauth';
import { NavLink } from 'react-router-dom';

const Header = (props: any) => {
  return (
    <div className={styles.header}>
      <NavLink to={'/'}>
        <img className={styles.logo} src={logo} alt='logo' />
      </NavLink>

      {props.isAuth ? <NavbarAuth {...props} /> : <NavbarUnauth />}
    </div>
  );
};

export default Header;
