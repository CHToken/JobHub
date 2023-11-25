import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import "./JobsDetails.css";

const generateUniqueApplicantId = () => {
  // Generate a timestamp string
  const timestamp = new Date().toISOString().replace(/\D/g, '');

  // Generate a random string
  const randomString = Math.random().toString(36).substring(2, 8);

  // Combine the timestamp and random string to create a unique ID
  const uniqueId = `applicant_${timestamp}_${randomString}`;

  return uniqueId;
};

const JobDetails = ({ isConnected, walletAddress }) => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobDocRef = doc(db, 'jobs', jobId);
        const jobSnapshot = await getDoc(jobDocRef);

        if (jobSnapshot.exists()) {
          setJobDetails({
            id: jobSnapshot.id,
            ...jobSnapshot.data(),
          });
        } else {
          console.error('Job not found');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleApplyNow = async () => {
    if (!jobDetails) {
      console.error('Job details not available.');
      return;
    }
  
      // Ensure walletAddress is defined
      if (!walletAddress) {
        console.error('Wallet address is undefined.');
        return;
      }

      // Check if the user is the job poster
    if (walletAddress === jobDetails.walletAddress) {
      alert("You cannot apply for the job you posted.");
      return;
    }
  
      // Check if the user has already applied for this job
      const appliedJobsQuery = collection(db, 'appliedJobs');
      const querySnapshot = await getDocs(query(appliedJobsQuery, where('jobId', '==', jobDetails.id), where('walletAddress', '==', walletAddress)));
  
      if (!querySnapshot.empty) {
        alert('You have already applied for this job.');
        return;
      }
  
     // Use the connected wallet address as the primary key for the applied job
    const applicantId = generateUniqueApplicantId();
    await addDoc(collection(db, 'appliedJobs'), {
      jobId: jobDetails.id,
      walletAddress,
      applicantId,
      appliedAt: new Date(),
    });
  
      await updateDoc(doc(db, 'jobs', jobDetails.id), {
        jobstatus: 'Applied',
      });
  
      // Show a success alert
      alert('Job applied successfully!');
    }; 
   
  
  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details-container">
      <div className="job-posts-container">
        <div key={jobDetails.id} className="job-details-card">
          <div className="layout1" style={{ backgroundColor: jobDetails.backgroundColor }}>
            <div className="job-timestamp">
              <p>{jobDetails.timestamp}</p>
            </div>
            <div className="job-cname"><p>{jobDetails.company_name}</p></div>
            <div className="job-role"><p>{jobDetails.role}</p></div>
            <div className="job-title"><h3>{jobDetails.jobTitle}</h3></div>
            <div className="job-type"><p>{jobDetails.jobtype}</p></div>
            <div className="job-budget"><p>{jobDetails.budget}</p></div>
            <div className="job-category"><p>{jobDetails.jobcategory}</p></div>
          </div>
          <div className="jobDescription">
            <p className="">{jobDetails.jobDescription}</p>
          </div>
          <div className="jobsdetails-btn">
            <div className="status-details-section">
              <h4>{jobDetails.jobstatus}</h4>
            </div>
            <div>
              <button className="btn btn-primary ml-1" onClick={handleApplyNow}>
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
