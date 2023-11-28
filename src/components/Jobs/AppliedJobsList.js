import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc as firestoreDoc,
  getDoc,
} from "firebase/firestore";
import "./AppliedJobsList.css";
import { useNavigate } from 'react-router-dom';

const AppliedJobsList = ({ walletAddress }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        // Fetch applied jobs for the specific wallet address
        const appliedJobsQuery = collection(db, "appliedJobs");
        const querySnapshot = await getDocs(appliedJobsQuery);

        const jobs = [];
        for (const appliedJobDoc of querySnapshot.docs) {
          const data = appliedJobDoc.data();
          const lowercaseWalletAddress = walletAddress.toLowerCase();

          if (
            data.walletAddress &&
            data.walletAddress.toLowerCase() === lowercaseWalletAddress
          ) {
            // Fetch job details using jobId
            const jobDocRef = firestoreDoc(db, "jobs", data.jobId);
            const jobDoc = await getDoc(jobDocRef);

            if (jobDoc.exists()) {
              jobs.push({
                id: appliedJobDoc.id,
                jobId: data.jobId,
                budget: data.budget,
                jobDetails: jobDoc.data(),
                appliedAt: data.appliedAt.toDate(),
              });
            }
          }
        }

        setAppliedJobs(jobs);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    if (walletAddress) {
      fetchAppliedJobs();
    }
  }, [walletAddress]);

  const handleChatClick = (jobId, applicantId) => {
    const chatPageURL = `/chat/${jobId}/${applicantId}`;
    // Navigate to the chat page
    navigate(chatPageURL);
  };

  return (
    <div className="applied-jobs-container">
      <h2>Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <p>No jobs applied yet.</p>
      ) : (
        <div className="applied-card-container">
          {appliedJobs.map((job) => (
            <div key={job.id} className="applied-job-card">
              <p>Job Title: {job.jobDetails.jobTitle}</p>
              <p>Company Name: {job.jobDetails.company_name}</p>
              <p>Budget: {job.jobDetails.budget}</p>
              <p>Job ID: {job.jobId}</p>
              <p>Timestamp: {job.appliedAt.toLocaleString()}</p>
              <p>Status: {job.jobDetails.jobstatus}</p>
              {/* Add Chat button */}
              <button
                className="btn btn-secondary"
                onClick={() => handleChatClick(job.jobId, job.id)}
              >
                Chat
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobsList;