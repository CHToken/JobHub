import React from 'react';
import { Link } from 'react-router-dom';

const Subscribe = () => {
  return (
    <div className="mt-10 bg-third subscribe-section" style={{marginTop:"5pc"}} align="center">
        <h1 className="underlined">Subscribe To Newsletter</h1>
        <p className="opacity-75" style={{width:"500px"}}>
          Elevate your journey in the blockchain space! Stay updated with the latest trends, innovations, and opportunities. Join our community and be part of something extraordinary.
        </p>
        <div className="d-flex">
            <input type="email" placeholder="Enter your email address" className="form-control" />
            <button type="submit" className="btn btn-primary btn-submit">Subscribe</button>
        </div>
    </div>
  );
};

export default Subscribe;
