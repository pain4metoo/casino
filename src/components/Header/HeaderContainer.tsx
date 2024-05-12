import { connect } from 'react-redux';
import Header from './Header';
import { exitFromProfile } from '../../redux/auth-reducer';

const HeaderContainer = (props: any) => {
  return <Header {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.user.isAuth,
    name: state.auth.user.login,
    balance: state.auth.user.balance,
  };
};

export default connect(mapStateToProps, {
  exitFromProfile,
})(HeaderContainer);
