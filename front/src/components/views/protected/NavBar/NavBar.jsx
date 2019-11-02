import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.sass';

//Import logo and icons

import { Icon } from '@mdi/react';
import { mdiChat } from '@mdi/js';
import { mdiAccountCircle } from '@mdi/js';

const NavBar = () => {
  return (
    <nav className="navbar-b">
      <Link to="/">
        <Icon
          path={mdiAccountCircle}
          size={1.5}
          color="#000"
          className="icon"
        />
        <p className="navtxt">Usuario</p>
      </Link>
      <Link to="/swipe">
        {/* <img src={logo} alt="swipe" className="navimg icon" /> */}
        <p className="navtxt">Swipe</p>
      </Link>
      <Link to="/chat">
        <Icon path={mdiChat} size={1.5} color="#000" className="icon" />
        <p className="navtxt">Chat</p>
      </Link>
    </nav>
  );
};
export default NavBar;
