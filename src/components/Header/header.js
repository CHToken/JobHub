import React from 'react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';
import { useWallet } from '../WalletContext';
import "./header.css";

const HeaderContainer = () => {
  const { isConnected } = useWallet();
  return (
    <div className="header-container">
      <div className="logo-text">
        <Link to="/">
          <h1>JobHub</h1>
        </Link>
      </div>
      <div className="topnav" id="topnav">
        <Link to="postjob">Post a Job</Link>
        <Link to="jobboard">Job Board</Link>
      </div>
      <AuthButton isConnected={isConnected}/>
    </div>
  );
};

export default HeaderContainer;
