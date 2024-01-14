import React, { useState } from "react";

const WalletInfo = ({ userData, onSave, onBack }) => {
  const [walletData, setWalletData] = useState({
    // bnbwalletAddress: userData.bnbwalletAddress,
    // usdtwalletAddress: userData.usdtwalletAddress,
    ethwalletAddress: userData.ethwalletAddress,
  });

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleInputChange = (field, value) => {
    setWalletData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSaveClick = () => {
    onSave(walletData);
    alert("WalletInfo saved successfully!");
  };

  const handleBackClick = () => {
    onBack();
  };

  return (
    <div className="wallet-info card">
      <div className="card-header d-flex">
        <i onClick={handleBackClick} className="fa fa-arrow-left back-arrow"></i>
        <h3>Wallet Information</h3>
      </div>
      <br />
      {Object.entries(walletData).map(([field, value]) => (
        <div key={field}>
          <label htmlFor={`${field}Wallet`}>{`${capitalize(field)} Wallet:`}</label>
          <input
            type="text"
            id={`${field}Wallet`}
            className="form-control"
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        </div>
      ))}
      <br />
      <div className="d-flex align-items-center justify-content-around">
        <button onClick={handleSaveClick} className="btn btn-success" style={{ width: "70%" }}>
          Save
        </button>
      </div>
    </div>
  );
};

export default WalletInfo;