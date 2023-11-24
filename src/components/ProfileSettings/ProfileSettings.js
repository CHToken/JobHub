import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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

  useEffect(() => {
    // Update state when userData changes
    setProfileSettingsData({
      name: userData.name,
      role: userData.role,
      username: userData.username,
    });
  }, [userData]);

  return (
    <div className="profilesettings">
      <h3>Profile Settings</h3>
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
          <FontAwesomeIcon
    icon={faUser}
    style={{
      width: "100px",
      height: "100px",
      borderRadius: "50%",
    }}
  />
        )}
      <div>
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
          type="file"
          accept="image/*"
          onChange={onProfilePictureChange}
        />
      </div>
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
      <button onClick={handleSaveClick}>Save</button>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default ProfileSettings;
