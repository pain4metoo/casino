import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const mapStateToPropsForRedirect = (state: {
  auth: { user: { isAuth: boolean } };
}) => ({
  isAuth: state.auth.user.isAuth,
});

export const withAuthMeRedirect = (Component: any) => {
  const RedirectComponent = (props: any) => {
    const id = localStorage.getItem('casinoId');
    const token = localStorage.getItem('casinoToken');

    if (!id || !token) {
      if (!props.isAuth) {
        return <Navigate to={'/login/'} />;
      }
    }

    return <Component {...props} />;
  };

  const connectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent,
  );

  return connectedAuthRedirectComponent;
};
