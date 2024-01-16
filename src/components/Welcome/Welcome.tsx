import WelcomeAuth from './WelcomeAuth/WelcomeAuth';
import WelcomeUnauthContainer from './WelcomeUnauth/Welcome-Unauth-Container';

const Welcome = (props: any) => {
  return (
    <div className='welcome'>
      {props.isAuth ? <WelcomeAuth /> : <WelcomeUnauthContainer />}
    </div>
  );
};

export default Welcome;
