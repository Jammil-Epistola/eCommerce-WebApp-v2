import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './adminPages/Dashboard'; 
import UserDashboard from './userPages/FrontStore';
import Login from './loginComponents/Login'; 
import UserRegister from './loginComponents/UserRegister';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(''); // Track role (admin/user)

  // Handle login logic and set user role
  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role); // Set the logged-in user's role
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              userRole === 'admin' ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/user-dashboard" />
              )
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/register" element={<UserRegister />} />

        {/* Protected Admin Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn && userRole === 'admin' ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Protected User Dashboard Route */}
        <Route
          path="/user-dashboard"
          element={
            isLoggedIn && userRole === 'user' ? (
              <UserDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
