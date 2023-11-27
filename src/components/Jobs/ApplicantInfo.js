import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const ApplicantInfo = ({ applicantId }) => {
  const [applicantInfo, setApplicantInfo] = useState(null);

  useEffect(() => {
    const fetchApplicantInfo = async () => {
      try {
        if (!applicantId) {
          console.error("Applicant ID is undefined");
          return;
        }
        const appliedJobsCollection = collection(db, "appliedJobs");
        const appliedJobsQuery = query(
          appliedJobsCollection,
          where("applicantId", "==", applicantId)
        );
        const appliedJobsSnapshot = await getDocs(appliedJobsQuery);

        if (!appliedJobsSnapshot.empty) {
          const applicantData = appliedJobsSnapshot.docs[0].data();
          setApplicantInfo(applicantData);
        } else {
          console.error("Applicant not found in appliedJobs");
        }
      } catch (error) {
        console.error("Error fetching applicant info:", error);
      }
    };

    fetchApplicantInfo();
  }, [applicantId]);

  if (!applicantInfo) {
    return <p>Loading applicant information...</p>;
  }

  return (
    <div>
      {/* <h3>Applicant Information</h3> */}
      <p>Name: {applicantInfo.name}</p>
      <p>About User: {applicantInfo.aboutuser}</p>
      <p>Past Projects: {applicantInfo.pastProjects}</p>
      <p>Role: {applicantInfo.role}</p>
      <p>Skills: {applicantInfo.skills}</p>
      <p>Social Media: {applicantInfo.socialMedia}</p>
    </div>
  );
};

export default ApplicantInfo;
