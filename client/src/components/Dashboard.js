// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2>
        Welcome, {user?.role === 'admin' ? 'Admin 🎉' : user?.fullName || 'Guest'}
      </h2>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate('/submit-complaint')}>
          📝 Submit Complaint
        </button>
        <button style={styles.button} onClick={() => navigate('/complaints')}>
          📋 View Complaints
        </button>
        <button style={styles.button} onClick={() => navigate('/chat')}>
          💬 Live Chat
        </button>
        <button style={styles.button} onClick={() => navigate('/profile')}>
          👤 Profile
        </button>

        {/* ✅ Add this only for admin */}
        {user?.role === 'admin' && (
          <button style={styles.button} onClick={() => navigate('/users')}>
            👥 View All Users
          </button>
        )}

        <button style={{ ...styles.button, backgroundColor: '#dc3545' }} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  buttonContainer: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
  },
  button: {
    width: '200px',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Dashboard;