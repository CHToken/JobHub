import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "./JobsDetails.css";

const JobDetails = ({ isConnected, walletAddress }) => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [applicantUsername, setApplicantUsername] = useState(null);
  // const [appliedJobs, setAppliedJobs] = useState([]);
  const [hasAppliedInSession, setHasAppliedInSession] = useState(false);
  const [hasAlreadyApplied, setHasAlreadyApplied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch job details, username, and applied jobs in parallel
        const [jobSnapshot, userDoc] = await Promise.all([
          getDoc(doc(db, "jobs", jobId)),
          walletAddress &&
            getDoc(doc(collection(db, "users"), walletAddress)),
        ]);

        if (jobSnapshot.exists()) {
          setJobDetails({
            id: jobSnapshot.id,
            ...jobSnapshot.data(),
          });
        } else {
          console.error("Job not found");
        }

        if (userDoc && userDoc.exists()) {
          setApplicantUsername(userDoc.data().username);
        } else {
          console.error("User not found");
        }

        if (walletAddress) {
          const appliedJobsQuery = collection(db, "appliedJobs");
          const querySnapshot = await getDocs(
            query(
              appliedJobsQuery,
              where("jobId", "==", jobId),
              where("walletAddress", "==", walletAddress)
            )
          );

          const appliedJobsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Check if the user has already applied for this job
          const existingApplication = appliedJobsData.find(
            (application) => application.appliedjobstatus === "Applied" || application.jobId
          );

          setHasAlreadyApplied(!!existingApplication);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [jobId, walletAddress]);

  const handleApplyNow = async () => {
    try {
      // Check conditions for applying
      if (!isConnected) {
        alert("Please connect your wallet to apply for the job.");
        return;
      }

      if (!applicantUsername) {
        alert("Please update your profile to apply for the job.");
        return;
      }

      if (!jobDetails || !applicantUsername || !walletAddress) {
        console.error(
          "Job details, applicant username, or wallet address not available."
        );
        return;
      }

      if (jobDetails.jobstatus !== "Active") {
        alert("This job is currently not accepting applications.");
        return;
      }

      if (jobDetails?.jobstatus === "Assigned") {
        alert("This job has already been assigned to an applicant.");
        return;
      }

      // Check if the current user is the job poster
      if (walletAddress === jobDetails.walletAddress) {
        alert("You cannot apply for the job you posted.");
        return;
      }

      // Check if the user has already applied in the current session
      if (hasAppliedInSession) {
        alert("You have already applied for this job in this session.");
        return;
      }

      // Check if the user has already applied for this job
      if (hasAlreadyApplied) {
        alert("You have already applied for this job.");
        return;
      }

      // Apply for the job
      await addDoc(collection(db, "appliedJobs"), {
        jobId: jobDetails.id,
        walletAddress,
        applicantId: walletAddress,
        applicantUsername,
        appliedAt: new Date(),
        appliedjobstatus: "Applied",
      });

      // Set the flag indicating that the user has applied in this session
      setHasAppliedInSession(true);

      // Show a success alert
      alert("Job applied successfully!");
    } catch (error) {
      console.error("Error applying for the job:", error);
    }
  };

  return (
    <div className="job-details-container">
      <div className="job-posts-container">
        <div key={jobDetails?.id} className="job-details-card">
          <div
            className="layout1"
            style={{ backgroundColor: jobDetails?.backgroundColor }}
          >
            <div className="job-timestamp">
              <p>{jobDetails?.timestamp}</p>
            </div>
            <div className="job-cname">
              <p>{jobDetails?.company_name}</p>
            </div>
            <div className="job-role">
              <p>{jobDetails?.role}</p>
            </div>
            <div className="job-title">
              <h3>{jobDetails?.jobTitle}</h3>
            </div>
            <div className="job-type">
              <p>{jobDetails?.jobtype}</p>
            </div>
            <div className="job-budget">
              <p>{jobDetails?.budget}</p>
            </div>
            <div className="job-category">
              <p>{jobDetails?.jobcategory}</p>
            </div>
          </div>
          <div className="jobDescription">
            <p className="">{jobDetails?.jobDescription}</p>
          </div>
          <div className="jobsdetails-btn">
            <div className="status-details-section">
              <h4>{jobDetails?.jobstatus}</h4>
            </div>
            <div>
              <button
                className="btn btn-primary ml-1"
                onClick={handleApplyNow}
                disabled={hasAlreadyApplied || hasAppliedInSession}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
