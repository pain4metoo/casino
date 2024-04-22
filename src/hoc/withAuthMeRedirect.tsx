import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const mapStateToPropsForRedirect = (state: any) => ({
  id: localStorage.getItem('id'),
  token: localStorage.getItem('token'),
  isAuth: state.auth.user.isAuth,
});

export const withAuthMeRedirect = (Component: any) => {
  const RedirectComponent = (props: any) => {
    if (!props.id || !props.token) {
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
