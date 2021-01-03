import React from 'react';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Footer from 'components/Footer/Footer';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor}ee;
  z-index: 1000000;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.foregroundColor};
`;

interface ModalProps {
  title: string;
  children: JSX.Element;
  onClose?: () => void;
  isOpen?: boolean;
}

function Modal({ title, children, onClose = () => {}, isOpen }: ModalProps) {
  if (!isOpen) return null;
  return (
    <Container>
      <Title>{title}</Title>
      {children}
      <Footer icon={faTimes} onIconClick={() => onClose()} />
    </Container>
  );
}
Modal.defaultProps = {
  isOpen: false,
} as Partial<ModalProps>;

export default Modal;
