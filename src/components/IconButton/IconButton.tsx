import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Button/Button';
import React from 'react';
import styled from 'styled-components';

const ButtonWithStyle = styled(Button)`
  display: inline-block;
  border-radius: 50%;
  border: 2px solid;

  font-size: 25px;
  font-weight: 900;
  line-height: 50px;

  width: 50px;
  height: 50px;
  text-align: center;

  box-shadow: none;
`;

interface IconButtonProps {
  icon: IconProp;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

function IconButton({ icon, onClick, className }: IconButtonProps) {
  return (
    <ButtonWithStyle onClick={onClick} className={className}>
      <FontAwesomeIcon icon={icon} />
    </ButtonWithStyle>
  );
}
IconButton.defaultProps = {} as Partial<IconButtonProps>;

export default IconButton;
