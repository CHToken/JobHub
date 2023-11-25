import React, { useState } from "react";
import "./pastproject.css";

const PastProjects = ({ userData, onSave, onBack }) => {
  const [pastProjectsData, setPastProjectsData] = useState([
    ...userData.pastProjects,
  ]);

  const handleSaveClick = () => {
    onSave(pastProjectsData);
  };

  const handleAddProject = () => {
    setPastProjectsData([
      ...pastProjectsData,
      { title: "", description: "", link: "" },
    ]);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = pastProjectsData.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setPastProjectsData(updatedProjects);
  };

  return (
    <div className="past-projects card">
      <div className="card-header d-flex">
        <h3>Past Projects</h3>
      </div>
      <br />
      <div className="row">
        {Array.isArray(pastProjectsData) && pastProjectsData.length > 0 ? (
          pastProjectsData.map((project, index) => (
            <div className="col-md-6 card m-2" key={index}>
              <label>Title:</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) =>
                  handleProjectChange(index, "title", e.target.value)
                }
              />
              <label>Description:</label>
              <input
                type="text"
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(index, "description", e.target.value)
                }
              />
              <label>Link:</label>
              <input
                type="text"
                value={project.link}
                onChange={(e) =>
                  handleProjectChange(index, "link", e.target.value)
                }
              />
            </div>
          ))
        ) : (
          <p>No past projects available.</p>
        )}
      </div>
      <br />
      <div className="d-flex align-items-center justify-content-around">
        <button
          onClick={handleSaveClick}
          className="btn"
          style={{ width: "20%" }}
        >
          Save
        </button>
        <button
          onClick={handleAddProject}
          className="btn btn-success"
          style={{ width: "70%" }}
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default PastProjects;
