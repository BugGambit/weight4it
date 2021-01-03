import React from 'react';
import styled from 'styled-components';

const ButtonWithStyle = styled.button`
  background-color: ${(props) => props.theme.foregroundColor};
  color: ${(props) => props.theme.backgroundColor};
  font-size: 16px;
  font-weight: 900;
  height: 36px;
  border: 0.5px solid #000000;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  box-shadow: 1px 1px ${(props) => props.theme.foregroundColor};
  border-radius: 5px;
`;

interface ButtonProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  submit?: boolean;
}

function Button({ children, style, className, onClick, submit }: ButtonProps) {
  return (
    <ButtonWithStyle
      type={submit ? 'submit' : 'button'}
      style={style}
      className={className}
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
