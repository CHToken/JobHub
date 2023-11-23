import React, { useState } from 'react';
import './aboutsettings.css';

const AboutUserSettings = ({ aboutuser, onSave, onBack }) => {
  const [editedAboutUser, setEditedAboutUser] = useState(aboutuser);

  const handleSaveClick = () => {
    onSave(editedAboutUser);
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleAboutUserChange = (event) => {
    setEditedAboutUser(event.target.value);
  };

  return (
    <div className='aboutsettings-container'>
      <div className="aboutuser-settings">
        <h3>About</h3>
        <textarea
          value={editedAboutUser}
          onChange={handleAboutUserChange}
          rows="4"
          cols="50"
          className="aboutuser-textarea"
        />
        <button onClick={handleSaveClick} className="save-button">
          Save
        </button>
        <button onClick={handleBackClick}>Back</button>
      </div>
      </div>
  );
};

export default AboutUserSettings;
