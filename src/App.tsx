import React from 'react';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import LoginScreen from 'containers/LoginScreen/LoginScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingScreen from 'containers/LandingScreen/LandingScreen';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import 'api/firebase';
import LogoutScreen from 'containers/LogoutScreen/LogoutScreen';
import { StoreProvider } from 'easy-peasy';
import store from 'store';
import ProfileScreen from 'containers/ProfileScreen/ProfileScreen';

const Container = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.foregroundColor};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <Container>
          <Router>
            <Switch>
              <Route path="/login">
                <LoginScreen />
              </Route>
              <Route path="/logout">
                <LogoutScreen />
              </Route>
              <PrivateRoute path="/profile">
                <ProfileScreen />
              </PrivateRoute>
              <PrivateRoute path="/">
                <LandingScreen />
              </PrivateRoute>
            </Switch>
          </Router>
        </Container>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
