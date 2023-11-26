import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCamera } from "@fortawesome/free-solid-svg-icons";

const ProfileSettings = ({
  userData,
  onSave,
  onBack,
  onProfilePictureChange: propOnProfilePictureChange,
}) => {
  const [ProfileSettingsData, setProfileSettingsData] = useState({
    name: userData.name,
    role: userData.role,
    username: userData.username,
  });

  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const handleSaveClick = () => {
    onSave(ProfileSettingsData);
    alert("Profile saved successfully!");
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleProfilePictureClick = () => {
    document.getElementById("profilePictureInput").click();
  };

  const onProfilePictureChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);

      if (propOnProfilePictureChange) {
        propOnProfilePictureChange(event);
      }
    }
  };

  useEffect(() => {
    setProfileSettingsData({
      name: userData.name,
      role: userData.role,
      username: userData.username,
    });
  }, [userData]);

  return (
    <div className="profilesettings card">
      <div className="card-header d-flex">
      <i
          onClick={handleBackClick}
          className="fa fa-arrow-left back-arrow"
        ></i>
        <h3>Profile Settings</h3>
      </div>
      <img
        src="https://placehold.co/600x400/000000/FFFFFF?text=Welcome&font=montserrat"
        className="cover-image"
        alt=""
      />
      <div className="profile-area" onClick={handleProfilePictureClick}>
        {profilePicturePreview ? (
          <div className="image-edit-container">
            <img
              src={profilePicturePreview}
              alt="Profile Preview"
              className="circle-profile-Image"
            />
            <div className="image-edit-overlay">
              <FontAwesomeIcon icon={faCamera} className="camera-icon" />
            </div>
          </div>
        ) : userData.profilePicture ? (
          <div className="image-edit-container">
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="circle-profile-Image"
            />
            <div className="image-edit-overlay">
              <FontAwesomeIcon icon={faCamera} className="camera-icon" />
            </div>
          </div>
        ) : (
          <div className="image-edit-container">
            <FontAwesomeIcon
              icon={faUser}
              className="circle-profile-Image"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
            <div className="image-edit-overlay">
              <FontAwesomeIcon icon={faCamera} className="camera-icon" />
            </div>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={onProfilePictureChange}
        style={{ display: "none" }}
        id="profilePictureInput"
      />
      <br />
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={ProfileSettingsData.name}
          onChange={(e) =>
            setProfileSettingsData({
              ...ProfileSettingsData,
              name: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          value={ProfileSettingsData.role}
          onChange={(e) =>
            setProfileSettingsData({
              ...ProfileSettingsData,
              role: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={ProfileSettingsData.username}
          onChange={(e) =>
            setProfileSettingsData({
              ...ProfileSettingsData,
              username: e.target.value,
            })
          }
        />
      </div>
      <br />
      <div className="d-flex align-items-center justify-content-around">
        <button
          onClick={handleSaveClick}
          className="btn btn-success"
          style={{ width: "70%" }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
