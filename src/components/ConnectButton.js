import React from "react";
import { useWallet } from './WalletContext';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

const projectId = '8d681534714d92a54e2496a95989c293';

const ethereumMainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
}

// const ethereumGoerli = {
//     chainId: 5,
//     name: 'Ethereum Goerli',
//     currency: 'GTH',
//     explorerUrl: 'https://goerli.etherscan.io',
//     rpcUrl: 'https://goerli.infura.io/v3/774a0b18d6ae4f9cabbb1458da880e5b'
// };

const metadata = {
    name: 'Work AI',
    description: 'This is Dapp for the next revolution AI for getting job easily',
    url: 'https://workai.vercel.app',
    icons: ['./logo.png']
};

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [ethereumMainnet],
    projectId
})

const ConnectButton = () => {
  const { connectWallet, disconnect, isConnected } = useWallet();

  const handleConnectClick = async () => {
    try {
      if (isConnected) {
        // If already connected, disconnect
        await disconnect();
      } else {
        // If not connected, connect
        await connectWallet();
      }
    } catch (error) {
      console.error(isConnected ? 'Failed to disconnect wallet:' : 'Failed to connect wallet:', error);
    }
  };

  return <w3m-button onClick={handleConnectClick}>{isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}</w3m-button>;
};

export default ConnectButton;
