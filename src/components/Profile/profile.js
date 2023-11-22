import React, { useState, useEffect } from 'react';
import WalletInfo from '../WalletInfoSection/WalletInfo';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import PastProjects from '../PastProjectSection/PastProjects';
import SocialMedia from '../SocialMediaSection/SocialMedia';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase'; 

const UserProfile = ({ isConnected }) => {
  const [userData, setUserData] = useState({
    profilePicture: '',
    name: '',
    username: '',
    gender: '',
    aboutuser: '',
    skills: [],
    jobApplications: [],
    bnbwalletAddress: '',
    usdtwalletAddress: '',
    ethwalletAddress: '',
    pastProjects: [],
    socialMedia: {},
  });

  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Ensure that MetaMask is installed and connected
        if (window.ethereum && window.ethereum.selectedAddress) {
          const walletAddress = window.ethereum.selectedAddress.toLowerCase();
          const docRef = doc(db, 'users', walletAddress);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            // If the user does not have a document, create a new one
            const initialUserData = {
              profilePicture: '',
              name: '',
              username: '',
              gender: '',
              aboutuser: '',
              skills: [],
              jobApplications: [],
              bnbwalletAddress: '',
              usdtwalletAddress: '',
              ethwalletAddress: '',
              pastProjects: [],
              socialMedia: {},
            };
            await setDoc(docRef, initialUserData);
            console.log('New user data document created.');
            setUserData(initialUserData);
          }
        } else {
          console.error('MetaMask not installed or not connected.');
        }
      } catch (error) {
        console.error('Error fetching or creating user data', error);
      }
    };

    if (isConnected) {
      fetchUserData();
    }
  }, [isConnected]);

  const handleEditClick = (mode) => {
    if (isConnected) {
      setIsEditing(true);
      setEditMode(mode);
    } else {
      alert('Please connect your wallet to edit your profile.');
    }
  };

  const handleSaveClick = async () => {
    try {
      const walletAddress = window.ethereum.selectedAddress.toLowerCase();
      const docRef = doc(db, 'users', walletAddress);

      if (selectedProfilePicture) {
        const storageRef = ref(storage, `profilePictures/${walletAddress}/${selectedProfilePicture.name}`);
        await uploadBytes(storageRef, selectedProfilePicture);

        const downloadURL = await getDownloadURL(storageRef);

        await setDoc(docRef, { ...userData, profilePicture: downloadURL });
        setUserData({ ...userData, profilePicture: downloadURL });
      } else {
        await setDoc(docRef, userData);
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data', error);
    }
  };

  const handleProfileSettingsSave = (profileSettingsData) => {
    setUserData({ ...userData, ...profileSettingsData });
    setIsEditing(false);
  };

  const handleProjectsSave = (projectsData) => {
    setUserData({ ...userData, pastProjects: projectsData });
    setIsEditing(false);
  };

  const handleSocialMediaSave = (socialMediaData) => {
    setUserData({ ...userData, socialMedia: socialMediaData });
    setIsEditing(false);
  };

  const handleWalletSave = (walletData) => {
    setUserData({ ...userData, ...walletData });
    setIsEditing(false);
  };

 const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedProfilePicture(file);
    }
  };

  return (
    <div className="page-container">
      <h2>User Profile</h2>
  
      {isConnected ? (
        <>
          {isEditing ? (
            <>
              {editMode === 'profilesettings' && (
                <ProfileSettings
                  userData={userData}
                  onSave={handleProfileSettingsSave}
                  onProfilePictureChange={handleProfilePictureChange}
                />
              )}
              {editMode === 'pastProjects' && (
                <PastProjects userData={userData} onSave={handleProjectsSave} />
              )}
              {editMode === 'socialMedia' && (
                <SocialMedia userData={userData} onSave={handleSocialMediaSave} />
              )}
              {editMode === 'wallet' && (
                <WalletInfo userData={userData} onSave={handleWalletSave} />
              )}
            </>
          ) : (
            <>
               <div>
                <h3>Profile Picture</h3>
                {userData.profilePicture ? (
                  <img
                    src={userData.profilePicture}
                    alt="Profile"
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                  />
                ) : (
                  <p>No profile picture selected</p>
                )}
                <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
              </div>
              <div>
                <h3>Personal Details</h3>
                <p>
                  <strong>Name: </strong> {userData.name}
                </p>
                <p>
                  <strong>Username: </strong> {userData.username}
                </p>
                <p>
                  <strong>Gender: </strong> {userData.gender}
                </p>
                <p>
                  <strong>About: </strong> {userData.aboutuser}
                </p>
                <p>
                  <strong>Skills: </strong> {userData.skills}
                </p>
                <button onClick={() => handleEditClick('profilesettings')}>Edit Profile</button>
              </div>
              <div>
            <h3>Past Projects</h3>
            {Array.isArray(userData.pastProjects) && userData.pastProjects.length > 0 ? (
              userData.pastProjects.map((project, index) => (
                <div key={index}>
                  <p>
                    <strong>Title: </strong> {project.title}
                  </p>
                  <p>
                    <strong>Description: </strong> {project.description}
                  </p>
                  <p>
                    <strong>Link: </strong>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      {project.link}
                    </a>
                  </p>
                </div>
              ))
            ) : (
              <p>No past projects available.</p>
            )}
            <button onClick={() => handleEditClick('pastProjects')}>Edit Projects</button>
          </div>
               <div>
                <h3>Social Media</h3>
                {userData.socialMedia && (
                  <>
                    <p>
                      <strong>GitHub: </strong>{' '}
                      <a href={userData.socialMedia.github} target="_blank" rel="noopener noreferrer">
                        {userData.socialMedia.github}
                      </a>
                    </p>
                    <p>
                      <strong>Telegram: </strong>{' '}
                      <a href={userData.socialMedia.telegram} target="_blank" rel="noopener noreferrer">
                        {userData.socialMedia.telegram}
                      </a>
                    </p>
                    <p>
                      <strong>Whatsapp: </strong>{' '}
                      <a href={userData.socialMedia.whatsapp} target="_blank" rel="noopener noreferrer">
                        {userData.socialMedia.whatsapp}
                      </a>
                    </p>
                    <p>
                      <strong>X: </strong>{' '}
                      <a href={userData.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                        {userData.socialMedia.twitter}
                      </a>
                    </p>
                  </>
                )}
                <button onClick={() => handleEditClick('socialMedia')}>Edit Social Media</button>
              </div>
              <div>
              <h3>Wallet Details</h3>
              <div>
                <strong id="bnbwallet">BNB Wallet: </strong> {userData.bnbwalletAddress}
              </div>
              <div>
                <strong>USDT Wallet: </strong> {userData.usdtwalletAddress}
              </div>
              <div>
                <strong>ETH Wallet: </strong> {userData.ethwalletAddress}
              </div>
              <button onClick={() => handleEditClick('wallet')}>Edit Wallet</button>
              </div>
              <div>
            <h3>Job Applications</h3>
            {Array.isArray(userData.jobApplications) && userData.jobApplications.length > 0 ? (
              userData.jobApplications.map((application) => (
                <div key={application.jobId}>
                  <p>
                    <strong>Job Title: </strong> {application.jobTitle}
                  </p>
                  <p>
                    <strong>Status: </strong> {application.status}
                  </p>
                </div>
              ))
            ) : (
              <p>No job applications available.</p>
            )}
         </div>
            <button onClick={handleSaveClick}>Save</button>
          </>
        )}
      </>
    ) : (
      <p>Please connect your wallet to view your profile.</p>
    )}
  </div>
  );
};

export default UserProfile;
