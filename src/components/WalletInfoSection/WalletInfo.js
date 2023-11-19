import React, { useState } from 'react';

const WalletInfo = ({ userData, onSave }) => {
  const [walletData, setWalletData] = useState({
    bnbwalletAddress: userData.bnbwalletAddress,
    usdtwalletAddress: userData.usdtwalletAddress,
    ethwalletAddress: userData.ethwalletAddress,
  });

  const handleSaveClick = () => {
    onSave(walletData);
  };

  return (
    <div className="wallet-info">
      <h3>Wallet Information</h3>
      <div>
        <label htmlFor="bnbWallet">BNB Wallet:</label>
        <input
          type="text"
          id="bnbWallet"
          value={walletData.bnbwalletAddress}
          onChange={(e) => setWalletData({ ...walletData, bnbwalletAddress: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="usdtWallet">USDT Wallet:</label>
        <input
          type="text"
          id="usdtWallet"
          value={walletData.usdtwalletAddress}
          onChange={(e) => setWalletData({ ...walletData, usdtwalletAddress: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="ethWallet">ETH Wallet:</label>
        <input
          type="text"
          id="ethWallet"
          value={walletData.ethwalletAddress}
          onChange={(e) => setWalletData({ ...walletData, ethwalletAddress: e.target.value })}
        />
      </div>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default WalletInfo;
