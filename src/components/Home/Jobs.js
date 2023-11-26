import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs, query, limit } from "firebase/firestore";

const HomeJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsCollection = collection(db, "jobs");
        // Use the query function to apply a limit to the number of jobs fetched
        const limitedJobsQuery = query(jobsCollection, limit(5));

        const snapshot = await getDocs(limitedJobsQuery);

        const jobsData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const job = {
              id: doc.id,
              ...doc.data(),
            };

            return job;
          })
        );

        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // const truncateDescription = (description, maxLength) => {
  //   return description.length > maxLength
  //     ? `${description.substring(0, maxLength)}...`
  //     : description;
  // };

  return (
    <div className="mt-10 bg-second">
      <div className="row">
        <div className="col-6">
          <h1>
            <span className="underlined">Popular Jobs</span> for you
          </h1>
          <p>Yeah categories are here!! :)</p>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center">
          <Link to="/jobboard" className="btn btn-outline bg-white">
            See All Jobs
          </Link>
        </div>
      </div>
      <div className="row mt-5 jobs-list">
        {jobs.map((job) => (
          <div key={job.id} className="col-md-4">
            <div className="card">
              <div className="row">
                <div className="col-6">
                  {job.profilePicture ? (
                    <img
                      src={job.profilePicture}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        border: "5px outset",
                        borderBlockColor: "#4B46E1",
                        padding: "15px",
                      }}
                    />
                  )}
                </div>
                <div className="col-6 d-flex flex-column align-items-start justify-content-center">
                  <h3>{job.company_name}</h3>
                  <p>{job.jobtype}</p>
                  <small className="opacity-75">{job.budget}</small>
                </div>
              </div>
              <h3>{job.jobTitle}</h3>
              <small className="opacity-75">
                {job.timestamp} • {job.timeAgo}
              </small>
              <br />
              <div>
                <p className="clamp-text">
                  {job.jobDescription}
                </p>
                <Link to={`/jobs/${job.id}`} className="btn btn-secondary">
                  Read More
                </Link>
                <Link to={`/jobs/${job.id}`} className="btn btn-primary ml-1">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeJobs;
