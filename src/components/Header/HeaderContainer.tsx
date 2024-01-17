import { connect } from 'react-redux';
import Header from './Header';
import { exitFromProfile } from '../../redux/auth-reducer';

const HeaderContainerApi = (props: any) => {
  return <Header {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const HeaderContainer = connect(mapStateToProps, {
  exitFromProfile,
})(HeaderContainerApi);

export default HeaderContainer;
