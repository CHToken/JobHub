import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import contractABI from "./ABI";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import "./payment.css";

const contractAddress = "0xE0b8c96D5D4B04e7FCeDdfaE3A0B4F23DA8cC9ab";

const Payment = ({ isConnected }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  const [jobSeekerAddress, setJobSeekerAddress] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isJobPoster, setIsJobPoster] = useState(false);
  const [isContractOwner, setIsContractOwner] = useState();

  const initializeContract = useCallback(async () => {
    if (!isConnected) {
      return;
    }

    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setWeb3(web3Instance);
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setSigner(accounts[0]);
        const contractInstance = new web3Instance.eth.Contract(
          contractABI,
          contractAddress
        );
        setContract(contractInstance);

        // Check if the connected address is a job poster
        await checkIfJobPoster(accounts[0]);

        // Check if the connected address is the owner of the contract
        if (contractInstance) {
          const contractOwners = await contractInstance.methods
            .authorizedAccounts()
            .call();

          const lowercaseConnectedAddress =
            accounts[0] && accounts[0].toLowerCase();
          const isOwner =
            contractOwners &&
            lowercaseConnectedAddress &&
            contractOwners.some(
              (owner) => owner.toLowerCase() === lowercaseConnectedAddress
            );

          setIsContractOwner(isOwner);
        }

        return Promise.resolve();
      } catch (error) {
        console.error(
          "User denied account access or an error occurred",
          error
        );
        return Promise.reject(error);
      }
    } else {
      console.error("Please install MetaMask!");
      return Promise.reject("Please install MetaMask");
    }
  }, [isConnected, setWeb3, setSigner, setContract]);

  useEffect(() => {
    initializeContract();
  }, [initializeContract]);

  const checkIfJobPoster = async (walletAddress) => {
    try {
      const jobsCollection = collection(db, "jobs");
      const q = query(
        jobsCollection,
        where("senderId", "==", walletAddress)
      );
      const jobSnapshot = await getDocs(q);

      if (!jobSnapshot.empty) {
        // Connected address is a job poster
        setIsJobPoster(true);
      }
    } catch (error) {
      console.error(
        "Error checking if the connected address is a job poster:",
        error
      );
    }
  };

  const sendPayment = async () => {
    try {
      await initializeContract();

      // Convert the paymentAmount to a string before passing it to web3.utils.toWei
      const paymentAmountInWei = web3.utils.toWei(paymentAmount.toString(), "ether");

      const result = await contract.methods.sendPayment(jobSeekerAddress).send({
        from: signer,
        value: paymentAmountInWei,
      });

      console.log("Payment sent:", result);
    } catch (error) {
      console.error("Error sending payment:", error);
    }
  };

  const finalizePayment = async () => {
    try {
      await initializeContract();

      // Convert the paymentAmount to a string before passing it to web3.utils.toWei
      const paymentAmountInWei = web3.utils.toWei(paymentAmount.toString(), "ether");

      const result = await contract.methods
        .finalizePayment(jobSeekerAddress, paymentAmountInWei)
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

      // Convert the paymentAmount to a string before passing it to web3.utils.toWei
      const paymentAmountInWei = web3.utils.toWei(paymentAmount.toString(), "ether");

      const result = await contract.methods
        .releasePayment(jobSeekerAddress, paymentAmountInWei)
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

      // Convert the withdrawAmount to a string before passing it to web3.utils.toWei
      const withdrawAmountInWei = web3.utils.toWei(withdrawAmount.toString(), "ether");

      const result = await contract.methods.withdrawBalance(withdrawAmountInWei).send({
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
    <div
      className="contract-container"
      style={{ marginBottom: "130px" }}
      align="center"
    >
      {isConnected ? (
        <>
          <h2>JobHub Payment Portal</h2>
          <label>Applicant Address:</label>
          <input
            type="text"
            value={jobSeekerAddress}
            className="form-control"
            onChange={(e) => setJobSeekerAddress(e.target.value)}
          />
          <br />
          <label>Amount for Payment (in Ether):</label>
          <input
            type="text"
            value={paymentAmount}
            className="form-control"
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
          <br />
          {isJobPoster && (
            <>
              <button className="btn btn-secondary ml-3" onClick={sendPayment}>
                Pay Now
              </button>
              <button
                className="btn btn-secondary ml-3"
                onClick={finalizePayment}
              >
                Finalize
              </button>
            </>
          )}
          {isContractOwner && (
            <>
              <button
                className="btn btn-secondary ml-3"
                onClick={releasePayment}
              >
                Release
              </button>
              <div>
              <label>Amount for Withdrawal (in Ether):</label>
          <input
            type="text"
            value={withdrawAmount}
            className="form-control"
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
                <button
                  className="btn btn-secondary ml-3"
                  onClick={withdrawBalance}
                >
                  Withdraw
                </button>
              </div>
            </>
          )}
          <button
            className="btn btn-secondary ml-3"
            onClick={getJobSeekerBalance}
          >
            Check Balance
          </button>
        </>
      ) : (
        <p>Please connect your wallet to use the payment portal.</p>
      )}
    </div>
  );
};

export default Payment;