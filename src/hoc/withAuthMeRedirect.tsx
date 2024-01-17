import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const mapStateToPropsForRedirect = () => ({
  id: localStorage.getItem('id'),
  email: localStorage.getItem('email'),
  token: localStorage.getItem('token'),
});

export const withAuthMeRedirect = (Component: any) => {
  const RedirectComponent = (props: any) => {
    if (!props.id || !props.email || !props.token) {
      return <Navigate to={'/login/'} />;
    }

    return <Component {...props} />;
  };

  const connectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent,
  );

  return connectedAuthRedirectComponent;
};
