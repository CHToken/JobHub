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
      <div className="aboutuser-settings card">
        <div className="card-header d-flex">
          <i onClick={handleBackClick} className='fa fa-arrow-left back-arrow'></i>
          <h3>About</h3>
        </div>
        <textarea
          value={editedAboutUser}
          onChange={handleAboutUserChange}
          rows="4"
          cols="50"
          className="aboutuser-textarea"
        />
      </div>
      <div className='d-flex align-items-center justify-content-around'>
        <button onClick={handleBackClick} className="save-button btn" style={{width:"20%"}}>Back</button>
        <button onClick={handleSaveClick} className="btn btn-success" style={{width:"70%"}}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AboutUserSettings;
