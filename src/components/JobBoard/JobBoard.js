import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
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

const itemsPerPage = 9;

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalItems = jobs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedJobs = jobs.slice(startIndex, endIndex);

  return (
    <div className="job-board-container">
      <h2>Job Board</h2>
      <div className="job-posts-container">
        {displayedJobs.map((job) => (
          <div key={job.id} className="job-post-card">
            <div className="layout1" style={{ backgroundColor: job.backgroundColor }}>
              <div className="job-timestamp">
                <p>{job.timestamp}</p>
              </div>
              <div className="job-cname"><p>{job.company_name}</p></div>
              <div className="job-role"><p>{job.role}</p></div>
              <div className="job-title"><h3>{job.jobTitle}</h3></div>
              <div className="job-type"><p>{job.jobtype}</p></div>
              <div className="job-budget"><p>{job.budget}</p></div>
              <div className="job-category"><p>{job.jobcategory}</p></div>
            </div>
            <div className="jobDescription">
              <p className="clamp-text">{job.jobDescription}</p>
            </div>
            <div className="jobboard-btn">
              <div className="status-section">
                <h4>{job.jobstatus}</h4>
              </div>
              <div className="details-section">
              <h4><Link to={`/jobs/${job.id}`} className="btn btn-secondary">
    View
  </Link></h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-buttons">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="pagination-button">
          Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default JobBoard;
