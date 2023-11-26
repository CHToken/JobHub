import React from "react";

const Card = ({ title, children, isEditing, onEditClick, coverImage, profilePicture, name, username, role, status }) => (
  <div className="card-container">
    <div className="card">
      {title && (
        <>
          <button className="edit-button btn" onClick={onEditClick}>
            Edit
          </button>
          <h1>{name}</h1>
          <p>{role}</p>
          <p>{status}</p>
          <h3>{title}</h3>
        </>
      )}
      {children}
    </div>
  </div>
);

export default Card;