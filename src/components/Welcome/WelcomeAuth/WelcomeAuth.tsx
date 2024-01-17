import Game from '../../Game/Game';

const WelcomeAuth = (props: any) => {
  return (
    <div>
      <p>Hello {props.email}</p>
    </div>
  );
};

export default WelcomeAuth;
