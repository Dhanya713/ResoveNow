import React from 'react';

const Profile = ({ user }) => {
  if (!user) {
    return <h2 style={styles.message}>Please login to view your profile</h2>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 User Profile</h2>
        <p style={styles.info}><strong>Full Name:</strong> {user.fullName}</p>
        <p style={styles.info}><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
  },
  info: {
    fontSize: '18px',
    marginBottom: '12px',
    color: '#555',
  },
  message: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '18px',
    color: '#888',
  },
};

export default Profile;