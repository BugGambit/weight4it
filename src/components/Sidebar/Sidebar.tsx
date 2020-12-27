import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  nav {
    display: block;
    height: 100%;
  }

  a {
    padding: 1em;
    text-decoration: none;
    color: inherit;
    text-transform: uppercase;
    transition: background 0.3s, box-shadow 0.3s;
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.2);
  }

  a:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  /* Position and sizing of burger button */
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    right: 36px;
    top: 36px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: ${(props) => props.theme.foregroundColor};
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: #a90000;
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: ${(props) => props.theme.backgroundColor};
  }

  /*
  Sidebar wrapper styles
  Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
  */
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */
  .bm-menu {
    background: ${(props) => props.theme.foregroundColor};
    padding: 2.5em 0em 0;
    font-size: 1.15em;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: ${(props) => props.theme.backgroundColor};
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`;

function Sidebar() {
  return (
    <Container>
      <Menu right>
        <a id="home" className="menu-item" href="/">
          <FontAwesomeIcon icon={faHome} /> Home
        </a>
        <a id="logout" className="menu-item" href="/logout">
          <FontAwesomeIcon icon={faSignOutAlt} /> Log out
        </a>
      </Menu>
    </Container>
  );
}

export default Sidebar;
