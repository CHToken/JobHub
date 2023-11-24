import React, { useState, useEffect } from "react";
import UserProfileEditing from "./UserProfileEditing";
import UserProfileView from "./UserProfileView";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import "./profile.css";

const UserProfile = ({ isConnected }) => {
  const [userData, setUserData] = useState({
    profilePicture: "",
    name: "",
    role: "",
    username: "",
    profession: "",
    status: "",
    aboutuser: "",
    skills: [],
    jobApplications: [],
    bnbwalletAddress: "",
    usdtwalletAddress: "",
    ethwalletAddress: "",
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
          const docRef = doc(db, "users", walletAddress);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            // If the user does not have a document, create a new one
            const initialUserData = {
              profilePicture: "",
              name: "",
              role: "",
              username: "",
              profession: "",
              status: "",
              aboutuser: "",
              skills: [],
              jobApplications: [],
              bnbwalletAddress: "",
              usdtwalletAddress: "",
              ethwalletAddress: "",
              pastProjects: [],
              socialMedia: {},
            };
            await setDoc(docRef, initialUserData);
            console.log("New user data document created.");
            setUserData(initialUserData);
          }
        } else {
          console.error("MetaMask not installed or not connected.");
        }
      } catch (error) {
        console.error("Error fetching or creating user data", error);
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
      alert("Please connect your wallet to edit your profile.");
    }
  };

  const handleSaveClick = async () => {
    try {
      const walletAddress = window.ethereum.selectedAddress.toLowerCase();
      const docRef = doc(db, "users", walletAddress);

      if (selectedProfilePicture) {
        const storageRef = ref(
          storage,
          `profilePictures/${walletAddress}/${selectedProfilePicture.name}`
        );
        await uploadBytes(storageRef, selectedProfilePicture);

        const downloadURL = await getDownloadURL(storageRef);

        await setDoc(docRef, { ...userData, profilePicture: downloadURL });
        setUserData({ ...userData, profilePicture: downloadURL });
      } else {
        await setDoc(docRef, userData);
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data", error);
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

  const handleAboutUserSave = (newAboutUser) => {
    setUserData({ ...userData, aboutuser: newAboutUser });
    setIsEditing(false);
  };

  const handleSkillsSettingsSave = (newSkills) => {
    setUserData({ ...userData, skills: newSkills });
    setIsEditing(false);
  };

  return (
    <div className="Profile-container">
      <>
        {isConnected ? (
          <>
            {isEditing ? (
              <UserProfileEditing
                editMode={editMode}
                userData={userData}
                onProfileSettingsSave={handleProfileSettingsSave}
                onProjectsSave={handleProjectsSave}
                onSocialMediaSave={handleSocialMediaSave}
                onWalletSave={handleWalletSave}
                onAboutUserSave={handleAboutUserSave}
                onSkillsSettingsSave={handleSkillsSettingsSave}
                onProfilePictureChange={handleProfilePictureChange}
                setIsEditing={setIsEditing}
              />
            ) : (
              <>
                <UserProfileView
                  userData={userData}
                  isEditing={isEditing}
                  editMode={editMode}
                  handleEditClick={handleEditClick}
                  handleAboutUserSave={handleAboutUserSave}
                  handleSkillsSettingsSave={handleSkillsSettingsSave}
                />
                <>
                  <button onClick={handleSaveClick} className="btn btn-success" style={{width:"100%"}}>Save</button>
                </>
              </>
            )}
          </>
        ) : (
          <p>Please connect your wallet to view your profile.</p>
        )}
      </>
    </div>
  );
};

export default UserProfile;
