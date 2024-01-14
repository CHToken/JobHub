import React from "react";
import { Link } from "react-router-dom";
import "./textSection.css";

const TextSection = () => {
  return (
    <div className="text-container">
      <div className="text-section row">
        <div className="left-section col-md-6">
          <h2>Unlock Your Future with Work AI!</h2>
        </div>
        <hr className="separator" />
        <div className="col-md-6">
          <p>
            Elevate your career with WorkAI cutting-edge Dapp, where talent meets opportunity. Experience AI-driven job recommendations and top-notch security for a seamless job-searching journey.
          </p>
          <div className="buttons-section">
            <Link to="#" className="get-started-button">
              BUY
            </Link>
            <Link to="#" className="how-it-works-button">
              CHART
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSection;
