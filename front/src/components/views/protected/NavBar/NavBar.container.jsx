import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.sass';

//Import logo and icons
import { Icon } from '@mdi/react';
import { mdiChat, mdiAccountCircle, mdiPaw } from '@mdi/js';

const NavBar = () => {
  return (
    <nav className="navbar-b">
      <Link to="/profile">
        <Icon
          path={mdiAccountCircle}
          size={1.5}
          color="#fff"
          className="icon"
        />
        <p className="navtxt">Usuario</p>
      </Link>
      <Link to="/swipe">
        <Icon path={mdiPaw} size={1.5} color="#fff" className="icon" />
        <p className="navtxt">Swipe</p>
      </Link>
      <Link to="/chat">
        <Icon path={mdiChat} size={1.5} color="#fff" className="icon" />
        <p className="navtxt">Chat</p>
      </Link>
    </nav>
  );
};
export default NavBar;
