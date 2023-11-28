import React from "react";
import TextSection from "../TextSection/TextSection";
import HomeCategories from "./Categories";
import HomeJobs from "./Jobs";
import Subscribe from "./Subscribe";
import HeroSection from "../HeroSection/HeroSection";

const Homepage = () => {
  return (
    <div>
      <div className="head-1">
        <h1>
          Discover Opportunities<br /> <span className="navyblue">With 250+ Jobs</span>
        </h1>
        <p>Ignite your career journey! Discover engaging roles that match your passion and skills.</p>
        <div className="searchContainer">
          <div className="searchBox">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search" />
            <a href="/" className="get-started-button">Find Jobs</a>
          </div>
        </div>
      </div>

      <div className="app-container">
        <div className="d-flex align-items-center justify-content-center mb-5 counter">
          <div className="counter-section">
            <div className="row">
              <div className="col-md-4">
                <div className="row">
                  <div className="col-6 icon-container">
                    <i className="fas fa-briefcase" style={{ color: "#2FA1FF" }}></i>
                  </div>
                  <div className="col-6">
                    <h1 className="navyblue">150+</h1>
                    <h4 className="opacity-75">Jobs</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-6 icon-container">
                    <i className="fab fa-trello" style={{ color: "#FF8B3D" }}></i>
                  </div>
                  <div className="col-6">
                    <h1 className="navyblue">50+</h1>
                    <h4 className="opacity-75">Startups</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-6 icon-container">
                    <i className="fas fa-users" style={{ color: "#D343E0" }}></i>
                  </div>
                  <div className="col-6">
                    <h1 className="navyblue">250+</h1>
                    <h4 className="opacity-75">Talent</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TextSection />
        <HomeCategories />
      </div>

      <HomeJobs />
      <HeroSection />
      <Subscribe />
    </div>
  );
};

export default Homepage;
