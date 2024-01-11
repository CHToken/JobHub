import React, { useState, useEffect } from "react";
import { Alert, Spin } from "antd";
import UserProfileEditing from "./UserProfileEditing";
import UserProfileView from "./UserProfileView";
import AppliedJobsList from "../Jobs/AppliedJobsList";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import "./profile.css";
import { useWallet } from '../WalletContext';

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

const UserProfile = () => {
  const { isConnected, walletAddress } = useWallet();
  const [userData, setUserData] = useState(initialUserData);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isConnected || !walletAddress) {
          console.error("Wallet not connected.");
          return;
        }

        const userWalletAddress = walletAddress.toLowerCase();
        const docRef = doc(db, "users", userWalletAddress);
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

    fetchData();
  }, [isConnected, walletAddress]);

  const handleEditClick = (mode) => {
    if (isConnected) {
      setIsEditing(true);
      setEditMode(mode);
    } else {
      showAlert("error", "Please connect your wallet to edit your profile.");
    }
  };

  const handleSaveClick = async () => {
    try {
      setIsLoading(true);
      const docRef = doc(db, "users", walletAddress.toLowerCase());

      if (selectedProfilePicture) {
        await handleProfilePictureUpload(docRef);
      } else {
        await setDoc(docRef, userData);
      }

      setIsEditing(false);
      showAlert("success", "Your profile has been saved successfully!");
    } catch (error) {
      console.error("Error saving user data", error);
      showAlert("error", "Error saving user data. Please try again.");
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

  const showAlert = (type, message) => {
    setAlertInfo({ type, message });
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
              <div className="loading-spinner">
                <Spin />
              </div>
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
                      walletAddress={walletAddress}
                    />
                  </div>
                </div>
                {/* Ant Design Alert */}
                {alertInfo && (
                  <Alert
                    message={alertInfo.message}
                    type={alertInfo.type}
                    showIcon
                    closable
                    onClose={() => setAlertInfo(null)}
                    className="custom-alert"
                  />
                )}
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
