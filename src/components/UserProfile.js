// import React, { useState, useEffect } from 'react';
// import { getAuth } from 'firebase/auth';
// import db from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';

// const UserProfile = ({ isConnected }) => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (isConnected) {
//         // Get the current user
//         const auth = getAuth();
//         const currentUser = auth.currentUser;

//         if (currentUser) {
//           // Retrieve user profile data from Firestore
//           const userDocRef = doc(db, 'users', currentUser.uid);
//           const docSnap = await getDoc(userDocRef);

//           if (docSnap.exists()) {
//             setUserData(docSnap.data());
//           } else {
//             console.log('No such document!');
//           }
//         }
//       }
//     };

//     fetchUserData();
//   }, [isConnected]);

//   return (
//     <div className="page-container">
//       <h2>User Profile</h2>
//       {isConnected ? (
//         <div>
//           {userData ? (
//             <>
//               <p>
//                 <strong>Name:</strong> {userData.name}
//               </p>
//               <p>
//                 <strong>Username:</strong> {userData.username}
//               </p>
//               <p>
//                 <strong>Email:</strong> {userData.email}
//               </p>
//               <p>
//                 <strong>Usdt Wallet:</strong> {userData.usdtwallet}
//               </p>
//               <p>
//                 <strong>ETH Wallet:</strong> {userData.ethwallet}
//               </p>
//               <p>
//                 <strong>Binance ID:</strong> {userData.binanceid}
//               </p>
//               {/* Add more user profile information as needed */}
//             </>
//           ) : (
//             <p>Loading user data...</p>
//           )}
//         </div>
//       ) : (
//         <p>Please connect your wallet to view your profile.</p>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
