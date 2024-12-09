// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './adminPages/Dashboard';
import FrontStore from './userPages/FrontStore';
import ProductPage from './userPages/ProductPage';
import Login from './loginComponents/Login';
import UserRegister from './loginComponents/UserRegister';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [cart, setCart] = useState([]);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
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
                <Navigate to="/frontstore" />
              )
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/register" element={<UserRegister />} />

        {/* Admin Dashboard Route */}
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

        {/*User FrontStore Route */}
        <Route
          path="/frontstore"
          element={
            isLoggedIn && userRole === 'user' ? (
              <FrontStore cart={cart} setCart={setCart} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/product/:id"
          element={
            isLoggedIn && userRole === 'user' ? (
              <ProductPage cart={cart} setCart={setCart} onLogout={handleLogout} />
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
