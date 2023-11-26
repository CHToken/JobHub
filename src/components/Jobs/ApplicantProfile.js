import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const ApplicantProfile = ({ jobId, applicantId, onClose, onJobUpdate, jobDetails, walletAddress }) => {
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const applicantDocRef = doc(db, "appliedJobs", applicantId);
        const applicantDocSnap = await getDoc(applicantDocRef);
        const applicantData = applicantDocSnap.data();

        // Fetch applicant information from the 'users' collection
        const userDocRef = doc(db, "users", applicantData.applicantId);
        const userDocSnap = await getDoc(userDocRef);
        const userDetails = userDocSnap.data();

        setApplicant({
          id: applicantDocSnap.id,
          applicantDetails: userDetails,
          ...applicantData,
        });
      } catch (error) {
        console.error("Error fetching applicant details:", error);
      }
    };

    if (applicantId) {
      fetchApplicant();
    }
  }, [applicantId]);

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

  const truncateApplicantId = (applicantId) => {
    const truncatedId = `${applicantId.slice(0, 6)}......${applicantId.slice(-6)}`;
    return truncatedId;
  };

  return (
    <div className="card mb-2">
      {applicant ? (
        <>
          <h5>Applicant Profile</h5>
          <p>Applicant ID: {truncateApplicantId(applicant.applicantId)}</p>
          <p>Applicant Status: {applicant.applicantStatus}</p>
          <p>Profession: {applicant.applicantDetails.role}</p>
          <p>About User: {applicant.applicantDetails.aboutuser}</p>
          <div>
            <p>Skills:</p>
            <ul style={{ paddingLeft: '20px' }}>
              {applicant.applicantDetails.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <p>Past Projects:</p>
          <ul>
            {applicant.applicantDetails.pastProjects.map((project, index) => (
              <li key={index}>
                <p>Title: {project.title}</p>
                <p>Description: {project.description}</p>
                <p>
                  Link: <a href={project.link}>{project.link}</a>
                </p>
              </li>
            ))}
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
          <button className="btn btn-secondary" onClick={onClose}>
            Close Profile
          </button>
        </>
      ) : (
        <p>No applicant profile found.</p>
      )}
    </div>
  );
};

export default ApplicantProfile;