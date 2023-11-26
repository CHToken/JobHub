import React, { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import JobActions from "./JobActions";

const ManageJobs = ({ walletAddress }) => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = useCallback(async () => {
    try {
      const jobsQuery = collection(db, "jobs");
      const querySnapshot = await getDocs(
        query(jobsQuery, where("walletAddress", "==", walletAddress))
      );

      const jobsData = await Promise.all(
        querySnapshot.docs.map(async (jobDoc) => {
          const data = jobDoc.data();
          const applicantsCount = await getApplicantsCount(jobDoc.id);
          return {
            id: jobDoc.id,
            ...data,
            applicantsCount,
          };
        })
      );

      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, [walletAddress]);

  const getApplicantsCount = async (jobId) => {
    try {
      const appliedJobsQuery = collection(db, "appliedJobs");
      const querySnapshot = await getDocs(
        query(appliedJobsQuery, where("jobId", "==", jobId))
      );
      return querySnapshot.size;
    } catch (error) {
      console.error("Error fetching applicants count:", error);
      return 0;
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchJobs();
    }
  }, [walletAddress, fetchJobs]);

  const handleJobUpdate = useCallback(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleJobAction = async (jobId, action, message) => {
    try {
      const jobDocRef = doc(db, "jobs", jobId);
      const jobSnapshot = await getDoc(jobDocRef);
      const jobData = jobSnapshot.data();

      await updateDoc(jobDocRef, {
        jobstatus: action,
      });

      alert(`Job '${jobData.jobTitle}' has been ${message}.`);
      handleJobUpdate();
    } catch (error) {
      console.error(`Error ${message.toLowerCase()} job:`, error);
    }
  };

  const handleDeleteJob = (jobId) => {
    handleJobAction(jobId, "Deleted", "deleted");
  };

  const handlePauseJob = (jobId) => {
    handleJobAction(jobId, "Paused", "paused");
  };

  const handleActivateJob = (jobId) => {
    handleJobAction(jobId, "Active", "activated");
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
              <p>Budget: {job.budget}</p>
              <p>Applicants: {job.applicantsCount}</p>
              <p>Status: {job.jobstatus}</p>
              {job.jobstatus === "Active" ? (
                <button onClick={() => handlePauseJob(job.id)}>Pause Job</button>
              ) : (
                <button onClick={() => handleActivateJob(job.id)}>Activate Job</button>
              )}
              <button onClick={() => handleDeleteJob(job.id)}>Delete Job</button>
              <JobActions
                jobId={job.id}
                onJobUpdate={handleJobUpdate}
                walletAddress={walletAddress}
                jobDetails={job}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageJobs;
