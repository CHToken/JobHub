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
import JobActions from "./JobActions"
import "./managejobs.css";

const ManageJobs = ({ walletAddress }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [applicants, setApplicants] = useState([]);

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

  const handleViewApplicantProfile = async (jobId) => {
    setSelectedJob(jobId);

    try {
      const appliedJobsQuery = collection(db, "appliedJobs");
      const querySnapshot = await getDocs(query(appliedJobsQuery, where("jobId", "==", jobId)));

      const applicantsData = querySnapshot.docs.map((applicantDoc) => {
        const data = applicantDoc.data();
        return {
          id: applicantDoc.id,
          ...data,
        };
      });

      setApplicants(applicantsData);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const handleViewApplicantProfileDetails = (applicantId) => {
    // Set the selected applicant to display JobActions
    setSelectedApplicant(applicantId);
  };

  const handleCloseApplicants = () => {
    setSelectedJob(null);
    setApplicants([]);
    setSelectedApplicant(null);
  };

  const truncateApplicantId = (applicantId) => {
    const truncatedId = `${applicantId.slice(0, 6)}......${applicantId.slice(-6)}`;
    return truncatedId;
  };

  return (
    <div className="manage-jobs-container">
      <h2>Manage Jobs</h2>
      <div className="row">
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div class="col-md-6 card">
            {jobs.map((job) => (
              <div key={job.id}>
                <div className="card-header">
                  <h3>{job.jobTitle}</h3>
                </div>
                <div className="p-3">
                  <p>Budget: {job.budget}</p>
                  <p>Applicants: {job.applicantsCount}</p>
                  <p>
                    Status: &nbsp;&nbsp;
                    <span className={`text-white badge bg-${job.jobstatus === 'Paused' ? 'danger' : 'success'}`}>
                      {job.jobstatus}
                    </span>
                  </p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-info ml-2" onClick={() => handleViewApplicantProfile(job.id)}>View Applicants</button>
                  <button className="btn btn-warning ml-2" onClick={() => handlePauseJob(job.id)}>Pause Job</button>
                  <button className="btn btn-success ml-2" onClick={() => handleActivateJob(job.id)}>Activate Job</button>
                  <button className="btn btn-danger ml-2" onClick={() => handleDeleteJob(job.id)}>Delete Job</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="overlay"></div>

      {selectedJob && (
        <div className="applicant-container">
          <h5>Applicants for {selectedJob}</h5>
          <ul className="applicant-list">
            {applicants.map((applicant) => (
              <li key={applicant.id} className="applicant-item">
                <p>Applicant ID: {truncateApplicantId(applicant.applicantId)}</p>
                <p>Username: <small>@</small>{applicant.applicantUsername}</p>
                <button onClick={() => handleViewApplicantProfileDetails(applicant.applicantId)}>
                  View Profile
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-secondary" onClick={handleCloseApplicants}>Close</button>
        </div>
      )}

      {selectedApplicant && (
        <div className="job-actions-container">
          <h5>Applicant Profile</h5>
          <JobActions
            jobId={selectedJob}
            onJobUpdate={handleJobUpdate}
            walletAddress={walletAddress}
            jobDetails={selectedApplicant}
          />
          <button onClick={() => setSelectedApplicant(null)}>Close Profile</button>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;