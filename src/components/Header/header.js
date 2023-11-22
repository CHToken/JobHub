import React from 'react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';

const HeaderContainer = ({ isConnected, connectWallet }) => {
  return (
    <div className="header-container">
      <div className="logo-text">
        <h1>JobHub</h1>
      </div>
      <div className="topnav" id="topnav">
      <Link to="#jobposter">Job Poster</Link>
      <Link to="#jobseeker">Job Seeker</Link>
      <Link to="#buygem">Buy Gem</Link>
      <Link to="#about">About</Link>
      </div>
      <AuthButton isConnected={isConnected} connectWallet={connectWallet} />
    </div>
  );
};

export default HeaderContainer;
