import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import UserProfile from "./components/Profile/profile";
import HeaderContainer from "./components/Header/header";
import Footer from "./components/Footer/Footer";
import TextSection from "./components/TextSection/TextSection";
import HomeCategories from "./components/Home/Categories";
import HomeJobs from "./components/Home/Jobs";
import Subscribe from "./components/Home/Subscribe";
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
        </div>
          
        <div className="head-1">
          <h1>Discover more than <br /> <span className="navyblue">8000+ jobs</span></h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          <div className="searchContainer">
            <div className="searchBox">
              <i className="fa fa-search"></i><input type="text" placeholder="search" />
              <a className="get-started-button">Search</a>
            </div>
          </div>
        </div>

        <div className="app-container">


          <div className="d-flex align-items-center justify-content-center mb-5">
            <div className="counter-section">
              <div className="row">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-6 icon-container">
                      <i className="fas fa-briefcase" style={{color: "#2FA1FF"}}></i>
                    </div>
                    <div className="col-6">
                      <h1 className="navyblue">8k+</h1>
                      <h4 className="opacity-75">JOBS</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-6 icon-container">
                      <i className="fab fa-trello" style={{color: "#FF8B3D"}}></i>
                    </div>
                    <div className="col-6">
                      <h1 className="navyblue">400+</h1>
                      <h4 className="opacity-75">STARTUPS</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-6 icon-container">
                      <i className="fas fa-users" style={{color: "#D343E0"}}></i>
                    </div>
                    <div className="col-6">
                      <h1 className="navyblue">20k+</h1>
                      <h4 className="opacity-75">TALENT</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <TextSection />
          <HomeCategories />

        </div>
          
        <HomeJobs />


        <div className="app-container">
          <Routes>
            <Route
              path="/profile"
              element={<UserProfile isConnected={isConnected}/>}
            />
            {/* <Route path="/listings" element={<JobListings />} /> */}
            <Route path="/" element={
                <div>
                  <HeroSection />
                </div>
              }
            />
          </Routes>
          <Outlet />
        </div>

        <Subscribe />
        <Footer />

      </Router>
    </MetaMaskProvider>
  );
};

export default App;

