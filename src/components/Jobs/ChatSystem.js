import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, onSnapshot, doc, setDoc, getDoc } from 'firebase/firestore';

const ChatSystem = ({ jobId, applicantId, onClose, messages }) => {
  const [localMessages, setLocalMessages] = useState(messages);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const chatDocRef = doc(db, 'chats', `${jobId}_${applicantId}`);
    const unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const chatData = docSnapshot.data();
        const messagesData = chatData.messages || [];
        console.log('Real-Time Messages:', messagesData);
  
        const newMessages = messagesData.filter(
          (message) => message.applicantId !== applicantId
        );
  
        setLocalMessages(newMessages);
  
        if (messagesData.length > localMessages.length) {
          alert('New Message Received!');
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

      const chatData = chatDocSnapshot.data();

      if (chatDocSnapshot.exists()) {
        // Existing document
        chatData.messages.push({
          message: newMessage,
          timestamp: new Date(),
        });
        await setDoc(chatDocRef, chatData);
        alert('Message Sent!');
      } else {
        // Document does not exist, create a new one
        await setDoc(chatDocRef, {
          jobId,
          applicantId,
          messages: [{
            message: newMessage,
            timestamp: new Date(),
          }],
        });
        alert('Message Sent!');
      }

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [jobId, applicantId, newMessage]);

  return (
    <div className="chat-container">
      <h5>Chat with Applicant</h5>
      <div className="chat-messages">
        {localMessages.map((message, index) => (
          <div key={`${message.timestamp}_${index}`} className={message.applicantId === applicantId ? 'received' : 'sent'}>
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
      <button className="btn btn-secondary" onClick={onClose}>
        Close Chat
      </button>
    </div>
  );
};

export default ChatSystem;