import React from 'react';
import { Link } from 'react-router-dom';

const HomeJobs = () => {
  return (
    <div className="mt-10 bg-second">
        <div className="row">
        <div className="col-6">
            <h1><span className="underlined">Popular Jobs</span> for you</h1>
            <p>Yeah categories are here!! :)</p>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center">
            <button className="btn btn-outline bg-white">See All Jobs</button>
        </div>
        </div>
        <div className="row mt-5">
        <div className="col-md-4">
            <div className="card">
            <div className="row">
                <div className="col-6">
                <img src="https://source.unsplash.com/512x512/?beauty,woman" className="mb-4 rounded-circle" width={"80%"} />
                </div>
                <div className="col-6 d-flex flex-column align-items-start justify-content-center">
                <h3>John Doe</h3>
                <p>Remote Job</p>
                <small className="opacity-75">$1k/month</small>
                </div>
            </div>
            <h3>This Job</h3>
            <small className="opacity-75">This time • 2 Days Ago</small>
            <br />
            <div>
                <p className="opacity-75">We are looking for a well skilled developer, who can do loads of stuffs quickly and ASAP</p>
                <button className="btn btn-secondary">Apply Now</button>
            </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card">
            <div className="row">
                <div className="col-6">
                <img src="https://source.unsplash.com/512x512/?beauty,man" className="mb-4 rounded-circle" width={"80%"} />
                </div>
                <div className="col-6 d-flex flex-column align-items-start justify-content-center">
                <h3>John Doe</h3>
                <p>Remote Job</p>
                <small className="opacity-75">$1k/month</small>
                </div>
            </div>
            <h3>This Job</h3>
            <small className="opacity-75">This time • 2 Days Ago</small>
            <br />
            <div>
                <p className="opacity-75">We are looking for a well skilled developer, who can do loads of stuffs quickly and ASAP</p>
                <button className="btn btn-secondary">Apply Now</button>
            </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card">
            <div className="row">
                <div className="col-6">
                <img src="https://source.unsplash.com/512x512/?beauty,old" className="mb-4 rounded-circle" width={"80%"} />
                </div>
                <div className="col-6 d-flex flex-column align-items-start justify-content-center">
                <h3>John Doe</h3>
                <p>Remote Job</p>
                <small className="opacity-75">$1k/month</small>
                </div>
            </div>
            <h3>This Job</h3>
            <small className="opacity-75">This time • 2 Days Ago</small>
            <br />
            <div>
                <p className="opacity-75">We are looking for a well skilled developer, who can do loads of stuffs quickly and ASAP</p>
                <button className="btn btn-secondary">Apply Now</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default HomeJobs;
