// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { sendMessage, subscribeToMessages, getStoredMessages } from '../services/chatServices';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState(getStoredMessages());
  const [content, setContent] = useState('');

  useEffect(() => {
    subscribeToMessages((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSend = () => {
    if (content.trim() !== '') {
      sendMessage(content);
      setContent('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat Application</h1>
      </div>
      <div className="chat-messages">
        {messages.slice(-10).map((msg, index) => (
          <div key={index} className={`chat-message ${msg.user ? 'server-message' : 'client-message'}`}>
            <span className="message-time">{msg.time}</span>
            <strong>{msg.user ? 'Server' : 'You'}: </strong>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
