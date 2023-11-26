import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./components/Profile/profile";
import HeaderContainer from "./components/Header/header";
import Footer from "./components/Footer/Footer";
import { MetaMaskProvider } from "@metamask/sdk-react";
import Homepage from "./components/Home/homepage";
import JobPostingForm from "./components/JobPostSection/JobPostForm";
import JobBoard from "./components/JobBoard/JobBoard";
import JobDetails from "./components/Jobs/JobsDetails";
import ManageJobs from "./components/Jobs/managejobs";

import "./global.css";

const App = () => {
  const [isConnected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = useCallback(async () => {
    try {
      // Connect to MetaMask and get the accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Get the chainId from MetaMask
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      // Check if the supported chainIds include the current chainId
      const supportedChainIds = ["0x1", "0x38", "42161"]; // Ethereum: 1, BSC: 56, Arbitrum: 42161
      if (!supportedChainIds.includes(chainId)) {
        window.alert("Unsupported chain. Please switch to Ethereum (chainId 1) or BSC BEP20 (chainId 56) or Arbitrum (42161).");
        return;
      }

      setConnected(true);
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error("Failed to connect to MetaMask:", error);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setConnected(false);
    setWalletAddress(null);
    window.location.reload();
  }, []);

  // Define the onSubmit function
  const handleJobSubmit = (jobData) => {
    console.log("Job submitted:", jobData);
    // You can add any additional logic here
  };

  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        checkInstallationImmediately: false,
        dappMetadata: {
          name: "JobHub DApp",
          url: window.location.host,
        },
      }}
    >
      <Router>
        <div className="app-container">
          <header>
            <HeaderContainer
              isConnected={isConnected}
              connectWallet={connectWallet}
              disconnectWallet={disconnectWallet}
            />
          </header>
          <Routes>
            <Route
              path="/profile"
              element={<UserProfile isConnected={isConnected} />}
            />
            <Route path="/" element={<Homepage />} />
            <Route
              path="/postjob"
              element={
                <JobPostingForm
                  isConnected={isConnected}
                  onSubmit={handleJobSubmit}
                />
              }
            />
            <Route path="/jobboard" element={<JobBoard />} />
            <Route
              path="/managejobs"
              element={<ManageJobs walletAddress={walletAddress} />}
            />
            <Route
              path="/jobs/:jobId"
              element={
                <JobDetails
                  isConnected={isConnected}
                  walletAddress={walletAddress}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </MetaMaskProvider>
  );
};

export default App;
