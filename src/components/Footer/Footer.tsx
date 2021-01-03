import { IconProp } from '@fortawesome/fontawesome-svg-core';
import IconButton from 'components/IconButton/IconButton';
import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  position: absolute;
  height: 75px;
  width: 100%;
  bottom: 0;
  background-color: rgba(127, 127, 127, 0.2);
`;

const Icon = styled(IconButton)`
  position: absolute;
  left: 50%;
  bottom: 65px;
  transform: translate(-50%, 50%);
  width: 75px;
  height: 75px;
  border: 10px solid ${(props) => props.theme.backgroundColor};
`;

interface FooterProps {
  icon: IconProp;
  onIconClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

function Footer({ icon, onIconClick }: FooterProps) {
  return (
    <>
      <Box />
      <Icon icon={icon} onClick={onIconClick} />
    </>
  );
}
Footer.defaultProps = {} as Partial<FooterProps>;

export default Footer;
