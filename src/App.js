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
import Payment from "./components/Jobs/payment";
import ChatPage from "./components/Jobs/ChatPage";

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

      window.ethereum.on("chainChanged", handleChainChanged);

      function handleChainChanged(chainId) {
        // We recommend reloading the page, unless you must do otherwise.
        window.location.reload();
      }

      // Check if the supported chainIds include the current chainId
      const supportedChainIds = ["0x1", "0x38", "42161", "0x5"]; // Ethereum: 1, BSC: 56, Arbitrum: 42161
      if (!supportedChainIds.includes(chainId)) {
        window.alert(
          "Unsupported chain. Please switch to Ethereum (chainId 1) or BSC BEP20 (chainId 56) or Arbitrum (42161)."
        );
        return;
      }

      setConnected(true);
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error("Failed to connect to MetaMask:", error);
      setConnected(false);
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
            <Route path="/chat/:jobId/:applicantId" element={<ChatPage/>} />
            <Route
              path="/payment"
              element={<Payment isConnected={isConnected} />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </MetaMaskProvider>
  );
};

export default App;
