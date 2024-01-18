import Game from '../../Game/Game';

const WelcomeAuth = (props: any) => {
  return (
    <div>
      <p>Hello {props.login}</p>
    </div>
  );
};

export default WelcomeAuth;
