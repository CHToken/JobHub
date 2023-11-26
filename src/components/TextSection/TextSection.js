import React from "react";
import { Link } from "react-router-dom";
import "./textSection.css";

const TextSection = () => {
  return (
    <div className="text-container">
      <div className="text-section row">
        <div className="left-section col-md-6">
          <h2>Unlock Your Future with JobHub!</h2>
        </div>
        <hr className="separator" />
        <div className="col-md-6">
          <p>
            Elevate your career with JobHub's cutting-edge Dapp, where talent meets opportunity. Experience AI-driven job recommendations and top-notch security for a seamless job-searching journey.
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
