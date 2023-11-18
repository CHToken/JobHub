import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';

const JobListings = () => {
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const jobListingsCollection = collection(db, 'jobListings');
        const snapshot = await getDocs(jobListingsCollection);
        const listingsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobListings(listingsData);
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };

    fetchJobListings();
  }, []);

  return (
    <div className="page-container">
      <h2>Job Listings</h2>
      <ul>
        {jobListings.map((listing) => (
          <li key={listing.id}>
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobListings;
