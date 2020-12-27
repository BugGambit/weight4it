import React from 'react';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import LoginScreen from 'containers/LoginScreen/LoginScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingScreen from 'containers/LandingScreen/LandingScreen';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'constants/theme';
import 'api/firebase';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: 'Roboto', sans-serif;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <Switch>
            <Route path="/login">
              <LoginScreen />
            </Route>
            <PrivateRoute path="/">
              <LandingScreen />
            </PrivateRoute>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
