// ManageJobs.js
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

const ManageJobs = ({ walletAddress }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsQuery = collection(db, "jobs");
        const querySnapshot = await getDocs(
          query(jobsQuery, where("walletAddress", "==", walletAddress))
        );

        const jobsData = [];
        for (const jobDoc of querySnapshot.docs) {
          const data = jobDoc.data();
          jobsData.push({
            id: jobDoc.id,
            ...data,
          });
        }

        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (walletAddress) {
      fetchJobs();
    }
  }, [walletAddress]);

  const handleAcceptApplicant = async (jobId, applicantId) => {
    try {
      // Update the job status to "Accepted"
      await updateDoc(doc(db, 'jobs', jobId), {
        jobstatus: 'Accepted',
      });

      // Perform other logic for accepting the applicant

      // You might want to update the applicant's status in the 'appliedJobs' collection
    } catch (error) {
      console.error('Error accepting applicant:', error);
    }
  };

  const handleRejectApplicant = async (jobId, applicantId) => {
    try {
      // Update the job status to "Rejected"
      await updateDoc(doc(db, 'jobs', jobId), {
        jobstatus: 'Rejected',
      });

      // Perform other logic for rejecting the applicant

      // You might want to update the applicant's status in the 'appliedJobs' collection
    } catch (error) {
      console.error('Error rejecting applicant:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      // Delete the job
      await deleteDoc(doc(db, 'jobs', jobId));

      // Perform other logic for cleanup (e.g., delete related data in 'appliedJobs' collection)
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div>
      <h2>Manage Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <p>Job Title: {job.jobTitle}</p>
              <p>Applicants: {/* You can display the total number of applicants here */}</p>
              <button onClick={() => handleAcceptApplicant(job.id, /* applicantId */)}>Accept Applicant</button>
              <button onClick={() => handleRejectApplicant(job.id, /* applicantId */)}>Reject Applicant</button>
              <button onClick={() => handleDeleteJob(job.id)}>Delete Job</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageJobs;
