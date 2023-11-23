import React, { useState } from 'react';

const SocialMedia = ({ userData, onSave }) => {
  const [socialMediaData, setSocialMediaData] = useState({ ...userData.socialMedia });

  const handleSaveClick = () => {
    onSave(socialMediaData);
  };

  const handleSocialMediaChange = (field, value) => {
    setSocialMediaData({ ...socialMediaData, [field]: value });
  };

  return (
    <div className="social-media">
      <h3>Social Media</h3>
      <label>GitHub:</label>
      <input
        type="text"
        value={socialMediaData.github}
        onChange={(e) => handleSocialMediaChange('github', e.target.value)}
      />
      <label>Telegram:</label>
      <input
        type="text"
        value={socialMediaData.telegram}
        onChange={(e) => handleSocialMediaChange('telegram', e.target.value)}
      />
      <label>Twitter:</label>
      <input
        type="text"
        value={socialMediaData.twitter}
        onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
      />
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default SocialMedia;
