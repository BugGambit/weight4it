import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

interface PrivateRouteProps {
  children: JSX.Element;
  path: string;
  exact?: boolean;
}

function PrivateRoute({ children, path, exact }: PrivateRouteProps) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn === null) {
    return null;
  }
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => {
        return isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
PrivateRoute.defaultProps = {
  exact: true,
} as Partial<PrivateRouteProps>;

export default PrivateRoute;
