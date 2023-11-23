import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const JobPostingForm = ({isConnected, onSubmit }) => {
  // Define predefined lists for Job Category and Role
  const jobCategoryList = [
    "Dapp",
    "Smart Contract",
    "CA Bug Fixing",
    "Web Dev",
    "CA Audit",
    "Graphic Design",
    "NFT",
    "Mobile App/IOS",
    "TG Bot",
  ];

  const roleList = ["Owner", "MiddleMan"];

  const [jobData, setJobData] = useState({
    jobTitle: "",
    jobDescription: "",
    role: roleList[0],
    budget: "",
    jobtype: "Remote",
    jobcategory: jobCategoryList[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Check if the user is connected
  if (!isConnected) {
    alert("Please connect your wallet before posting a job.");
    return;
  }

    // Destructuring jobData for validation
    const {
      jobTitle,
      jobDescription,
      role,
      budget,
      jobtype,
      jobcategory,
    } = jobData;

    // Validate form fields
    if (
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
      // Get the current date and time
      const currentDate = new Date();

      // Format the date and time as a string
      const formattedDate = currentDate.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Add the job to Firestore
      const jobsCollection = collection(db, "jobs");
      const newJobDoc = await addDoc(jobsCollection, {
        jobTitle,
        jobDescription,
        role,
        budget: `$${budget}`,
        timestamp: formattedDate,
        jobtype,
        jobcategory,
        jobstatus: "Active",
      });

      onSubmit({
        jobTitle,
        jobDescription,
        role,
        budget: `$${budget}`,
        timestamp: formattedDate,
        jobtype,
        jobcategory,
        jobstatus: "Active",
      });

      // Reset the form fields
      setJobData({
        jobTitle: "",
        jobDescription: "",
        role: roleList[0],
        budget: "",
        jobtype: "Remote",
        jobcategory: jobCategoryList[0],
      });

      alert("Job posted successfully!");

      console.log("Job posted successfully with ID:", newJobDoc.id);
    } catch (error) {
      console.error("Error posting job:", error);
      // Handle error
    }
  };

  return (
    <form className="job-posting-form" onSubmit={handleSubmit}>
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
        />
      </label>
      <button type="submit" className="job-button">Post Job</button>
    </form>
  );
};

export default JobPostingForm;
