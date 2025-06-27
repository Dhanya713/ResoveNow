import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ComplaintForm from './components/ComplaintForm';
import ComplaintStatus from './components/ComplaintStatus';
import Chat from './components/Chat';
import AdminPanel from './components/AdminPanel';
import Profile from './components/Profile';
import AllUsers from './components/AllUsers';


function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setUser(savedUser);
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* User Routes */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/submit-complaint"
          element={user ? <ComplaintForm user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/complaints"
          element={user ? <ComplaintStatus user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/" />}
        />

        {/* Admin Route */}
        <Route
  path="/admin"
  element={
    user?.role === 'admin' ? <AdminPanel user={user} /> : <h2>Access Denied</h2> } />
        
        <Route path="/users" element={<AllUsers />} />

      </Routes>
    </Router>
  );
}

export default App;