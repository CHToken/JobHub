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
import "./components/TextSection/textSection.css";
import "./components/HeroSection/heroSection.css";
import "./components/GridSection/gridSection.css";
import db from "./firebase";

// Import necessary libraries and components
import { doc, setDoc, getDoc } from "firebase/firestore";

const App = () => {
  const [isConnected, setConnected] = useState(false);
  const [user, setUser] = useState(null); // Added state to store user data

  const connectWallet = async () => {
    try {
      // Connect to MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setConnected(true);

      // Get the user's Ethereum address
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const userAddress = accounts[0];

      // Check if the user exists in the database
      const userRef = doc(db, "users", userAddress);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // If the user does not exist, create a new user
        await setDoc(userRef, {
          walletAddress: userAddress,
          userProfile: {
            name: "",
            email: "",
            gender: "",
            username: "",
          },
        });
      }

      // Fetch the user data from the database
      const userData = await userDoc.data();

      // Update the user state
      setUser(userData);

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
              element={<UserProfile isConnected={isConnected} user={user} db={db} />}
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

