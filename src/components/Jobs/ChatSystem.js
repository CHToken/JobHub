import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { onSnapshot, doc, setDoc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import './chat.css';
import { useNavigate } from 'react-router-dom';
import userImage from '../../assets/img/man.png';
import { useWallet } from '../WalletContext';

const ChatSystem = ({ jobId }) => {
  const [localMessages, setLocalMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userData, setUserData] = useState({});
  const { isConnected, walletAddress } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetching applicantId from the appliedJobs collection
        const appliedJobsQuery = query(
          collection(db, 'appliedJobs'),
          where('jobId', '==', jobId),
          where('applicantWalletAddress', '==', walletAddress)
        );
        const appliedJobsSnapshot = await getDocs(appliedJobsQuery);

        if (appliedJobsSnapshot.size > 0) {
          // Assuming there's only one document for the given jobId and applicantId
          const appliedJobDoc = appliedJobsSnapshot.docs[0];
          const appliedJobData = appliedJobDoc.data();
          const fetchedApplicantId = appliedJobData.applicantId;

          // Fetching user data based on the fetched applicantId
          const userDocRef = doc(db, 'users', fetchedApplicantId);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserData(userData);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isConnected && walletAddress) {
      fetchUserData();

      const chatDocRef = doc(db, 'chats', jobId);
      const unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const chatData = docSnapshot.data();
          const messagesData = chatData.messages || [];

          setLocalMessages(messagesData);
        }
      });

      return () => unsubscribe();
    }
  }, [jobId, isConnected, walletAddress]);

  const handleSendMessage = useCallback(async () => {
    if (newMessage.trim() === '') return;
  
    try {
      const chatDocRef = doc(db, 'chats', jobId);
      const chatDocSnapshot = await getDoc(chatDocRef);
  
      const jobDocRef = doc(db, 'jobs', jobId);
      const jobDocSnapshot = await getDoc(jobDocRef);
  
      if (jobDocSnapshot.exists()) {
        const jobData = jobDocSnapshot.data();
        const jobSenderId = jobData.senderId.toLowerCase();
  
        const messageData = {
          message: newMessage,
          timestamp: new Date(),
          messageId: walletAddress.toLowerCase(),
          senderMessage: walletAddress.toLowerCase() === jobSenderId,
          applicantMessage: walletAddress.toLowerCase() !== jobSenderId,
        };
  
        if (chatDocSnapshot.exists()) {
          // Update the existing document in the 'chats' collection
          await setDoc(chatDocRef, { messages: [...chatDocSnapshot.data().messages, messageData] }, { merge: true });
        } else {
          // Create a new document in the 'chats' collection
          await setDoc(chatDocRef, { messages: [messageData] }, { merge: true });
        }
  
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [jobId, newMessage, walletAddress]);

  return (
    <div className="chat-container">
      <h5>Chat Portal</h5>
      <div className="chat-messages">
        {localMessages.map((message, index) => {
          const isCurrentUserMessage = message.messageId === walletAddress.toLowerCase();
          const messageContainerStyle = {
            display: 'flex',
            alignItems: isCurrentUserMessage ? 'flex-end' : 'flex-end',
            marginBottom: '10px',
            flexDirection: isCurrentUserMessage ? 'row-reverse' : 'row',
            padding: '12px',
          };

          const messageContentStyle = {
            maxWidth: 'calc(100% - 35px)',
          };

          return (
            <div key={`${message.timestamp}_${index}`} className={isCurrentUserMessage ? 'sent' : 'received'} style={messageContainerStyle}>
              <div className="profile-picture-container" style={{ marginRight: isCurrentUserMessage ? '10px' : '0', marginLeft: isCurrentUserMessage ? '0' : '10px', marginBottom: '5px' }}>
                <img
                  src={isCurrentUserMessage ? userData.profilePicture || userImage : userImage}
                  alt="Profile"
                  className="circle-profile-image"
                  style={{ width: '25px', height: '25px', borderRadius: '50%' }}
                />
              </div>
              <div className="message-content" style={messageContentStyle}>
                <p>{message.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-input">
        <textarea
          rows="3"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div className="button-container">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ChatSystem;
