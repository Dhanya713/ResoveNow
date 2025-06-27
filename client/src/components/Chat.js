import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = ({ user }) => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setChatLog((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const data = {
      sender: user?.fullName || 'Guest',
      text: message
    };

    socket.emit('sendMessage', data);
    setChatLog((prev) => [...prev, data]); // Show message immediately
    setMessage('');
  };

  return (
    <div style={styles.chatBox}>
      <h2>Live Chat</h2>
      <div style={styles.chatLog}>
        {chatLog.map((msg, index) => {
          const isSender = msg.sender === (user?.fullName || 'Guest');
          return (
            <div
              key={index}
              style={{
                ...styles.chatMessage,
                alignSelf: isSender ? 'flex-end' : 'flex-start',
                backgroundColor: isSender ? '#dcf8c6' : '#f1f0f0',
                textAlign: isSender ? 'right' : 'left'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{msg.sender}</div>
              <div>{msg.text}</div>
            </div>
          );
        })}
      </div>
      <form onSubmit={sendMessage} style={styles.form}>
        <input
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button style={styles.button} type="submit">Send</button>
      </form>
    </div>
  );
};

const styles = {
  chatBox: {
    maxWidth: '600px',
    margin: '30px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f4f4f4'
  },
  chatLog: {
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    overflowY: 'auto',
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#fff'
  },
  chatMessage: {
    maxWidth: '70%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '10px',
    wordBreak: 'break-word',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '10px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px'
  }
};

export default Chat;