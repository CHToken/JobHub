import React from "react";
import AboutUserSettings from "../AboutSection/aboutsettings";
import SkillsSettings from "../SkillsSection/skillssettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import EditButton from "./EditButton";

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
    <Card>
      <div className="cover-image-container">
        <img
          src="https://placehold.co/600x400/000000/FFFFFF?text=Welcome&font=montserrat"
          className="cover-image"
          alt=""
          loading="lazy"
        />
      </div>
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
      {/* Include other profile information */}
      <EditButton onClick={() => handleEditClick("profilesettings")} />
      <h1>{userData.name}</h1>
      <small>@{userData.username}</small>
      <p>{userData.role}</p>
      <p>{userData.status}</p>
    </Card>

    <Card
      title="About"
      isEditing={isEditing && editMode === "aboutsettings"}
      onEditClick={() => handleEditClick("aboutsettings")}
    >
      {isEditing && editMode === "aboutsettings" ? (
        <AboutUserSettings
          aboutuser={userData.aboutuser}
          onSave={handleAboutUserSave}
        />
      ) : (
        <p>{userData.aboutuser}</p>
      )}
    </Card>

    <Card
      title="Skills"
      isEditing={isEditing && editMode === "skillssettings"}
      onEditClick={() => handleEditClick("skillssettings")}
    >
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
    </Card>

    <Card
      title="Projects"
      isEditing={isEditing && editMode === "pastProjects"}
      onEditClick={() => handleEditClick("pastProjects")}
    >
      <div className="row p-2 projects">
        {Array.isArray(userData.pastProjects) &&
        userData.pastProjects.length > 0 ? (
          userData.pastProjects.map((project, index) => (
            <div className="col-md-6 card m-2" key={index}>
              <p className="card-title">{project.title}</p>
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
    </Card>

    <Card
      title="Socials"
      isEditing={isEditing && editMode === "socialMedia"}
      onEditClick={() => handleEditClick("socialMedia")}
    >
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
    </Card>

    <Card
      title="Wallets"
      isEditing={isEditing && editMode === "wallet"}
      onEditClick={() => handleEditClick("wallet")}
    >
      <div className="row wallet-row">
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
    </Card>
  </>
);

export default UserProfileView;