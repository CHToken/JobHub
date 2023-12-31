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
import { Alert } from "antd";

const JobActions = ({ jobId, onJobUpdate, walletAddress, jobDetails }) => {
  const [applicants, setApplicants] = useState([]);
  const [alertInfo, setAlertInfo] = useState(null);

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

  const showAlert = (type, message) => {
    setAlertInfo({ type, message });
  };

  const handleAcceptApplicant = async (applicantId) => {
    try {
      // Check if the applicant has already been assigned
      if (jobDetails.jobstatus === "Assigned") {
        showAlert("warning", "This job has already been assigned. You cannot accept or reject applicants.");
        return;
      }

      await updateDoc(doc(db, "appliedJobs", applicantId), {
        applicantStatus: "Accepted",
      });

      onJobUpdate();
      showAlert("success", "Applicant has been accepted.");
    } catch (error) {
      console.error("Error accepting applicant:", error);
      showAlert("error", "Error accepting applicant.");
    }
  };

  const handleRejectApplicant = async (applicantId) => {
    try {
      // Check if the applicant has already been assigned
      if (jobDetails.jobstatus === "Assigned") {
        showAlert("warning", "This job has already been assigned. You cannot accept or reject applicants.");
        return;
      }

      // Update only the appliedJobs collection for rejection
      await updateDoc(doc(db, "appliedJobs", applicantId), {
        applicantStatus: "Rejected",
      });

      onJobUpdate();
      showAlert("success", "Applicant has been rejected.");
    } catch (error) {
      console.error("Error rejecting applicant:", error);
      showAlert("error", "Error rejecting applicant.");
    }
  };

  const handleAssignApplicant = async (applicantId) => {
    try {
      // Check if the applicant has already been assigned
      if (jobDetails.jobstatus === "Assigned") {
        showAlert("warning", "This job has already been assigned. You cannot assign applicants.");
        return;
      }

      // Check if the current user is the job poster
      if (walletAddress !== jobDetails.walletAddress) {
        showAlert("warning", "You do not have permission to assign this applicant.");
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
      showAlert("success", "Applicant has been assigned.");
    } catch (error) {
      console.error("Error assigning applicant:", error);
      showAlert("error", "Error assigning applicant.");
    }
  };

  return (
    <div className="card mb-2">
      <h3>Applicants</h3>
      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        <div>
          {applicants.map((applicant) => (
            <div key={applicant.id}>
              {/* Display applicant information */}
              <p className="eclipse">Applicant ID: {applicant.applicantId}</p>
              <p>Applicant Status: {applicant.applicantStatus}</p>
              <p>Profession: {applicant.applicantDetails.role}</p>
              <p>About User: {applicant.applicantDetails.aboutuser}</p>
              <p>Skills: {applicant.applicantDetails.skills}</p>
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
              <button className="btn btn-success m-2" onClick={() => handleAcceptApplicant(applicant.id)}>
                Accept Applicant
              </button>
              <button className="btn btn-danger m-2" onClick={() => handleRejectApplicant(applicant.id)}>
                Reject Applicant
              </button>
              <button className="btn btn-info m-2" onClick={() => handleAssignApplicant(applicant.id)}>
                Assign Applicant
              </button>
            </div>
          ))}
        </div>
      )}
      {alertInfo && (
        <Alert
          message={alertInfo.message}
          type={alertInfo.type}
          showIcon
          closable
          onClose={() => setAlertInfo(null)}
        />
      )}
    </div>
  );
};

export default JobActions;
