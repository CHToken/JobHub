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
import { useWallet } from '../WalletContext';

const JobDetails = () => {
  const { isConnected, walletAddress, connectWallet } = useWallet();
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [applicantUsername, setApplicantUsername] = useState(null);
  const [hasAppliedInSession, setHasAppliedInSession] = useState(false);
  const [hasAlreadyApplied, setHasAlreadyApplied] = useState(false);
  const [isJobPoster, setIsJobPoster] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!walletAddress) return;

        const [jobSnapshot, userDoc] = await Promise.all([
          getDoc(doc(db, "jobs", jobId)),
          getDoc(doc(collection(db, "users"), walletAddress.toLowerCase())),
        ]);

        if (jobSnapshot.exists()) {
          setJobDetails({
            id: jobSnapshot.id,
            ...jobSnapshot.data(),
          });

          if (jobSnapshot.data().senderId.toLowerCase() === walletAddress.toLowerCase()) {
            setIsJobPoster(true);
            return;
          }
        } else {
          console.error("Job not found");
        }

        if (userDoc && userDoc.exists()) {
          setApplicantUsername(userDoc.data().username);
        } else {
          console.error("User not found");
        }

        const appliedJobsQuery = collection(db, "appliedJobs");
        const querySnapshot = await getDocs(
          query(
            appliedJobsQuery,
            where("jobId", "==", jobId),
            where("senderId", "==", walletAddress)
          )
        );

        const appliedJobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const existingApplication = appliedJobsData.find(
          (application) => application.appliedjobstatus === "Applied" || application.jobId
        );

        setHasAlreadyApplied(!!existingApplication);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [jobId, walletAddress]);

  const handleApplyNow = async () => {
    try {
      if (!isConnected) {
        await connectWallet();
        return;
      }

      if (walletAddress.toLowerCase() === jobDetails?.walletAddress) {
        alert("You cannot apply for the job you posted.");
        return;
      }

      const existingApplicationQuery = collection(db, "appliedJobs");
      const existingApplicationSnapshot = await getDocs(
        query(
          existingApplicationQuery,
          where("jobId", "==", jobDetails?.id),
          where("applicantId", "==", walletAddress.toLowerCase()),
          where("appliedjobstatus", "==", "Applied")
        )
      );

      const existingApplications = existingApplicationSnapshot.docs.map((doc) => doc.data());

      if (existingApplications.length > 0) {
        alert("You have already applied for this job.");
        return;
      }

      if (!applicantUsername) {
        alert("Please update your profile to apply for the job.");
        return;
      }

      if (!jobDetails || !walletAddress) {
        console.error("Job details or wallet address not available.");
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

      if (hasAppliedInSession) {
        alert("You have already applied for this job in this session.");
        return;
      }

      await addDoc(collection(db, "appliedJobs"), {
        jobId: jobDetails.id,
        walletAddress,
        applicantId: walletAddress,
        applicantUsername,
        appliedAt: new Date(),
        appliedjobstatus: "Applied",
      });

      setHasAppliedInSession(true);

      alert("Job applied successfully!");
    } catch (error) {
      console.error("Error applying for the job:", error);
    }
  };

  return (
    <div className="job-details-container">
      <div className="job-posts-container" style={{ display: 'block' }}>
        {jobDetails ? (
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
                  disabled={hasAlreadyApplied || hasAppliedInSession || isJobPoster}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );  
};

export default JobDetails;
