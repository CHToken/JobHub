import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

const JobActions = ({ jobId, onJobUpdate, walletAddress, jobDetails }) => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const appliedJobsQuery = collection(db, "appliedJobs");
        const querySnapshot = await getDocs(
          query(appliedJobsQuery, where("jobId", "==", jobId))
        );

        const applicantsData = [];
        for (const applicantDoc of querySnapshot.docs) {
          const data = applicantDoc.data();
          applicantsData.push({
            id: applicantDoc.id,
            ...data,
          });
        }

        setApplicants(applicantsData);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleUpdateJobAndApplicant = async (jobStatus, applicantStatus, applicantId) => {
    // Check if the current user is the job poster
    if (walletAddress !== jobDetails.walletAddress) {
      alert("You do not have permission to update this job.");
      return;
    }

    const batch = writeBatch(db);

    const jobDocRef = doc(db, "jobs", jobId);
    batch.update(jobDocRef, { jobstatus: jobStatus });

    const appliedJobDocRef = doc(db, "appliedJobs", applicantId);
    batch.update(appliedJobDocRef, { applicantStatus: applicantStatus });

    await batch.commit();
  };

  const handleAcceptApplicant = async (applicantId) => {
    try {
      await handleUpdateJobAndApplicant("Accepted", "Accepted", applicantId);
      onJobUpdate();
    } catch (error) {
      console.error("Error accepting applicant:", error);
    }
  };

  const handleRejectApplicant = async (applicantId) => {
    try {
      await handleUpdateJobAndApplicant("Rejected", "Rejected", applicantId);
      onJobUpdate();
    } catch (error) {
      console.error("Error rejecting applicant:", error);
    }
  };

  const handleAssignApplicant = async (applicantId) => {
    try {
      // Perform logic for assigning the applicant to the job
      // You might want to update the job document or create a new collection for assigned jobs
      // Check if the current user is the job poster
      if (walletAddress !== jobDetails.walletAddress) {
        alert("You do not have permission to assign this applicant.");
        return;
      }

      // Update only the appliedJobs collection for assignment
      await updateDoc(doc(db, "appliedJobs", applicantId), {
        applicantStatus: "Assigned",
      });

      onJobUpdate();
    } catch (error) {
      console.error("Error assigning applicant:", error);
    }
  };

  return (
    <div>
      <h3>Applicants</h3>
      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        <ul>
          {applicants.map((applicant) => (
            <li key={applicant.id}>
              <p>Applicant ID: {applicant.applicantId}</p>
              <p>Applicant Status: {applicant.applicantStatus}</p>
              <button onClick={() => handleAcceptApplicant(applicant.id)}>
                Accept Applicant
              </button>
              <button onClick={() => handleRejectApplicant(applicant.id)}>
                Reject Applicant
              </button>
              <button onClick={() => handleAssignApplicant(applicant.id)}>
                Assign Applicant
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobActions;
