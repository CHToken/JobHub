import React from "react";

const truncateApplicantId = (applicantId) => {
  const truncatedId = `${applicantId.slice(0, 6)}......${applicantId.slice(-6)}`;
  return truncatedId;
};

const JobApplicants = ({ jobId, onViewApplicantProfile, applicants, onClose }) => {
  return (
    <div className="applicant-container">
      <h5>Applicants for {jobId}</h5>
      <ul className="applicant-list">
        {applicants.map((applicant) => (
          <li key={applicant.id} className="applicant-item">
            <p>Applicant ID: {truncateApplicantId(applicant.applicantId)}</p>
            <p>
              Username: <small>@</small>
              {applicant.applicantUsername}
            </p>
            <button onClick={() => onViewApplicantProfile(applicant.id)}>
              View Profile
            </button>
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary" onClick={onClose}>Close</button>
    </div>
  );
};

export default JobApplicants;
