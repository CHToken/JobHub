import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, collection, where, query, getDocs } from 'firebase/firestore';
import ChatSystem from './ChatSystem';
import { useParams, useNavigate } from 'react-router-dom';
import { useWallet } from '../WalletContext';

const ChatPage = () => {
  const { jobId, applicantId } = useParams();
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState('');
  const navigate = useNavigate();
  const { isConnected, walletAddress } = useWallet();

  const fetchMessages = useCallback(async () => {
    try {
      const chatDocRef = doc(db, 'chats', `${jobId}_${applicantId}`);
      const chatDocSnapshot = await getDoc(chatDocRef);

      if (chatDocSnapshot.exists()) {
        const chatData = chatDocSnapshot.data();
        setMessages(chatData.messages);
      }

      // Fetch senderId from the jobs collection
      const jobDocRef = doc(db, 'jobs', jobId);
      const jobDocSnap = await getDoc(jobDocRef);

      if (jobDocSnap.exists()) {
        const jobData = jobDocSnap.data();
        setSenderId(jobData.senderId.toLowerCase());

        // Fetch all messages associated with the jobId
        const messagesQuery = query(collection(db, 'chats'), where('jobId', '==', jobId));
        const messagesSnapshot = await getDocs(messagesQuery);

        let allMessages = [];

        messagesSnapshot.forEach((doc) => {
          const chatData = doc.data();
          allMessages = allMessages.concat(chatData.messages);
        });

        // Set all messages to state
        setMessages(allMessages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [jobId, applicantId]);

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        // Check if the wallet is connected initially
        if (!isConnected || !walletAddress) {
          // Redirect or render a message when the wallet is not connected
          navigate(`/chat/${jobId}/${applicantId}`);
        } else {
          await fetchMessages();
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    checkWalletConnection();
  }, [navigate, jobId, applicantId, isConnected, walletAddress, fetchMessages]);

  return (
    <div>
      {!isConnected ? (
        <p>Please connect your wallet to use the chat.</p>
      ) : (
        <>
          {messages ? (
            <ChatSystem jobId={jobId} applicantId={applicantId} messages={messages} senderId={senderId} />
          ) : (
            <p>Loading messages...</p>
          )}
          <div className="chat-container">
            <div className="button-container">
              <button className="btn btn-secondary" onClick={() => navigate(`/profile`)}>
                Back to Profile
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPage;