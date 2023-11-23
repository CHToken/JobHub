import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import UserProfile from "./components/Profile/profile";
import HeaderContainer from "./components/Header/header";
import Footer from "./components/Footer/Footer";
import { MetaMaskProvider } from "@metamask/sdk-react";
import Homepage from "./components/Home/homepage";
import JobPostingForm from "./components/JobPostSection/JobPostForm";

import "./global.css";
import "./components/Header/header.css";
import "./components/Profile/profile.css";
import "./components/PastProjectSection/pastproject.css";
import "./components/SocialMediaSection/socialmedia.css";
import "./components/WalletInfoSection/walletinfo.css";
import "./components/TextSection/textSection.css";
import "./components/HeroSection/heroSection.css";
import './components/JobPostSection/JobPostingForm.css';

const App = () => {
  const [isConnected, setConnected] = useState(false);

  const connectWallet = useCallback(async () => {
    try {
      // Connect to MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setConnected(true);
    } catch (error) {
      console.error("Failed to connect to MetaMask:", error);
    }
  }, []);
  
  const disconnectWallet = useCallback(() => {
    setConnected(false);
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
            <Route path="/profile" element={<UserProfile isConnected={isConnected} />} />
            <Route path="/" element={<Homepage />} />
            <Route
  path="/postjob"
  element={<JobPostingForm isConnected={isConnected} onSubmit={handleJobSubmit} />}
/>
          </Routes>
        </div>
        <Footer />
      </Router>
    </MetaMaskProvider>
  );
};

      
export default App;

