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
          Discover more than <br /> <span className="navyblue">250+ jobs</span>
        </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        <div className="searchContainer">
          <div className="searchBox">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="search" />
            <a className="get-started-button">Search</a>
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
                      <i className="fas fa-briefcase" style={{color: "#2FA1FF"}}></i>
                    </div>
                    <div className="col-6">
                      <h1 className="navyblue">150+</h1>
                      <h4 className="opacity-75">JOBS</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-6 icon-container">
                      <i className="fab fa-trello" style={{color: "#FF8B3D"}}></i>
                    </div>
                    <div className="col-6">
                      <h1 className="navyblue">50+</h1>
                      <h4 className="opacity-75">STARTUPS</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-6 icon-container">
                      <i className="fas fa-users" style={{color: "#D343E0"}}></i>
                    </div>
                    <div className="col-6">
                      <h1 className="navyblue">250+</h1>
                      <h4 className="opacity-75">TALENT</h4>
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
