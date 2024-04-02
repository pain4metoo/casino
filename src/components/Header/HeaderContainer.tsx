import { connect } from 'react-redux';
import Header from './Header';
import { exitFromProfile } from '../../redux/auth-reducer';

const HeaderContainer = (props: any) => {
  return <Header {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, {
  exitFromProfile,
})(HeaderContainer);
