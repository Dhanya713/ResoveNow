// components/AllUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error('❌ Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>👤 All Users</h2>
      {users.map(user => (
        <div key={user._id} style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '6px',
          background: '#f1f1f1'
        }}>
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role || 'user'}</p>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;