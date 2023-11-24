import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import "./JobPostingForm.css";

const JobPostingForm = ({ isConnected, onSubmit }) => {
  const jobCategoryList = [
    "Dapp",
    "Smart Contract",
    "Callers",
    "CA Bug Fix",
    "Website Dev",
    "CA Audit",
    "Design",
    "NFT",
    "Mobile Apps",
    "TG Bot",
  ];

  const roleList = ["Owner", "MiddleMan"];

  const [jobData, setJobData] = useState({
    company_name: "",
    jobTitle: "",
    jobDescription: "",
    role: roleList[0],
    budget: "",
    jobtype: "Remote",
    jobcategory: jobCategoryList[0],
    profilePicture: "", // Add a new field to store the user's profile picture
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isConnected) {
          const walletAddress = window.ethereum.selectedAddress.toLowerCase();
          const userDocRef = doc(db, "users", walletAddress);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setJobData((prevData) => ({ ...prevData, profilePicture: userData.profilePicture }));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isConnected]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConnected) {
      alert("Please connect your wallet before posting a job.");
      return;
    }

    const {
      company_name,
      jobTitle,
      jobDescription,
      role,
      budget,
      jobtype,
      jobcategory,
      profilePicture, // Include the user's profile picture in the job data
    } = jobData;

    if (
      !company_name ||
      !jobTitle ||
      !jobDescription ||
      !role ||
      isNaN(parseFloat(budget)) ||
      !jobtype ||
      !jobcategory
    ) {
      // Handle validation error
      return;
    }

    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const jobsCollection = collection(db, "jobs");
      const newJobDoc = await addDoc(jobsCollection, {
        company_name,
        jobTitle,
        jobDescription,
        role,
        budget: `$${budget}`,
        timestamp: formattedDate,
        jobtype,
        jobcategory,
        jobstatus: "Active",
        profilePicture, // Include the user's profile picture in the job data
      });

      onSubmit({
        company_name,
        jobTitle,
        jobDescription,
        role,
        budget: `$${budget}`,
        timestamp: formattedDate,
        jobtype,
        jobcategory,
        jobstatus: "Active",
        profilePicture, // Include the user's profile picture in the job data
      });

      setJobData({
        company_name: "",
        jobTitle: "",
        jobDescription: "",
        role: roleList[0],
        budget: "",
        jobtype: "Remote",
        jobcategory: jobCategoryList[0],
        profilePicture: "", // Reset the profile picture field
      });

      alert("Job posted successfully!");

      console.log("Job posted successfully with ID:", newJobDoc.id);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <form className="job-posting-form" onSubmit={handleSubmit}>
      <label className="job-label">
        Company/Project Name
        <input
          type="text"
          value={jobData.company_name}
          onChange={(e) => setJobData({ ...jobData, company_name: e.target.value })}
          className="job-input"
        />
      </label>
      <label className="job-label">
        Job Title
        <input
          type="text"
          value={jobData.jobTitle}
          onChange={(e) => setJobData({ ...jobData, jobTitle: e.target.value })}
          className="job-input"
        />
      </label>
      <label className="job-label">
        Job Description
        <textarea
          value={jobData.jobDescription}
          onChange={(e) =>
            setJobData({ ...jobData, jobDescription: e.target.value })
          }
          className="job-textarea"
        />
      </label>
      <label className="job-label">
        Role
        <select
          value={jobData.role}
          onChange={(e) => setJobData({ ...jobData, role: e.target.value })}
          className="job-select"
        >
          <option value="" disabled>
            Select a role
          </option>
          {roleList.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>
      <label className="job-label">
        Budget
        <div>
          <span>$</span>
          <input
            type="number"
            placeholder="Enter budget"
            value={jobData.budget}
            onChange={(e) => setJobData({ ...jobData, budget: e.target.value })}
            className="job-input"
          />
        </div>
      </label>
      <label className="job-label">
        Job Category
        <select
          value={jobData.jobcategory}
          onChange={(e) =>
            setJobData({ ...jobData, jobcategory: e.target.value })
          }
        >
          {jobCategoryList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label className="job-label">
        Job Type
        <textarea
          value={jobData.jobtype}
          onChange={(e) => setJobData({ ...jobData, jobtype: e.target.value })}
          disabled
          className="job-input"
        />
      </label>
      <button type="submit" className="job-button">Post Job</button>
    </form>
  );
};

export default JobPostingForm;
