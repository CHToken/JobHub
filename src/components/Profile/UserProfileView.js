import React from "react";
import AboutUserSettings from "../AboutSection/aboutsettings";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SkillsSettings from "../SkillsSection/skillssettings";
import AppliedJobsList from "../Jobs/AppliedJobsList"; 

const UserProfileView = ({
  userData,
  isConnected,
  isEditing,
  editMode,
  handleEditClick,
  handleAboutUserSave,
  handleSkillsSettingsSave,
}) => (
  <>
    {/* Profile Picture Section */}
    <div className="card-container">
      <div className="card">
        <img src="https://placehold.co/600x400/000000/FFFFFF?text=Welcome&font=montserrat" className="cover-image" alt=""/>
        <div className="profile-area">
        {userData.profilePicture ? (
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="circle-profile-Image"
            />
          ) : (
            <FontAwesomeIcon
            icon={faUser}
            className="circle-profile-Image"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
        )}
        </div>

        {/* Personal Details Section */}
        <button
          className="edit-button btn"
          onClick={() => handleEditClick("profilesettings")}
        >
          Edit
        </button>
        <h1>{userData.name}</h1>
        <small>@{userData.username}</small>
        <p>{userData.role}</p>
        <p>{userData.status}</p>
      </div>
    </div>

    {/* About Details Section */}
    <div className="card-container">
      <div className="card">
        <button
          className="edit-button btn"
          onClick={() => handleEditClick("aboutsettings")}
        >
          Edit
        </button>
        <h3>About</h3>
        {isEditing && editMode === "aboutsettings" ? (
          <AboutUserSettings
            aboutuser={userData.aboutuser}
            onSave={handleAboutUserSave}
          />
        ) : (
          <p>{userData.aboutuser}</p>
        )}
      </div>
    </div>

    {/* Skills Section */}
    <div className="card-container">
      <div className="card">
        <button
          className="edit-button btn"
          onClick={() => handleEditClick("skillssettings")}
        >
          Edit
        </button>
        <h3>Skills</h3>
        {isEditing && editMode === "skillssettings" ? (
          <SkillsSettings
            skills={userData.skills}
            onSave={handleSkillsSettingsSave}
          />
        ) : (
          <div className="skills-list">
            {userData.skills.map((skill, index) => (
              <p key={index} className="skill-item">
                {skill}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Past Projects Section */}
    <div className="card-container">
      <div className="card">
        <button
          className="edit-button btn"
          onClick={() => handleEditClick("pastProjects")}
        >
          Edit
        </button>
        <h3>Projects</h3>
        <div className="row p-2">
          {Array.isArray(userData.pastProjects) &&
          userData.pastProjects.length > 0 ? (
            userData.pastProjects.map((project, index) => (
              <div className="col-md-6 card m-2" key={index}>
                <p>
                  <h1 className="card-title">{project.title}</h1>
                </p>
                <p>
                  <strong>Description: </strong> {project.description}
                </p>
                <p>
                  <a
                    href={project.link}
                    className="btn btn-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Project
                  </a>
                </p>
              </div>
            ))
          ) : (
            <p>No past projects available.</p>
          )}
        </div>
      </div>
    </div>
    {/* Social Media Section */}
    <div className="card-container">
      <div className="card">
        <button
          className="edit-button btn"
          onClick={() => handleEditClick("socialMedia")}
        >
          Edit
        </button>
        <h3>Socials</h3>
        <br />
        {userData.socialMedia && (
          <div className="d-flex justify-content-around">
            <a
              href={userData.socialMedia.github}
              className="github-color"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github social-icons"></i>
            </a>
            
            <a
              href={userData.socialMedia.telegram}
              className="telegram-color"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-telegram social-icons"></i>
            </a>
            
            <a
              href={userData.socialMedia.twitter}
              className="twitter-color"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter social-icons"></i>
            </a>
          </div>
        )}
      </div>
    </div>

    {/* Wallet Details Section */}
    <div className="card-container">
      <div className="card">
        <button
          className="edit-button btn"
          onClick={() => handleEditClick("wallet")}
        >
          Edit
        </button>
        <h3>Wallets</h3>
        <div className="row">
          <div className="col-md-4 card m-2">
            <strong id="bnbwallet">BNB Wallet: </strong>{" "}
            <p className="eclipse">{userData.bnbwalletAddress}</p>
          </div>
          <div className="col-md-4 card m-2">
            <strong>USDT Wallet: </strong>
            <p className="eclipse">{userData.usdtwalletAddress}</p>
          </div>
          <div className="col-md-4 card m-2">
            <strong>ETH Wallet: </strong>
            <p className="eclipse">{userData.ethwalletAddress}</p>
          </div>
        </div>
      </div>
    </div>
{/* Applied Jobs Section */}
<div className="card-container">
      <div className="card">
        {/* Pass the connected wallet address directly */}
        <AppliedJobsList walletAddress={isConnected ? window.ethereum.selectedAddress.toLowerCase() : null} />
      </div>
    </div>
  </>
);

export default UserProfileView;