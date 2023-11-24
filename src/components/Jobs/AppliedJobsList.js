import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc as firestoreDoc, getDoc } from 'firebase/firestore';

const AppliedJobsList = ({ walletAddress }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        console.log('Fetching applied jobs for wallet address:', walletAddress);

        // Fetch applied jobs for the specific wallet address
        const appliedJobsQuery = collection(db, 'appliedJobs');
        const querySnapshot = await getDocs(appliedJobsQuery);

        const jobs = [];
        for (const appliedJobDoc of querySnapshot.docs) {
          const data = appliedJobDoc.data();
          const lowercaseWalletAddress = walletAddress.toLowerCase();

          if (data.walletAddress && data.walletAddress.toLowerCase() === lowercaseWalletAddress) {
            // Fetch job details using jobId
            const jobDocRef = firestoreDoc(db, 'jobs', data.jobId);
            const jobDoc = await getDoc(jobDocRef);

            if (jobDoc.exists()) {
              jobs.push({
                id: appliedJobDoc.id,
                jobId: data.jobId,
                jobDetails: jobDoc.data(),
                appliedAt: data.appliedAt.toDate(),
              });
            }
          }
        }

        console.log('Fetched applied jobs:', jobs);

        setAppliedJobs(jobs);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    if (walletAddress) {
      fetchAppliedJobs();
    }
  }, [walletAddress]);

  return (
    <div className="applied-jobs-container">
      <h2>Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <p>No jobs applied yet.</p>
      ) : (
        <ul>
          {appliedJobs.map((job) => (
            <li key={job.id}>
              <p>Job Title: {job.jobDetails.jobTitle}</p>
              <p>Company Name: {job.jobDetails.company_name}</p>
              <p>Job ID: {job.jobId}</p>
              <p>Timestamp: {job.appliedAt.toLocaleString()}</p>
              <p>Status: {job.jobDetails.jobstatus}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppliedJobsList;
