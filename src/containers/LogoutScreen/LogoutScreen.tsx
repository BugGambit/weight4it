import React, { useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'api/firebase';
import { useHistory } from 'react-router-dom';
import Spinner from 'components/Spinner/Spinner';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.b`
  font-size: 25px;
  margin-bottom: 10px;
`;

function LogoutScreen() {
  const history = useHistory();
  useEffect(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.replace('/');
      });
  }, [history]);
  return (
    <>
      <Container>
        <Text>Signing out...</Text>
        <Spinner />
      </Container>
    </>
  );
}

export default LogoutScreen;
