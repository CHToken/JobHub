import React, { useState } from 'react';
import WalletConnection from '../walletconnection';
import { Link } from 'react-router-dom';
import userImage from '../../assets/img/man.png';
import { useWallet } from '../WalletContext';

const AuthButton = () => {
  const { isConnected } = useWallet();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileHover = () => {
    setShowProfileMenu(true);
  };

  const handleMenuHover = (event) => {
    if (event) {
      setShowProfileMenu(true);
    } else {
      setShowProfileMenu(false);
    }
  };

  const handleMenuLeave = () => {
    setShowProfileMenu(false);
  };

  function openMobileMenu() {
    var topMenu = document.querySelector('#topnav');
    if (topMenu.style.display === 'none') {
      topMenu.style.display = 'flex';
    } else {
      topMenu.style.display = 'none';
    }
  }

  return (
    <div className="auth-button">
      <i className="fas fa-bars hamburger" onClick={openMobileMenu}></i>
      <div className="profile-icon" onMouseEnter={handleProfileHover}>
        <img src={userImage} alt="Profile" />
        {showProfileMenu && (
          <div className="profile-menu" onMouseEnter={(event) => handleMenuHover(event)} onMouseLeave={handleMenuLeave}>
            <Link to="/profile">Profile</Link>
            <Link to="/managejobs">Manage Jobs</Link>
            <Link to="/payment">Portal</Link>
          </div>
        )}
      </div>
      <WalletConnection isConnected={isConnected}/>
    </div>
  );
};

export default AuthButton;
