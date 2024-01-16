import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const mapStateToPropsForRedirect = (state: any) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component: any) => {
  const RedirectComponent = (props: any) => {
    if (!props.isAuth) return <Navigate to={'/login/'} />;

    return <Component {...props} />;
  };

  const connectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent,
  );

  return connectedAuthRedirectComponent;
};
