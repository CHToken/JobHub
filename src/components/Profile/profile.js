import React, { useState, useEffect } from "react";
import UserProfileEditing from "./UserProfileEditing";
import UserProfileView from "./UserProfileView";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import "./profile.css";
import AppliedJobsList from "../Jobs/AppliedJobsList";

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

const UserProfile = ({ isConnected }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          !isConnected ||
          !window.ethereum ||
          !window.ethereum.selectedAddress
        ) {
          console.error("MetaMask not installed or not connected.");
          return;
        }

        const walletAddress = window.ethereum.selectedAddress.toLowerCase();
        const docRef = doc(db, "users", walletAddress);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          await setDoc(docRef, initialUserData);
          console.log("New user data document created.");
          setUserData(initialUserData);
        }
      } catch (error) {
        console.error("Error fetching or creating user data", error);
      }
    };

    if (isConnected) {
      fetchData();
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
      setIsLoading(true);
      const walletAddress = window.ethereum.selectedAddress.toLowerCase();
      const docRef = doc(db, "users", walletAddress);

      if (selectedProfilePicture) {
        await handleProfilePictureUpload(docRef);
      } else {
        await setDoc(docRef, userData);
      }

      setIsEditing(false);
      alert("Your profile has been saved successfully!");
    } catch (error) {
      console.error("Error saving user data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePictureUpload = async (docRef) => {
    const storageRef = ref(
      storage,
      `profilePictures/${docRef.id}/${selectedProfilePicture.name}`
    );
    await uploadBytes(storageRef, selectedProfilePicture);

    const downloadURL = await getDownloadURL(storageRef);

    await setDoc(docRef, { ...userData, profilePicture: downloadURL });
    setUserData({ ...userData, profilePicture: downloadURL });
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
      {isConnected ? (
        isEditing ? (
          <UserProfileEditing
            editMode={editMode}
            userData={userData}
            onProfileSettingsSave={(data) =>
              setUserData({ ...userData, ...data })
            }
            onProjectsSave={(projectsData) =>
              setUserData({ ...userData, pastProjects: projectsData })
            }
            onSocialMediaSave={(socialMediaData) =>
              setUserData({ ...userData, socialMedia: socialMediaData })
            }
            onWalletSave={(walletData) =>
              setUserData({ ...userData, ...walletData })
            }
            onAboutUserSave={handleAboutUserSave}
            onSkillsSettingsSave={handleSkillsSettingsSave}
            onProfilePictureChange={(event) =>
              setSelectedProfilePicture(event.target.files[0])
            }
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <UserProfileView
              userData={userData}
              isConnected={isConnected}
              isEditing={isEditing}
              editMode={editMode}
              handleEditClick={handleEditClick}
              handleAboutUserSave={handleAboutUserSave}
              handleSkillsSettingsSave={handleSkillsSettingsSave}
            />
            {isLoading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <>
                <button
                  onClick={handleSaveClick}
                  className="btn btn-success"
                  style={{
                    width: "50%",
                    justifyContent: "center",
                    margin: "auto",
                    display: "flex",
                    marginBottom: "15px",
                  }}
                >
                  Save
                </button>
                {/* Applied Jobs Section */}
                <div className="card-container">
                  <div className="card">
                    {/* Pass the connected wallet address directly */}
                    <AppliedJobsList
                      walletAddress={
                        isConnected
                          ? window.ethereum.selectedAddress.toLowerCase()
                          : null
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )
      ) : (
        <p>Please connect your wallet to view your profile.</p>
      )}
    </div>
  );
};

export default UserProfile;
