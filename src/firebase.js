import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQnN3PecBaNEepC3p09tyeYFvc88VQylk",
  authDomain: "remotejobdapp.firebaseapp.com",
  projectId: "remotejobdapp",
  storageBucket: "remotejobdapp.appspot.com",
  messagingSenderId: "717583586807",
  appId: "1:717583586807:web:7a621f1612719299bb4af2",
  measurementId: "G-JN4M6WGZ13"
};

// Initialize Firebase
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };