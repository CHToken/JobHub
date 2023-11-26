// AppUsage.js
import { sendPayment, withdrawBalance, finalizePayment } from "./JobHubContract";

// Example usage
const jobSeekerAddress = "JOB_SEEKER_ADDRESS";
const paymentAmount = 1; // in ether

// Call the functions
sendPayment(jobSeekerAddress, paymentAmount);
withdrawBalance(); // Uncomment and call if needed
finalizePayment(jobSeekerAddress, paymentAmount); // Uncomment and call if needed


// https://goerli.etherscan.io/address/0x6830E7E45CdB1aDfF4Eb00526303f8f7755f07BD