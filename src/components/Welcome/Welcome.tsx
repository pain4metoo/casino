import styles from './Welcome.module.scss';
import WelcomeAuth from './WelcomeAuth/WelcomeAuth';
import WelcomeUnauthContainer from './WelcomeUnauth/WelcomeUnauthContainer';

const Welcome = (props: any) => {
  return (
    <div className={styles.welcome}>
      {props.isAuth ? <WelcomeAuth {...props} /> : <WelcomeUnauthContainer />}
    </div>
  );
};

export default Welcome;
