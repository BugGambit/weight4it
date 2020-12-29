import React from 'react';
import styled from 'styled-components';

const ButtonWithStyle = styled.button`
  background-color: ${(props) => props.theme.buttonBackgroundColor};
  color: ${(props) => props.theme.buttonTextColor};
  font-size: 16px;
  font-weight: 900;
  height: 36px;
  border: 0.5px solid #000000;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
`;

interface ButtonProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  submit?: boolean;
}

function Button({ children, style, onClick, submit }: ButtonProps) {
  return (
    <ButtonWithStyle
      type={submit ? 'submit' : 'button'}
      style={style}
      onClick={onClick}
    >
      {children}
    </ButtonWithStyle>
  );
}
Button.defaultProps = {
  submit: false,
} as Partial<ButtonProps>;

export default Button;
