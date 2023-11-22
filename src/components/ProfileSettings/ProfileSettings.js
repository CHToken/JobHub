import React, { useState, useEffect } from 'react';

const ProfileSettings = ({ userData, onSave }) => {
  const [ProfileSettingsData, setProfileSettingsData] = useState({
    name: userData.name,
    username: userData.username,
    gender: userData.gender,
    aboutuser: userData.aboutuser,
    skills: userData.skills,
  });


  const handleSaveClick = () => {
    onSave(ProfileSettingsData);
  };

  useEffect(() => {
    // Update state when userData changes
    setProfileSettingsData({
      name: userData.name,
      username: userData.username,
      gender: userData.gender,
      aboutuser: userData.aboutuser,
      skills: userData.skills,
    });
  }, [userData]);

  return (
    <div className="profilesettings">
      <h3>Profile Settings</h3>
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
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={ProfileSettingsData.username}
          onChange={(e) => setProfileSettingsData({ ...ProfileSettingsData, username: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <input
          type="text"
          id="gender"
          value={ProfileSettingsData.gender}
          onChange={(e) => setProfileSettingsData({ ...ProfileSettingsData, gender: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="aboutuser">About:</label>
        <input
          type="text"
          id="aboutuser"
          value={ProfileSettingsData.aboutuser}
          onChange={(e) => setProfileSettingsData({ ...ProfileSettingsData, aboutuser: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="skills">Skills:</label>
        <input
          type="text"
          id="skills"
          value={ProfileSettingsData.skills}
          onChange={(e) => setProfileSettingsData({ ...ProfileSettingsData, skills: e.target.value })}
        />
      </div>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default ProfileSettings;
