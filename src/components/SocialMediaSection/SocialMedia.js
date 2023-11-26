import React, { useState } from "react";
import "./socialmedia.css";

const SocialMediaInput = ({ icon, label, value, onChange }) => (
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text" id="basic-addon1">
        <i className={`fab ${icon}`}></i>
      </span>
    </div>
    <input
      type="text"
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const SocialMedia = ({ userData, onSave, onBack }) => {
  const [socialMediaData, setSocialMediaData] = useState({
    ...userData.socialMedia,
  });

  const handleSaveClick = () => {
    onSave(socialMediaData);
    alert("Social Media saved successfully!");
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleSocialMediaChange = (field, value) => {
    setSocialMediaData({ ...socialMediaData, [field]: value });
  };

  const socialMediaFields = [
    { field: "github", icon: "fa-github", label: "GitHub" },
    { field: "telegram", icon: "fa-telegram", label: "Telegram" },
    { field: "twitter", icon: "", label: "X" },
    // Add more social media platforms as needed
  ];

  return (
    <div className="social-media card">
      <div className="card-header d-flex">
        <i onClick={handleBackClick} className="fa fa-arrow-left back-arrow"></i>
        <h3>Social Media</h3>
      </div>
      <br />

      {socialMediaFields.map(({ field, icon, label }) => (
        <div key={field}>
          <label>{label}:</label>
          <SocialMediaInput
            icon={icon}
            label={label}
            value={socialMediaData[field]}
            onChange={(value) => handleSocialMediaChange(field, value)}
          />
        </div>
      ))}

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

export default SocialMedia;
