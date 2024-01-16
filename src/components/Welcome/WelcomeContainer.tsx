import { connect } from 'react-redux';
import Welcome from './Welcome';

const WelcomeContainer = (props: any) => {
  return <Welcome {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps)(WelcomeContainer);
