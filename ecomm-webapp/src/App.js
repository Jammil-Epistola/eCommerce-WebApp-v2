import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './adminPages/Dashboard';
import FrontStore from './userPages/FrontStore';
import ProductPage from './userPages/ProductPage';
import Login from './loginComponents/Login';
import UserRegister from './loginComponents/UserRegister';
import CheckOut from './userPages/CheckOut';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status
  const [userRole, setUserRole] = useState(''); // Tracks user role ('admin' or 'user')
  const [cart, setCart] = useState([]); // Stores cart items for users

  // Handle successful login
  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Get token from localStorage
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('authToken'); // Clear token
      setIsLoggedIn(false);
      setUserRole('');
      setCart([]);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await fetch('http://127.0.0.1:8000/api/cart', { method: 'DELETE' }); // Backend API call
      setCart([]); // Clear the cart in the frontend
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
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
              <Login
                onLogin={handleLogin}
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
                setCart={setCart}
              />
            )
          }
        />
        <Route path="/register" element={<UserRegister />} />

        {/* Admin Dashboard */}
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

        {/* User FrontStore */}
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

        {/* User Product Page */}
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

        {/* User Checkout Page */}
        <Route
          path="/checkout"
          element={
            isLoggedIn && userRole === 'user' ? (
              <CheckOut cart={cart} setCart={setCart} clearCart={clearCart} onLogout={handleLogout} />
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
