// components/AdminPanel.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/complaints');
        setComplaints(res.data);
        setLoading(false);
      } catch (err) {
        console.error('❌ Error fetching complaints:', err);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) return <p>Loading complaints...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Panel – All Complaints</h2>
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Address</th>
            <th>User</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint.title}</td>
              <td>{complaint.description}</td>
              <td>{complaint.address}</td>
              <td>{complaint.fullName}</td>
              <td>{complaint.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;