import React from 'react';

const WalletConnection = ({ isConnected, connectWallet }) => {
  return (
    <div className="wallet-connection">
      {!isConnected ? (
        <button onClick={connectWallet}>Login</button>
      ) : (
        <p className="connected-message">Connected</p>
      )}
    </div>
  );
};

export default WalletConnection;
