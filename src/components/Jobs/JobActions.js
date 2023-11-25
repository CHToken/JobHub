import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc, deleteDoc, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const JobActions = ({ jobId, onJobUpdate }) => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const appliedJobsQuery = collection(db, 'appliedJobs');
        const querySnapshot = await getDocs(query(appliedJobsQuery, where('jobId', '==', jobId)));

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
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleAcceptApplicant = async (applicantId) => {
    try {
      await updateDoc(doc(db, 'jobs', jobId), {
        jobstatus: 'Accepted',
      });
      await updateDoc(doc(db, 'appliedJobs', applicantId), {
        applicantStatus: 'Accepted',
      });
      onJobUpdate();
    } catch (error) {
      console.error('Error accepting applicant:', error);
    }
  };

  const handleRejectApplicant = async (applicantId) => {
    try {
      // Update the job status to "Rejected"
      await updateDoc(doc(db, 'jobs', jobId), {
        jobstatus: 'Rejected',
      });

      // Perform other logic for rejecting the applicant
      await updateDoc(doc(db, 'appliedJobs', applicantId), {
        applicantStatus: 'Rejected',
      });

      // Notify the parent component about the job update
      onJobUpdate();
    } catch (error) {
      console.error('Error rejecting applicant:', error);
    }
  };

  const handleAssignApplicant = async (applicantId) => {
    try {
      // Perform logic for assigning the applicant to the job
      // You might want to update the job document or create a new collection for assigned jobs

      // Notify the parent component about the job update
      onJobUpdate();
    } catch (error) {
      console.error('Error assigning applicant:', error);
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
              {/* Add more details from the applicant if needed */}
              <button onClick={() => handleAcceptApplicant(applicant.id)}>Accept Applicant</button>
              <button onClick={() => handleRejectApplicant(applicant.id)}>Reject Applicant</button>
              <button onClick={() => handleAssignApplicant(applicant.id)}>Assign Applicant</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobActions;
