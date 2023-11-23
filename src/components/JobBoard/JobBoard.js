import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import "./JobBoard.css"; // Import the CSS file for styling

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsCollection = collection(db, "jobs");
        const snapshot = await getDocs(jobsCollection);

        const jobsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-board-container">
      <h2>Job Board</h2>
      <div className="job-posts-container">
        {jobs.map((job) => (
          <div key={job.id} className="job-post-card">
            <h3>{job.jobTitle}</h3>
            <p>{job.jobDescription}</p>
            <p>Role: {job.role}</p>
            <p>Budget: {job.budget}</p>
            <p>Category: {job.jobcategory}</p>
            <p>Type: {job.jobtype}</p>
            <p>Status: {job.jobstatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
