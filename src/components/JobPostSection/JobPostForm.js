import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { Alert } from "antd";
import "./JobPostingForm.css";
import { useWallet } from '../WalletContext';

const JobPostingForm = ({ onSubmit }) => {
  const jobCategoryList = [
    "Dapp Dev",
    "Smart Contract",
    "CA Dev",
    "Dextools Trending",
    "Callers",
    "Bug Fix",
    "Software",
    "TG Mod",
    "AMA Host",
    "CA Bug Fix",
    "Website Dev",
    "CA Audit",
    "Design",
    "NFT Dev",
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
    profilePicture: "",
  });

  const [alertInfo, setAlertInfo] = useState(null);
  const { isConnected: walletConnected, walletAddress } = useWallet();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (walletConnected) {
          const userDocRef = doc(db, "users", walletAddress.toLowerCase());
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setJobData((prevData) => ({
              ...prevData,
              profilePicture: userData.profilePicture,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [walletConnected, walletAddress]);

  const showAlert = (type, message) => {
    setAlertInfo({ type, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletConnected) {
      showAlert("warning", "Please connect your wallet before posting a job.");
      return;
    }

    const walletAddressLowerCase = walletAddress.toLowerCase();

    const {
      company_name,
      jobTitle,
      jobDescription,
      role,
      budget,
      jobtype,
      jobcategory,
      profilePicture,
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
      showAlert("error", "Please fill in all the required fields.");
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
        senderId: walletAddressLowerCase,
        company_name,
        jobTitle,
        jobDescription,
        role,
        budget: `$${budget}`,
        timestamp: formattedDate,
        jobtype,
        jobcategory,
        jobstatus: "Active",
        profilePicture,
      });

      onSubmit({
        senderId: walletAddressLowerCase,
        company_name,
        jobTitle,
        jobDescription,
        role,
        budget: `$${budget}`,
        timestamp: formattedDate,
        jobtype,
        jobcategory,
        jobstatus: "Active",
        profilePicture,
      });

      setJobData({
        company_name: "",
        jobTitle: "",
        jobDescription: "",
        role: roleList[0],
        budget: "",
        jobtype: "Remote",
        jobcategory: jobCategoryList[0],
        profilePicture: "",
      });

      showAlert("success", "Job posted successfully!");
      console.log("Job posted successfully with ID:", newJobDoc.id);
    } catch (error) {
      console.error("Error posting job:", error);
      showAlert("error", "Error posting job.");
    }
  };

  return (
    <form className="job-posting-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <label className="job-label">
            Company/Project Name
            <input
              type="text"
              value={jobData.company_name}
              onChange={(e) =>
                setJobData({ ...jobData, company_name: e.target.value })
              }
              className="job-input"
            />
          </label>
        </div>
        <div className="col-md-6">
          <label className="job-label">
            Job Title
            <input
              type="text"
              value={jobData.jobTitle}
              onChange={(e) =>
                setJobData({ ...jobData, jobTitle: e.target.value })
              }
              className="job-input"
            />
          </label>
        </div>
      </div>
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
      <div className="row">
        <div className="col-md-6">
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
        </div>
        <div className="col-md-6">
          <label className="job-label">
            Job Category
            <select
              value={jobData.jobcategory}
              className="job-select"
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
        </div>
      </div>
      <label className="job-label">
        Budget
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              $
            </span>
          </div>
          <input
            type="number"
            placeholder="Enter budget"
            value={jobData.budget}
            onChange={(e) => setJobData({ ...jobData, budget: e.target.value })}
            className="form-control"
          />
        </div>
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
      <button type="submit" className="job-button">
        Post Job
      </button>
      {/* Ant Design Alert */}
      {alertInfo && (
        <Alert
          message={alertInfo.message}
          type={alertInfo.type}
          showIcon
          closable
          onClose={() => setAlertInfo(null)}
          className="custom-alert"
        />
      )}
    </form>
  );
};

export default JobPostingForm;
