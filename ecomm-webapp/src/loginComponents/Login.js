import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Data:', data);
  
        if (data.role === 'user') {
          onLogin('user');
          setErrorMessage('');
          navigate('/frontstore');
        } else if (data.role === 'admin') {
          onLogin('admin');
          setErrorMessage('');
          navigate('/dashboard');
        } else {
          setErrorMessage('Unauthorized access');
        }
      } else {
        const errorData = await response.json();
        console.log('Error Data:', errorData);
        setErrorMessage(errorData.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  
    // Hardcoded admin login fallback
    if (email === 'admin@gmail.com' && password === 'password') {
      onLogin('admin');
      setErrorMessage('');
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Card.Body>
          <Card.Title className="text-center">Product Management Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <Button className="login-button" type="submit">
              Login
            </Button>

            {/* Link to registration page */}
            <div className="text-center mt-3">
              <Link to="/register" className="text-white">
                Don't have an account? Register here
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
