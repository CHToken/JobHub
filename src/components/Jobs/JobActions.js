import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
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

          // Fetch applicant information from the 'users' collection
          const applicantId = data.applicantId;
          const applicantDocRef = doc(db, "users", applicantId);
          const applicantDocSnap = await getDoc(applicantDocRef);
          const applicantDetails = applicantDocSnap.data();

          applicantsData.push({
            id: applicantDoc.id,
            applicantDetails,
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

  const handleAcceptApplicant = async (applicantId) => {
    try {
      // Check if the applicant has already been assigned
      if (jobDetails.jobstatus === "Assigned") {
        window.alert("This job has already been assigned. You cannot accept or reject applicants.");
        return;
      }

      await updateDoc(doc(db, "appliedJobs", applicantId), {
        applicantStatus: "Accepted",
      });

      onJobUpdate();
      window.alert("Applicant has been accepted.");
    } catch (error) {
      console.error("Error accepting applicant:", error);
    }
  };

  const handleRejectApplicant = async (applicantId) => {
    try {
      // Check if the applicant has already been assigned
      if (jobDetails.jobstatus === "Assigned") {
        window.alert("This job has already been assigned. You cannot accept or reject applicants.");
        return;
      }

      // Update only the appliedJobs collection for assignment
      await updateDoc(doc(db, "appliedJobs", applicantId), {
        applicantStatus: "Rejected",
      });

      onJobUpdate();
      window.alert("Applicant has been rejected.");
    } catch (error) {
      console.error("Error rejecting applicant:", error);
    }
  };

  const handleAssignApplicant = async (applicantId) => {
    try {
      // Check if the applicant has already been assigned
      if (jobDetails.jobstatus === "Assigned") {
        window.alert("This job has already been assigned. You cannot assign applicants.");
        return;
      }

      // Check if the current user is the job poster
      if (walletAddress !== jobDetails.walletAddress) {
        window.alert("You do not have permission to assign this applicant.");
        return;
      }

      const jobDocRef = doc(db, "jobs", jobId);
      await updateDoc(jobDocRef, {
        jobstatus: "Assigned",
      });

      // Update only the appliedJobs collection for assignment
      await updateDoc(doc(db, "appliedJobs", applicantId), {
        applicantStatus: "Assigned",
      });

      onJobUpdate();
      window.alert("Applicant has been assigned.");
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
              {/* Display applicant information */}
              <p>Applicant ID: {applicant.applicantId}</p>
              <p>Applicant Status: {applicant.applicantStatus}</p>
              <p>About User: {applicant.applicantDetails.aboutuser}</p>
              <p>Past Projects:</p>
              <ul>
                {applicant.applicantDetails.pastProjects.map(
                  (project, index) => (
                    <li key={index}>
                      <p>Title: {project.title}</p>
                      <p>Description: {project.description}</p>
                      <p>
                        Link: <a href={project.link}>{project.link}</a>
                      </p>
                    </li>
                  )
                )}
              </ul>
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
