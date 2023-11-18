// profileService.js
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const updateProfile = async (db, user, updatedProfile) => {
  if (user && updatedProfile) { // Check if user and updatedProfile are defined
    const userRef = doc(db, "users", user.uid);

    try {
      // Check if the document already exists
      const docSnapshot = await getDoc(userRef);

      if (docSnapshot.exists()) {
        // Update the user profile in Firebase
        await updateDoc(userRef, updatedProfile);
      } else {
        // If the document does not exist, create a new one
        await setDoc(userRef, updatedProfile);
      }

      console.log("Profile updated successfully!");

      // Fetch and return the updated profile to verify changes
      const updatedDoc = await getDoc(userRef);
      if (updatedDoc.exists()) {
        return updatedDoc.data();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  } else {
    console.error("Invalid user or updatedProfile provided.");
  }
  return null;
};

export { updateProfile };
