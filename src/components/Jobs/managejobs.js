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
  deleteDoc,
} from "firebase/firestore";
import JobApplicants from "./JobApplicants";
import ApplicantProfile from "./ApplicantProfile";
import { notification } from "antd";
import "./managejobs.css";
import { useWallet } from '../WalletContext';

const ManageJobs = () => {
  const { walletAddress } = useWallet();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [applicants, setApplicants] = useState([]);

  const fetchJobs = useCallback(async () => {
    try {
      if (!walletAddress) {
        return;
      }
  
      const walletAddressLowerCase = walletAddress.toLowerCase();
  
      const jobsQuery = collection(db, 'jobs');
      const querySnapshot = await getDocs(
        query(jobsQuery, where('senderId', '==', walletAddressLowerCase))
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
      console.error('Error fetching jobs:', error);
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

      notification.success({
        message: `Job ${action}`,
        description: `Job '${jobData.jobTitle}' has been ${message}.`,
      });

      handleJobUpdate();
    } catch (error) {
      notification.error({
        message: `Error ${message.toLowerCase()} job`,
        description: `An error occurred while ${message.toLowerCase()} job: ${error.message}`,
      });
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      // Display a confirmation dialog
      const userConfirmed = window.confirm("Are you sure you want to delete this job?");
  
      if (!userConfirmed) {
        // User clicked 'Cancel' or closed the dialog
        return;
      }
  
      const jobDocRef = doc(db, "jobs", jobId);
  
      // Delete the job document
      await deleteDoc(jobDocRef);
  
      notification.success({
        message: "Job Deleted",
        description: "Job has been successfully deleted.",
      });
  
      handleJobUpdate();
    } catch (error) {
      notification.error({
        message: "Error deleting job",
        description: `An error occurred while deleting job: ${error.message}`,
      });
    }
  };  

  const handlePauseJob = (jobId) => {
    handleJobAction(jobId, "Paused", "paused");
  };

  const handleActivateJob = (jobId) => {
    handleJobAction(jobId, "Active", "activated");
  };

  const handleViewApplicantProfile = async (jobId) => {
    try {
      const appliedJobsQuery = query(
        collection(db, "appliedJobs"),
        where("jobId", "==", jobId)
      );
      const querySnapshot = await getDocs(appliedJobsQuery);

      const applicantsData = querySnapshot.docs.map((applicantDoc) => {
        const data = applicantDoc.data();
        return {
          id: applicantDoc.id,
          ...data,
        };
      });

      setSelectedJob(jobId);
      setSelectedApplicant(null);
      setApplicants(applicantsData);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const handleCloseApplicants = () => {
    setSelectedJob(null);
    setApplicants([]);
  };

  const CloseApplicantsProfile = () => {
    setSelectedApplicant(null);
  };

  return (
    <div className="manage-jobs-container">
      <h2>Manage Jobs</h2>
      <div className="row">
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="col-md-6 card">
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
                    <span
                      className={`text-white badge bg-${
                        job.jobstatus === "Paused" ? "danger" : "success"
                      }`}
                    >
                      {job.jobstatus}
                    </span>
                  </p>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-info ml-2"
                    onClick={() => handleViewApplicantProfile(job.id)}
                  >
                    View Applicants
                  </button>
                  <button
                    className="btn btn-warning ml-2"
                    onClick={() => handlePauseJob(job.id)}
                  >
                    Pause Job
                  </button>
                  <button
                    className="btn btn-success ml-2"
                    onClick={() => handleActivateJob(job.id)}
                  >
                    Activate Job
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="overlay"></div>

      {selectedJob && (
        <JobApplicants
          jobId={selectedJob}
          onViewApplicantProfile={setSelectedApplicant}
          applicants={applicants}
          onClose={handleCloseApplicants}
        />
      )}

{selectedApplicant && (
        <div className="job-actions-container">
          <ApplicantProfile
            jobId={selectedJob}
            applicantId={selectedApplicant}
            onJobUpdate={handleJobUpdate}
            walletAddress={walletAddress}
            jobDetails={selectedApplicant}
            onClose={CloseApplicantsProfile}
          />
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
