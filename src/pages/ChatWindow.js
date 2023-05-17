import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat body
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [messages]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    const newMessage = { text: userInput, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();

      const botResponse = { text: data.response, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chatbot AI</h2>
      </div>
      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-container ${
              message.sender === 'user' ? 'user-message' : 'bot-message'
            }`}
          >
            <div className="message">
              <p>
                {message.sender === 'user' ? 'User: ' : 'Dexter: '}
                {message.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <form onSubmit={handleMessageSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="message-input"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
