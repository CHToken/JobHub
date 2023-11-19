import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import UserProfile from "./components/Profile/profile";
import HeaderContainer from "./components/Header/header";
import TextSection from "./components/TextSection/TextSection";
import HeroSection from "./components/HeroSection/HeroSection";
import GridSection from "./components/GridSection/GridSection";
import { MetaMaskProvider } from "@metamask/sdk-react";

import "./global.css";
import "./components/Header/header.css";
import "./components/Profile/profile.css";
import "./components/PastProjectSection/pastproject.css";
import "./components/SocialMediaSection/socialmedia.css";
import "./components/WalletInfoSection/walletinfo.css";
import "./components/TextSection/textSection.css";
import "./components/HeroSection/heroSection.css";
import "./components/GridSection/gridSection.css";

const App = () => {
  const [isConnected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      // Connect to MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setConnected(true);
    } catch (error) {
      console.error("Failed to connect to MetaMask:", error);
    }
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
            />
          </header>
          <Routes>
            <Route
              path="/profile"
              element={<UserProfile isConnected={isConnected}/>}
            />
            {/* <Route path="/listings" element={<JobListings />} /> */}
            <Route path="/" element={
                <div>
                  <TextSection />
                  <HeroSection />
                  <div className="description-container">
                    <GridSection />
                  </div>
                </div>
              }
            />
          </Routes>
          <Outlet />
        </div>
      </Router>
    </MetaMaskProvider>
  );
};

export default App;

