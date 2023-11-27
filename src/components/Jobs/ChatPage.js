import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import ChatSystem from './ChatSystem';
import { collection, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { jobId, applicantId } = useParams();
  const [messages, setMessages] = useState([]);

  const fetchMessages = useCallback(async () => {
    try {
      const chatCollection = collection(db, 'chats');
      const chatSnapshot = await getDocs(chatCollection);
      const allMessages = chatSnapshot.docs.map((doc) => doc.data());
      const filteredMessages = allMessages.filter(
        (message) => message.jobId === jobId && message.applicantId === applicantId
      );
      setMessages(filteredMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [jobId, applicantId]);

  useEffect(() => {
    fetchMessages();
  }, [jobId, applicantId, fetchMessages]);

  return (
    <div>
      <h2>Chat Page</h2>
      {messages ? (
        <ChatSystem jobId={jobId} applicantId={applicantId} messages={messages} />
      ) : (
        <p>Loading messages...</p>
      )}
    </div>
  );
};

export default ChatPage;