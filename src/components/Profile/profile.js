import React, { useState } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    bnbwalletAddress: '0x1234...5678', // Placeholder, replace with actual wallet address
    ethwalletAddress: '0x1234...5678', // Placeholder, replace with actual wallet address
    usdtwalletAddress: '0x1234...5678', // Placeholder, replace with actual wallet address
    name: 'John Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    skills: ['JavaScript', 'React', 'Node.js'],
    experience: [
      {
        position: 'Software Developer Intern',
        company: 'Tech Company ABC',
        startDate: '2019-06-01',
        endDate: '2019-12-31',
      },
    ],
    pastProjects: [
      {
        title: 'E-commerce Website',
        description: 'Developed a fully functional e-commerce website using React and Node.js.',
        link: 'https://www.example.com',
      },
      // Add more past project entries as needed
    ],
    socialMedia: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://www.linkedin.com/in/johndoe',
      twitter: 'https://www.linkedin.com/in/johndoe',
      whatsapp: 'https://www.linkedin.com/in/johndoe',
      telegram: 'https://www.linkedin.com/in/johndoe',
      // Add more social media links as needed
    },
    jobApplications: [
      {
        jobId: '1',
        jobTitle: 'Software Developer',
        status: 'Pending',
        // Add more details about each job application as needed
      },
      {
        jobId: '2',
        jobTitle: 'UX Designer',
        status: 'Accepted',
        // Add more details about each job application as needed
      },
      {
        jobId: '3',
        jobTitle: 'Data Analyst',
        status: 'Rejected',
        // Add more details about each job application as needed
      },
      // Add more job application entries as needed
    ],
    // Add other user-related data as needed
  });

  return (
    <div className="page-container">
      <h2>User Profile</h2>
      <div>
        <strong>BNB Wallet: </strong> {userData.bnbwalletAddress}
      </div>
      <div>
        <strong>USDT Wallet: </strong> {userData.usdtwalletAddress}
      </div>
      <div>
        <strong>ETH Wallet: </strong> {userData.ethwalletAddress}
      </div>
      <div>
        <h3>Personal Details</h3>
        <p>
          <strong>Name: </strong> {userData.name}
        </p>
        <p>
          <strong>Email: </strong> {userData.email}
        </p>
        <p>
          <strong>Gender: </strong> {userData.gender}
        </p>
        <p>
          <strong>Skills: </strong> {userData.skills.join(', ')}
        </p>
      </div>
      <div>
        <h3>Experience</h3>
        {userData.experience.map((exp, index) => (
          <div key={index}>
            <p>
              <strong>Position: </strong> {exp.position}
            </p>
            <p>
              <strong>Company / Project: </strong> {exp.company}
            </p>
            <p>
              <strong>Duration: </strong> {exp.startDate} to {exp.endDate}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h3>Past Projects</h3>
        {userData.pastProjects.map((project, index) => (
          <div key={index}>
            <p>
              <strong>Title: </strong> {project.title}
            </p>
            <p>
              <strong>Description: </strong> {project.description}
            </p>
            <p>
              <strong>Link: </strong> {project.link}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h3>Social Media</h3>
        <p>
          <strong>GitHub: </strong> <a href={userData.socialMedia.github} target="_blank" rel="noopener noreferrer">{userData.socialMedia.github}</a>
        </p>
        <p>
          <strong>LinkedIn: </strong> <a href={userData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">{userData.socialMedia.linkedin}</a>
        </p>
        <p>
          <strong>Telegram: </strong> <a href={userData.socialMedia.telegram} target="_blank" rel="noopener noreferrer">{userData.socialMedia.telegram}</a>
        </p><p>
          <strong>Whatsapp: </strong> <a href={userData.socialMedia.whatsapp} target="_blank" rel="noopener noreferrer">{userData.socialMedia.whatsapp}</a>
        </p>
        <p>
          <strong>X: </strong> <a href={userData.socialMedia.twitter} target="_blank" rel="noopener noreferrer">{userData.socialMedia.twitter}</a>
        </p>
      </div>
      <div>
        <h3>Job Applications</h3>
        {userData.jobApplications.map((application) => (
          <div key={application.jobId}>
            <p>
              <strong>Job Title: </strong> {application.jobTitle}
            </p>
            <p>
              <strong>Status: </strong> {application.status}
            </p>
            {/* Add more details about each job application as needed */}
          </div>
        ))}
      </div>
      {/* Add other sections and components for additional user information */}
    </div>
  );
};

export default UserProfile;
