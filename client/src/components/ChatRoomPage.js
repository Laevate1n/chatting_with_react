import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatRoomPage = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const host = "http://localhost:5000";

  useEffect(() => {
    const socket = io(host);
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-messages');
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
          console.log("Successfull fetch")
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageData = {
        sender: user,
        content: newMessage,
      };
      const socket = io(host);
      socket.emit('sendMessage', messageData);
      fetch('http://localhost:5000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Message sent successfully');
          } else {
            console.error('Error sending message');
          }
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
      setNewMessage('');
    }
  };

return (
    <div className='chatroom'>
      <div className='messages' id='messageList'>
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="sender"> {message.sender} :</span> {message.content}
          </div>
      ))}
      </div>
      <div className='typingpanel'>
        <form id='messageform'>
          <input type='text' placeholder="Type here ..." maxLength="180" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
          }
        }} id='textbox'/>
          <button type='button' id='sendBtn' style={{cursor: 'pointer'}}onClick={sendMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
};


export default ChatRoomPage;