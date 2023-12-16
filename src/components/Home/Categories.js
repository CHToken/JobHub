import React from 'react';
// import { Link } from 'react-router-dom';

const HomeCategories = () => {
  return (
    <div className="mt-10">
    <div className="row">
        <div className="col-6">
        <h1><span className="underlined">Explore Jobs</span> By Categories</h1>
        <p className="opacity-75">Yeah categories are here!! :)</p>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center">
        <button className="btn btn-outline">All Categories</button>
        </div>
    </div>
    <div className="row mt-3 job-category">
        <div className="col-md-4">
        <div className="card category-box">
            <div className="row">
            <div className="col-6 d-flex align-items-center justify-content-center">
                <i className="fa fa-edit" style={{background:"#E9F8FF", color: "#3AA6FF"}}></i>
            </div>
            <div className="col-6 d-flex flex-column align-items-start justify-content-center pr-4">
                <h2>Design</h2>
                <p className="opacity-75">150+ Jobs Available</p>
            </div>
            </div>
        </div>
        </div>
        <div className="col-md-4">
        <div className="card category-box">
            <div className="row">
            <div className="col-6 d-flex align-items-center justify-content-center">
                <i className="fa fa-laptop-code" style={{background:"#453FE0", color: "#FFF"}}></i>
            </div>
            <div className="col-6 d-flex flex-column align-items-start justify-content-center pr-4">
                <h2>Dapp</h2>
                <p className="opacity-75">150+ Jobs Available</p>
            </div>
            </div>
        </div>
        </div>
        <div className="col-md-4">
        <div className="card category-box">
            <div className="row">
            <div className="col-6 d-flex align-items-center justify-content-center">
                <i className="fa fa-robot" style={{background:"#FBEEFC", color: "#D343E0"}}></i>
            </div>
            <div className="col-6 d-flex flex-column align-items-start justify-content-center pr-4">
                <h2>TG Bot</h2>
                <p className="opacity-75">150+ Jobs Available</p>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default HomeCategories;
