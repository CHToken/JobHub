import React from 'react';
import designerImage from '../../assets/img/designer.jpg';
// import laptopImage from '../assets/img/laptop.jpg';

const GridSection = () => {
  return (
    <div className="grid-container">
      <div className="grid-item">
        <p>Getting remote jobs as been easy with our platform<br/>We Utilize AI to recommend the best candidate for a job</p>
      </div>
      <div className="grid-item">
      <img src={designerImage} alt="Designer" />
      </div>
    </div>
  );
};

export default GridSection;
