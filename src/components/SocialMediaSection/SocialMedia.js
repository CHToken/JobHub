import React, { useState } from "react";
import "./socialmedia.css";

const SocialMedia = ({ userData, onSave, onBack }) => {
  const [socialMediaData, setSocialMediaData] = useState({
    ...userData.socialMedia,
  });

  const handleSaveClick = () => {
    onSave(socialMediaData);
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleSocialMediaChange = (field, value) => {
    setSocialMediaData({ ...socialMediaData, [field]: value });
  };

  return (
    <div className="social-media card">
      <div className="card-header d-flex">
        <i
          onClick={handleBackClick}
          className="fa fa-arrow-left back-arrow"
        ></i>
        <h3>Social Media</h3>
      </div>
      <br />
      <label>GitHub:</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <i className="fab fa-github"></i>
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          value={socialMediaData.github}
          onChange={(e) => handleSocialMediaChange("github", e.target.value)}
        />
      </div>

      <label>Telegram:</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <i className="fab fa-telegram"></i>
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          value={socialMediaData.telegram}
          onChange={(e) => handleSocialMediaChange("telegram", e.target.value)}
        />
      </div>

      <label>X:</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            𝕏
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          value={socialMediaData.twitter}
          onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
        />
      </div>

      <div className="d-flex align-items-center justify-content-around">
        <button
          onClick={handleBackClick}
          className="save-button btn"
          style={{ width: "20%" }}
        >
          Back
        </button>
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
