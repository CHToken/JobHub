import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import "./JobBoard.css";

// Array of background color hex codes
const jobColors = [
  "#adedff",
  "#ffadad",
  "#ffd3ad",
  "#c7ffad",
  "#ffadd7",
  "#b4adff",
  "#fff2ad",
  "#ffd6ad",
];

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsCollection = collection(db, "jobs");
        const snapshot = await getDocs(jobsCollection);

        const jobsData = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          ...doc.data(),
          // Use modulo to cycle through color codes
          backgroundColor: jobColors[index % jobColors.length],
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
            <div className="layout1" style={{ backgroundColor: job.backgroundColor }}>
              <div className="job-timestamp">
                <p>{job.timestamp}</p>
              </div>
              <p id="job-role">{job.role}</p>
              <h3 id="job-title">{job.jobTitle}</h3>
              <p id="job-type">{job.jobtype}</p>
              <p id="job-budget">{job.budget}</p>
              <p id="job-category">{job.jobcategory}</p>
            </div>
            <div className="jobDescription">
              <p className="clamp-text">{job.jobDescription}</p>
            </div>
            <div className="jobboard-btn">
              <div className="status-section">
                <h4>{job.jobstatus}</h4>
              </div>
              <div className="details-section">
                <h4>Details</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
