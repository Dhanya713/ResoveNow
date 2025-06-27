import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ComplaintStatus = ({ user }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!user || !user.email) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/complaints/${user.email}`);
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [user]);

  if (!user) {
    return <h2 style={styles.message}>Please login to view complaints</h2>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 Your Complaints</h2>
      {loading ? (
        <p style={styles.message}>Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p style={styles.message}>No complaints found.</p>
      ) : (
        <div style={styles.cardList}>
          {complaints.map((complaint, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.title}>{complaint.title}</h3>
                <span
                  style={{
                    ...styles.status,
                    backgroundColor:
                      complaint.status === 'Resolved' ? '#28a745' : '#ffc107',
                  }}
                >
                  {complaint.status || 'Pending'}
                </span>
              </div>

              <p style={styles.description}>{complaint.description}</p>
              {complaint.address && (
                <p style={styles.address}><strong>📍 Address:</strong> {complaint.address}</p>
              )}
              <p style={styles.date}>
                📅 Submitted on: {new Date(complaint.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: '26px',
    color: '#333',
    marginBottom: '20px',
  },
  message: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
  cardList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  title: {
    fontSize: '20px',
    color: '#007bff',
    margin: 0
  },
  status: {
    padding: '4px 10px',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '16px',
    color: '#444',
    marginBottom: '8px',
  },
  address: {
    fontSize: '14px',
    color: '#666',
  },
  date: {
    marginTop: '10px',
    fontSize: '13px',
    color: '#888'
  }
};

export default ComplaintStatus;