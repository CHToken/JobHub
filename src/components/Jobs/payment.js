import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import contractABI from "./ABI";

import "./payment.css";

const contractAddress = "0x6830E7E45CdB1aDfF4Eb00526303f8f7755f07BD";

const Payment = ({ isConnected }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  const [jobSeekerAddress, setJobSeekerAddress] = useState("");
  const [amount, setAmount] = useState("");

  const initializeContract = useCallback(async () => {
    if (!isConnected) {
      console.error("User is not connected");
      return;
    }
  
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setWeb3(web3Instance);
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        setSigner(accounts[0]);
        setContract(new web3Instance.eth.Contract(contractABI, contractAddress));
      } catch (error) {
        console.error("User denied account access or an error occurred", error);
      }
    } else {
      console.error("Please install MetaMask!");
    }
  }, [isConnected, setWeb3, setSigner, setContract]);
  

  useEffect(() => {
    initializeContract();
  }, [initializeContract]);

  const sendPayment = async () => {
    try {
      await initializeContract();

      const result = await contract.methods.sendPayment(jobSeekerAddress).send({
        from: signer,
        value: web3.utils.toWei(amount, "ether"),
      });

      console.log("Payment sent:", result);
    } catch (error) {
      console.error("Error sending payment:", error);
    }
  };

  const finalizePayment = async () => {
    try {
      await initializeContract();

      const result = await contract.methods
        .finalizePayment(jobSeekerAddress, amount)
        .send({
          from: signer,
        });

      console.log("Payment finalized:", result);
    } catch (error) {
      console.error("Error finalizing payment:", error);
    }
  };

  const releasePayment = async () => {
    try {
      await initializeContract();

      const result = await contract.methods
        .releasePayment(jobSeekerAddress, amount)
        .send({
          from: signer,
        });

      console.log("Payment released:", result);
    } catch (error) {
      console.error("Error releasing payment:", error);
    }
  };

  const withdrawBalance = async () => {
    try {
      await initializeContract();

      const result = await contract.methods.withdrawBalance(amount).send({
        from: signer,
      });

      console.log("Balance withdrawn:", result);
    } catch (error) {
      console.error("Error withdrawing balance:", error);
    }
  };

  const getJobSeekerBalance = async () => {
    try {
      await initializeContract();

      const balance = await contract.methods.balances(jobSeekerAddress).call();

      console.log("Job Seeker Balance:", balance);
    } catch (error) {
      console.error("Error getting job seeker balance:", error);
    }
  };

  return (
    <div className="contract-container">
      {isConnected ? (
        <>
          <h2>JobHub Payment Portal</h2>
          <label>Applicant Address:</label>
          <input
            type="text"
            value={jobSeekerAddress}
            onChange={(e) => setJobSeekerAddress(e.target.value)}
          />
          <br />
          <label>Amount (in Ether):</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <button onClick={sendPayment}>Pay Now</button>
          <button onClick={finalizePayment}>Finalize</button>
          <button onClick={releasePayment}>Release</button>
          <button onClick={withdrawBalance}>Withdraw</button>
          <button onClick={getJobSeekerBalance}>Check Balance</button>
        </>
      ) : (
        <p>Please connect your wallet to use the payment portal.</p>
      )}
    </div>
  );
};

export default Payment;
