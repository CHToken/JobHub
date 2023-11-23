import React, { useState } from 'react';
import WalletConnection from '../walletconnection';
import { Link } from 'react-router-dom';
// import UserProfile from '../ProfileSection/profile'; 
import userImage from '../../assets/img/account-svgrepo-com.png';

const AuthButton = ({ isConnected, connectWallet, disconnectWallet }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileHover = () => {
    setShowProfileMenu(true);
  };

  const handleMenuHover = () => {
    // Keep the menu open when hovering over it
    setShowProfileMenu(true);
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
          <div className="profile-menu" onMouseEnter={handleMenuHover} onMouseLeave={handleMenuLeave}>
            <Link to="/profile">Profile</Link>
            <Link to="/jobboard">JobBoard</Link>
            {/* <Link to="/watchlist">Watchlist</Link> */}
            {/* <Link to="/settings">Settings</Link> */}
          </div>
        )}
      </div>
      <WalletConnection isConnected={isConnected} connectWallet={connectWallet} disconnectWallet={disconnectWallet} />
    </div>
  );
};

export default AuthButton;
