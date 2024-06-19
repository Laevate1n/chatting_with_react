import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ChatRoomPage from './components/ChatRoomPage';
import './custom.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userAccepted, setUserAccepted] = useState(false);
  const [user, setUser] = useState(null);
  const host = "localhost";

  const loginUser = async (username, password) => {
    try {
      const response = await fetch(`http://${host}:5000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login. Please check your credentials.');
      }

      setLoggedIn(true);
      setUserAccepted(true);
      setUser(username);
    } catch (error) {
      console.error('Error during login:', error.message);
      throw error;
    }
  };

    const handleLogout = () => {
       setLoggedIn(false);
       setUserAccepted(false);
    };

  return (
     <Router>
    <nav>
      <ul className="nav">
        <li>
          <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
            Register
          </Link>
        </li>
        <li>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
            Login
          </Link>
        </li>
        {loggedIn && userAccepted && (
          <>
            <li>
              <Link to="/chat" style={{ color: 'white', textDecoration: 'none' }}>
                Chat Room
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              loggedIn={loggedIn}
              userAccepted={userAccepted}
              loginUser={loginUser}
            />
          }
        />
        <Route
          path="/chat"
          element={
            loggedIn && userAccepted ? (
              <ChatRoomPage user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route index element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
};

export default App;