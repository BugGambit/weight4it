import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 64px;
  top: 0;
  left: 0;
  text-align: center;
  line-height: 64px;
`;

const Text = styled.p`
  color: ${(props) => props.theme.foregroundColor}
  font-weight: 900;
  font-size: 20px;
  letter-spacing: 0.2em;
  margin-top: 20px;
`;

function Title() {
  return (
    <Container>
      <Text>weight4it</Text>
    </Container>
  );
}

export default Title;
