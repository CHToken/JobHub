import React, { useState } from "react";
import "./skills.css";

const SkillsSettings = ({ skills, onSave, onBack }) => {
  const [editedSkills, setEditedSkills] = useState(skills.join(", "));

  const handleSaveClick = () => {
    const newSkills = editedSkills.split(",").map((skill) => skill.trim());
    onSave(newSkills);
    alert("Skills saved successfully!");
  };

  const handleBackClick = () => {
    onBack();
  };

  return (
    <div className="skills-settings">
      <div className="card-header d-flex">
      <i
          onClick={handleBackClick}
          className="fa fa-arrow-left back-arrow"
        ></i>
        <h3>Edit Skills</h3>
      </div>
      <br />
      <div>
        <label htmlFor="editedSkills">Skills:</label>
        <input
          type="text"
          id="editedSkills"
          value={editedSkills}
          onChange={(e) => setEditedSkills(e.target.value)}
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

export default SkillsSettings;
