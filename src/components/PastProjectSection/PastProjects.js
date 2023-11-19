import React, { useState } from 'react';

const PastProjects = ({ userData, onSave }) => {
  const [pastProjectsData, setPastProjectsData] = useState([...userData.pastProjects]);

  const handleSaveClick = () => {
    onSave(pastProjectsData);
  };

  const handleAddProject = () => {
    setPastProjectsData([...pastProjectsData, { title: '', description: '', link: '' }]);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = pastProjectsData.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setPastProjectsData(updatedProjects);
  };

  return (
    <div className="past-projects">
      <h3>Past Projects</h3>
      {Array.isArray(pastProjectsData) && pastProjectsData.length > 0 ? (
        pastProjectsData.map((project, index) => (
          <div key={index}>
            <label>Title:</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
            />
            <label>Description:</label>
            <input
              type="text"
              value={project.description}
              onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
            />
            <label>Link:</label>
            <input
              type="text"
              value={project.link}
              onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
            />
          </div>
        ))
      ) : (
        <p>No past projects available.</p>
      )}
      <button onClick={handleAddProject}>Add Project</button>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default PastProjects;
