import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/complaints', {
        title,
        description,
        address,
        fullName: user?.fullName || 'Dhanya',
        email: user?.email || 'jajivalluri2006@gmail.com'
      });

      alert(response.data.message);
      setTitle('');
      setDescription('');
      setAddress('');
    } catch (error) {
      console.error('❌ Complaint submission error:', error);
      alert(error.response?.data?.message || 'Complaint submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Submit a Complaint</h2>

      <input
        type="text"
        placeholder="Complaint Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={styles.input}
      />

      <textarea
        placeholder="Complaint Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows="5"
        style={styles.textarea}
      />

      <input
        type="text"
        placeholder="Address (optional)"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'vertical'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default ComplaintForm;