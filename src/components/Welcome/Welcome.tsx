import styles from './Welcome.module.scss';
import WelcomeAuth from './WelcomeAuth/WelcomeAuth';
import WelcomeUnauthContainer from './WelcomeUnauth/WelcomeUnauthContainer';
import ModalErrorContainer from '../Modals/ModalErrorContainer';

const Welcome = (props: any) => {
  return (
    <div className={styles.welcome}>
      {props.isShowModalError ? <ModalErrorContainer /> : null}
      {props.isAuth ? <WelcomeAuth {...props} /> : <WelcomeUnauthContainer />}
    </div>
  );
};

export default Welcome;
