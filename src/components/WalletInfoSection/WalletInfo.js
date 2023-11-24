import React, { useState } from 'react';

const WalletInfo = ({ userData, onSave, onBack }) => {
  const [walletData, setWalletData] = useState({
    bnbwalletAddress: userData.bnbwalletAddress,
    usdtwalletAddress: userData.usdtwalletAddress,
    ethwalletAddress: userData.ethwalletAddress,
  });

  const handleSaveClick = () => {
    onSave(walletData);
  };
  
  const handleBackClick = () => {
    onBack();
  };


  return (
    <div className="wallet-info card">
      <div className="card-header d-flex">
        <i onClick={handleBackClick} className='fa fa-arrow-left back-arrow'></i>
        <h3>Wallet Information</h3>
      </div>
      <br />
      <div>
        <label htmlFor="bnbWallet">BNB Wallet:</label>
        <input
          type="text"
          id="bnbWallet"
          className='form-control'
          value={walletData.bnbwalletAddress}
          onChange={(e) => setWalletData({ ...walletData, bnbwalletAddress: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="usdtWallet">USDT Wallet:</label>
        <input
          type="text"
          id="usdtWallet"
          className='form-control'
          value={walletData.usdtwalletAddress}
          onChange={(e) => setWalletData({ ...walletData, usdtwalletAddress: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="ethWallet">ETH Wallet:</label>
        <input
          type="text"
          id="ethWallet"
          className='form-control'
          value={walletData.ethwalletAddress}
          onChange={(e) => setWalletData({ ...walletData, ethwalletAddress: e.target.value })}
        />
      </div>
      <br />
      <div className='d-flex align-items-center justify-content-around'>
        <button onClick={handleBackClick} className="save-button btn" style={{width:"20%"}}>Back</button>
        <button onClick={handleSaveClick} className="btn btn-success" style={{width:"70%"}}>
          Save
        </button>
      </div>
    </div>
  );
};

export default WalletInfo;
