import React from "react";
import { Link } from "react-router-dom";
import "./textSection.css";

const TextSection = () => {
  return (
    <div className="text-container">
      <div className="text-section row">
        <div className="left-section col-md-6">
          <h2>Connecting Talents to Opportunities</h2>
        </div>
        <hr className="separator" />
        <div className="col-md-6">
          <p>
            JobHub has made it easy for everyone on the blockchain to get job
            easily with our latest Dapp that includes AI features for job
            recommendation and security.
          </p>
          <div className="buttons-section">
            <Link to="/get-started" className="get-started-button">
              Get Started
            </Link>
            <Link to="/how-it-works" className="how-it-works-button">
              How It Works?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSection;
