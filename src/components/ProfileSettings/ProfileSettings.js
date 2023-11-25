import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCamera } from '@fortawesome/free-solid-svg-icons';

const ProfileSettings = ({ userData, onSave, onBack, onProfilePictureChange }) => {
  const [ProfileSettingsData, setProfileSettingsData] = useState({
    name: userData.name,
    role: userData.role,
    username: userData.username,
  });

  const handleSaveClick = () => {
    onSave(ProfileSettingsData);
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleProfilePictureClick = () => {
    // Trigger the file input click when the profile picture is clicked
    document.getElementById('profilePictureInput').click();
  };

  useEffect(() => {
    // Update state when userData changes
    setProfileSettingsData({
      name: userData.name,
      role: userData.role,
      username: userData.username,
    });
  }, [userData]);

  return (
    <div className="profilesettings card">
      <div className="card-header d-flex">
        <i onClick={handleBackClick} className='fa fa-arrow-left back-arrow'></i>
        <h3>Profile Settings</h3>
      </div>
      <img src="https://placehold.co/600x400/000000/FFFFFF?text=Welcome&font=montserrat" className="cover-image" alt=''/>
      <div className="profile-area" onClick={handleProfilePictureClick}>
        {userData.profilePicture ? (
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
        style={{ display: 'none' }}
        id="profilePictureInput"
      />
      <br />
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={ProfileSettingsData.name}
          onChange={(e) => setProfileSettingsData({ ...ProfileSettingsData, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          value={ProfileSettingsData.role}
          onChange={(e) => setProfileSettingsData({ ...ProfileSettingsData, role: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={ProfileSettingsData.username}
          onChange={(e) => setProfileSettingsData({ ...ProfileSettingsData, username: e.target.value })}
        />
      </div>
      <br />
      <div className='d-flex align-items-center justify-content-around'>
        <button onClick={handleBackClick} className="save-button btn" style={{width:"20%"}}>Back</button>
        <button onClick={handleSaveClick} className="btn btn-success" style={{width:"70%"}}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
