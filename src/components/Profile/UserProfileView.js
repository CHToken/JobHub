import React from "react";
import AboutUserSettings from "../AboutSection/aboutsettings";
import SkillsSettings from "../SkillsSection/skillssettings";

const UserProfileView = ({
  userData,
  isEditing,
  editMode,
  handleEditClick,
  handleAboutUserSave,
  handleSkillsSettingsSave,
  handleProfilePictureChange,
}) => (
  <>
    {/* Profile Picture Section */}
    <div className="card-container">
                <div className="card">
                  {userData.profilePicture ? (
                    <img
                      src={userData.profilePicture}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <p>No picture</p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />

                  {/* Personal Details Section */}
                  <button
                      className="edit-button"
                      onClick={() => handleEditClick("profilesettings")}
                    >
                      Edit
                    </button>
                  <p>{userData.name}</p>
                  <p>{userData.username}</p>
                  <p>{userData.gender}</p>
                  <p>{userData.profession}</p>
                  <p>{userData.status}</p>
                </div>
              </div>

    {/* About Details Section */}
    <div className="card-container">
                <div className="card">
                  <button className="edit-button" onClick={() => handleEditClick("aboutsettings")}>
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
                  <button className="edit-button" onClick={() => handleEditClick("skillssettings")}>
                    Edit
                  </button>
                  <h3>Skills</h3>
                  {isEditing && editMode === "skillssettings" ? (
                    <SkillsSettings
                      skills={userData.skills}
                      onSave={handleSkillsSettingsSave}
                    />
                  ) : (
                    <p>{userData.skills}</p>
                  )}
                </div>
              </div>

              {/* Past Projects Section */}
              <div className="card-container">
                <div className="card">
                  <button className="edit-button" onClick={() => handleEditClick("pastProjects")}>
                    Edit
                  </button>
                  <h3>Projects</h3>
                  {Array.isArray(userData.pastProjects) &&
                  userData.pastProjects.length > 0 ? (
                    userData.pastProjects.map((project, index) => (
                      <div key={index}>
                        <p>
                          <strong>Title: </strong> {project.title}
                        </p>
                        <p>
                          <strong>Description: </strong> {project.description}
                        </p>
                        <p>
                          <strong>Link: </strong>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {project.link}
                          </a>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No past projects available.</p>
                  )}
                </div>
              </div>
{/* Social Media Section */}
<div className="card-container">
                <div className="card">
                  <button className="edit-button" onClick={() => handleEditClick("socialMedia")}>
                    Edit
                  </button>
                  <h3>Socials</h3>
                  {userData.socialMedia && (
                    <>
                      <p>
                        <strong>GitHub: </strong>{" "}
                        <a
                          href={userData.socialMedia.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {userData.socialMedia.github}
                        </a>
                      </p>
                      <p>
                        <strong>Telegram: </strong>{" "}
                        <a
                          href={userData.socialMedia.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {userData.socialMedia.telegram}
                        </a>
                      </p>
                      <p>
                        <strong>X: </strong>{" "}
                        <a
                          href={userData.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {userData.socialMedia.twitter}
                        </a>
                      </p>
                    </>
                  )}
                </div>
              </div>

               {/* Wallet Details Section */}
               <div className="card-container">
                <div className="card">
                  <button className="edit-button" onClick={() => handleEditClick("wallet")}>
                    Edit
                  </button>
                  <h3>Wallets</h3>
                  <div>
                    <strong id="bnbwallet">BNB Wallet: </strong>{" "}
                    {userData.bnbwalletAddress}
                  </div>
                  <div>
                    <strong>USDT Wallet: </strong> {userData.usdtwalletAddress}
                  </div>
                  <div>
                    <strong>ETH Wallet: </strong> {userData.ethwalletAddress}
                  </div>
                </div>
              </div>
  </>
);

export default UserProfileView;
