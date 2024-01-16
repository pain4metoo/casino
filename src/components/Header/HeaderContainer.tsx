import { connect } from 'react-redux';
import Header from './Header';

const HeaderContainerApi = (props: any) => {
  return <Header {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const HeaderContainer = connect(mapStateToProps)(HeaderContainerApi);

export default HeaderContainer;
