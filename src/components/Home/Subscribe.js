import React from 'react';
import { Link } from 'react-router-dom';

const Subscribe = () => {
  return (
    <div className="mt-10 bg-third subscribe-section" style={{marginTop:"5pc"}} align="center">
        <h1 className="underlined">Subscribe To Newsletter</h1>
        <p className="opacity-75" style={{width:"500px"}}>lorem ipsum dolor sit amet, con con laoreet lore mauris mag et justo. Cum sociis natoque penatibus et justo et justo et</p>
        <div className="d-flex">
            <input type="email" placeholder="Enter your email address" className="form-control" />
            <button type="submit" className="btn btn-primary btn-submit">Subscribe</button>
        </div>
    </div>
  );
};

export default Subscribe;
