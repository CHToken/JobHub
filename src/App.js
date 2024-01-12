import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./components/Profile/profile";
import HeaderContainer from "./components/Header/header";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Home/homepage";
import JobPostingForm from "./components/JobPostSection/JobPostForm";
import JobBoard from "./components/JobBoard/JobBoard";
import JobDetails from "./components/Jobs/JobsDetails";
import ManageJobs from "./components/Jobs/managejobs";
import Payment from "./components/Jobs/payment";
import ChatPage from "./components/Jobs/ChatPage";
import { useWallet, WalletProvider } from './components/WalletContext'; 

import "./global.css";

const App = () => {
  const { isConnected, setConnected, setWalletAddress } = useWallet();

  // Define the onSubmit function
  const handleJobSubmit = (jobData) => {
    console.log("Job submitted:", jobData);
    // You can add any additional logic here
  };

  const useDisconnect = () => {
    const disconnect = () => {
      // Disconnect logic
      setConnected(false);
      setWalletAddress(null);
    };

    return { disconnect };
  };

  return (
    <Router>
      <WalletProvider>
      <div className="app-container">
        <header>
          <HeaderContainer isConnected={isConnected} useDisconnect={useDisconnect}/>
        </header>
          <Routes>
            <Route
              path="/profile"
              element={<UserProfile isConnected={isConnected}/>}
            />
            <Route path="/" element={<Homepage />} />
            <Route
              path="/postjob"
              element={
                <JobPostingForm isConnected={isConnected} onSubmit={handleJobSubmit}/>
              }
            />
            <Route path="/jobboard" element={<JobBoard />} />
            <Route
              path="/managejobs"
              element={<ManageJobs/>}
            />
            <Route
              path="/jobs/:jobId"
              element={
                <JobDetails/>}
            />
            <Route path="/chat/:jobId/:applicantId" element={<ChatPage/>} />
            <Route
              path="/payment"
              element={<Payment isConnected={isConnected}/>}
            />
          </Routes>
        </div>
        <Footer />
        </WalletProvider>
      </Router>
  );
};

export default App;
