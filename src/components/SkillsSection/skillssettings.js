import React, { useState } from "react";
import { Input, Button, Alert } from "antd";
import "./skills.css";

const SkillsSettings = ({ skills, onSave, onBack }) => {
  const [editedSkills, setEditedSkills] = useState(skills.join(", "));
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  const handleSaveClick = async () => {
    try {
      setIsLoading(true);
      const newSkills = editedSkills.split(",").map((skill) => skill.trim());
      await onSave(newSkills);
      setAlertInfo({ type: "success", message: "Skills saved successfully!" });
    } catch (error) {
      console.error("Error saving skills:", error);
      setAlertInfo({ type: "error", message: "Error saving skills. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    onBack();
  };

  return (
    <div className="skills-settings">
      <div className="card-header d-flex">
        <i onClick={handleBackClick} className="fa fa-arrow-left back-arrow"></i>
        <h3>Edit Skills</h3>
      </div>
      <br />
      <div>
        <label htmlFor="editedSkills">Skills:</label>
        <Input
          id="editedSkills"
          value={editedSkills}
          onChange={(e) => setEditedSkills(e.target.value)}
        />
      </div>
      <br />
      <div className="d-flex align-items-center justify-content-around">
        <Button
          onClick={handleSaveClick}
          type="primary"
          style={{ width: "70%" }}
          loading={isLoading}
        >
          Save
        </Button>
      </div>
      {/* Ant Design Alert */}
      {alertInfo && (
        <Alert
          message={alertInfo.message}
          type={alertInfo.type}
          showIcon
          closable
          onClose={() => setAlertInfo(null)}
          className="custom-alert"
        />
      )}
    </div>
  );
};

export default SkillsSettings;
