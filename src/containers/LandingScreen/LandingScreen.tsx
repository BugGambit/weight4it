import React from 'react';
import useAuth from 'hooks/useAuth';
import styled from 'styled-components';
import Sidebar from 'components/Sidebar/Sidebar';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.b`
  font-size: 25px;
  text-align: center;
`;

function LandingScreen() {
  const { user } = useAuth();
  return (
    <>
      <Sidebar />
      <Container>
        <Title>Hello {user?.displayName} !</Title>
      </Container>
    </>
  );
}

export default LandingScreen;
