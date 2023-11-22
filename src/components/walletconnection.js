import React from 'react';

const WalletConnection = ({ isConnected, connectWallet, disconnectWallet }) => {

  const handleButtonClick = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <div className="wallet-connection">
      <button onClick={handleButtonClick}>
        {isConnected ? 'Disconnect' : 'Login'}
      </button>
    </div>
  );
};

export default WalletConnection;