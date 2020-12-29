import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { useStoreActions } from 'hooks/store';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.b`
  font-size: 40px;
`;

interface LocationState {
  from: {
    pathname: string;
  };
}

function LoginScreen() {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const resetStore = useStoreActions((actions) => actions.reset);
  const { from } = location.state || { from: { pathname: '/' } };

  // Configure FirebaseUI.
  const uiConfig: firebaseui.auth.Config = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: () => {
        // setTimeout is here to make sure onAuthStateChanged is called before redirect (so the app knows it is logged in)
        setImmediate(() => {
          resetStore();
          history.replace(from);
        });
        return true;
      },
    },
    // We will display Google as auth provider.
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        scopes: [
          // "https://www.googleapis.com/auth/user.gender.read",
          // "https://www.googleapis.com/auth/user.birthday.read",
        ],
      },
    ],
  };

  return (
    <Container>
      <Title>weight4it</Title>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Container>
  );
}

export default LoginScreen;
