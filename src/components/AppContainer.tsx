import { connect } from 'react-redux';
import App from './App';

const AppContainerApi = (props: any) => {
  return <App {...props} />;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const AppContainer = connect(mapStateToProps)(AppContainerApi);

export default AppContainer;
