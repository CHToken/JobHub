import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [isConnected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const { address: web3ModalAddress, isConnected: web3ModalIsConnected } = useWeb3ModalAccount();

  useEffect(() => {
    setWalletAddress(web3ModalAddress);
    setConnected(web3ModalIsConnected);
  }, [web3ModalAddress, web3ModalIsConnected]);

  const connectWallet = async () => {
    try {
      // Connect wallet using web3modal (if not already connected)
      if (!web3ModalIsConnected) {
        // Your additional connection logic here if needed
      }

      setConnected(true);
      setWalletAddress(web3ModalAddress);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnect = async () => {
    // Your wallet disconnection logic here
    setConnected(false);
    setWalletAddress(null);
  };

  return (
    <WalletContext.Provider value={{ isConnected, connectWallet, disconnect, walletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
