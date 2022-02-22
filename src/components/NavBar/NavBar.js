import React, { useContext, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Logo from '../../assets/image/app-logo.png';
const NavBar = () => {
  const { user, onLogout } = useContext(UserContext);

  return (
    <div className="header">
      <div className="sections">
        <div className="section-right">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
            <div className="logo-name">MOVIELAND</div>
            <img src={Logo} height={25} width={25} />
          </Link>
        </div>
        <div className="section-left">
          {user?.username !== '' ? (
            <li>
              <Link to="/" className="nav-button">
                Home
              </Link>
              <Link to={`/profile/${user.username}`} className="nav-button profile">
                Profile
              </Link>
              <Link to="/login" className="nav-button" onClick={onLogout}>
                Sign out
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="nav-button">
                Login
              </Link>
              <Link to="/register" className="nav-button">
                Sign up
              </Link>
            </li>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
