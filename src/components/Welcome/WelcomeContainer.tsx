import { connect } from 'react-redux';
import Welcome from './Welcome';
import { isAuthMeThunk } from '../../redux/auth-reducer';
import { giveMeMoneyThunk } from '../../redux/game-reducer';

const WelcomeContainer = (props: any) => {
  if (!props.isAuth) {
    props.isAuthMeThunk();
  }
  return <Welcome {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isShowModalError: state.auth.authWarnings.isShowModalError,
    isAuth: state.auth.user.isAuth,
    login: state.auth.user.login,
    isMoneyBtnOff: state.game.isMoneyBtnOff,
    giveMeMoneyCount: state.game.giveMeMoneyCount,
  };
};

export default connect(mapStateToProps, {
  isAuthMeThunk,
  giveMeMoneyThunk,
})(WelcomeContainer);
