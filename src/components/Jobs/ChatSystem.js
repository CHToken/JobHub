import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { onSnapshot, doc, setDoc, getDoc } from 'firebase/firestore';
import './chat.css';
import { useNavigate } from 'react-router-dom';

const ChatSystem = ({ jobId, applicantId, messages, senderId }) => {
  const [localMessages, setLocalMessages] = useState(messages);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
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
          // Do something if new messages are received
        }
      }
    });

    return () => unsubscribe();
  }, [jobId, applicantId, localMessages]);

  const handleSendMessage = useCallback(async () => {
    if (newMessage.trim() === '') return;
  
    try {
      const chatDocRef = doc(db, 'chats', `${jobId}_${applicantId}`);
      const chatDocSnapshot = await getDoc(chatDocRef);
  
      let chatData = {};
  
      if (chatDocSnapshot.exists()) {
        chatData = chatDocSnapshot.data();
  
        // Check if the sender is the job or the applicant
        const isJobSender = senderId === chatData.jobSenderId.toLowerCase();
  
        chatData.messages.push({
          senderMessage: isJobSender,
          applicantMessage: !isJobSender,
          message: newMessage,
          timestamp: new Date(),
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
            className={message.senderMessage ? 'sent' : 'received'}
          >
            <p>{message.message}</p>
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