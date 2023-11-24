import React, { useState } from 'react';
import "./skills.css";

const SkillsSettings = ({ skills, onSave, onBack }) => {
  const [editedSkills, setEditedSkills] = useState(skills.join(', '));

  const handleSaveClick = () => {
    const newSkills = editedSkills.split(',').map(skill => skill.trim());
    onSave(newSkills);
  };

  const handleBackClick = () => {
    onBack();
  };

  return (
    <div className="skills-settings">
      <h3>Edit Skills</h3>
      <div>
        <label htmlFor="editedSkills">Skills:</label>
        <input
          type="text"
          id="editedSkills"
          value={editedSkills}
          onChange={(e) => setEditedSkills(e.target.value)}
        />
      </div>
      <button onClick={handleSaveClick}>Save</button>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default SkillsSettings;
