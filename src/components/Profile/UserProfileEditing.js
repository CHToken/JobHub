import React from "react";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import PastProjects from "../PastProjectSection/PastProjects";
import SocialMedia from "../SocialMediaSection/SocialMedia";
import WalletInfo from "../WalletInfoSection/WalletInfo";
import AboutUserSettings from "../AboutSection/aboutsettings";
import SkillsSettings from "../SkillsSection/skillssettings";

const UserProfileEditing = ({
  editMode,
  userData,
  onProfileSettingsSave,
  onProjectsSave,
  onSocialMediaSave,
  onWalletSave,
  onAboutUserSave,
  onSkillsSettingsSave,
  onProfilePictureChange,
  setIsEditing,
}) => {
  return (
    <>
      {editMode === "profilesettings" && (
        <ProfileSettings
        userData={userData}
        onSave={onProfileSettingsSave}
        onBack={() => setIsEditing(false)}
        onProfilePictureChange={onProfilePictureChange}
      />      
      )}
      {editMode === "pastProjects" && (
        <PastProjects userData={userData} onSave={onProjectsSave} />
      )}
      {editMode === "socialMedia" && (
        <SocialMedia
          userData={userData}
          onSave={onSocialMediaSave}
          onBack={() => setIsEditing(false)}
        />
      )}
      {editMode === "wallet" && <WalletInfo userData={userData} onSave={onWalletSave} onBack={() => setIsEditing(false)}/>}
      {editMode === "aboutsettings" && (
        <AboutUserSettings aboutuser={userData.aboutuser} onSave={onAboutUserSave} onBack={() => setIsEditing(false)}/>
      )}
      {editMode === "skillssettings" && (
        <SkillsSettings skills={userData.skills} onSave={onSkillsSettingsSave} onBack={() => setIsEditing(false)}/>
      )}
    </>
  );
};

export default UserProfileEditing;
