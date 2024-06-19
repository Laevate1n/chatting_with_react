import React, { useState } from 'react';
import '../custom.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 409) {
        setError('Username is already taken. Please choose a different username.');
      } else if (!response.ok) {
        throw new Error('Failed to register. Please try again later.');
      } else {
        console.log('User registered successfully.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="main">
      <div className="login">
        <form className="form" action="/login" method="POST" encType="multipart/form-data">
          <input
            type="text"
            placeholder="Username"
            value={username}
            id='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            id='pass'
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          /><br />
          <button type="button" id="btn" style={{cursor: 'pointer'}} onClick={handleRegister}>Register</button><br />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;