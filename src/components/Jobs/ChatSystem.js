import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { onSnapshot, doc, setDoc, getDoc } from 'firebase/firestore';
import './chat.css';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import userImage from '../../assets/img/man.png';

  const ChatSystem = ({ jobId, applicantId, messages, senderId }) => {
    const [localMessages, setLocalMessages] = useState(messages);
    const [newMessage, setNewMessage] = useState('');
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, 'users', applicantId);
          const userDocSnapshot = await getDoc(userDocRef);
  
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserData(userData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
  
      const chatDocRef = doc(db, 'chats', `${jobId}_${applicantId}`);
      const unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const chatData = docSnapshot.data();
          const messagesData = chatData.messages || [];
  
          const newMessages = messagesData.filter(
            (message) => message.applicantId !== applicantId
          );
  
          setLocalMessages(newMessages);
  
          if (messagesData.length > localMessages.length) {
            const latestMessage = messagesData[messagesData.length - 1];
            const isCurrentUser = senderId === latestMessage.senderId;
  
            if (!isCurrentUser) {
              notification.info({
                message: 'New Message',
                description: latestMessage.message,
              });
            }
          }
        }
      });
  
      return () => unsubscribe();
    }, [jobId, applicantId, localMessages, senderId]);
  
    const handleSendMessage = useCallback(async () => {
      if (newMessage.trim() === '') return;
  
      try {
        const chatDocRef = doc(db, 'chats', `${jobId}_${applicantId}`);
        const chatDocSnapshot = await getDoc(chatDocRef);
  
        let chatData = {};
  
        if (chatDocSnapshot.exists()) {
          chatData = chatDocSnapshot.data();
  
          const isJobSender = senderId === chatData.jobSenderId.toLowerCase();
  
          chatData.messages.push({
            senderMessage: isJobSender,
            applicantMessage: !isJobSender,
            message: newMessage,
            timestamp: new Date(),
            senderId,
          });
        } else {
          chatData = {
            jobId,
            applicantId,
            jobSenderId: senderId.toLowerCase(),
            messages: [
              {
                senderMessage: false,
                applicantMessage: true,
                message: newMessage,
                timestamp: new Date(),
                senderId,
              },
            ],
          };
        }
  
        await setDoc(chatDocRef, chatData);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }, [jobId, applicantId, newMessage, senderId]);
  
    return (
      <div className="chat-container">
        <h5>Chat Portal</h5>
        <div className="chat-messages">
          {localMessages.map((message, index) => (
            <div
              key={`${message.timestamp}_${index}`}
              className="sent"
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                marginBottom: '10px',
                flexDirection: 'row-reverse',
              }}
            >
              <div
                className="profile-picture-container"
                style={{ marginRight: '10px', marginBottom: '5px' }}
              >
                <img
                  src={userData.profilePicture || userImage}
                  alt="Profile"
                  className="circle-profile-image"
                  style={{ width: '25px', height: '25px', borderRadius: '50%' }}
                />
              </div>
              <div
                className="message-content"
                style={{ maxWidth: 'calc(100% - 35px)' }}
              >
                <p>{message.message}</p>
              </div>
            </div>
          ))}
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