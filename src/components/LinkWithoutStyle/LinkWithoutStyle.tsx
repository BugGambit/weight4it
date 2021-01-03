import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkWithoutStyle = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.foregroundColor};

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: ${(props) => props.theme.foregroundColor};
  }
`;
export default LinkWithoutStyle;
