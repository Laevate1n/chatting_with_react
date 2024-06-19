import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../custom.css';

const LoginPage = ({ loggedIn, userAccepted, loginUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginUser(username, password);
    } catch (error) {
      console.error('Error during login:', error.message);
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  useEffect(() => {
    if (loggedIn && userAccepted) {
      navigate('/chat');
    }
  }, [loggedIn, userAccepted, navigate]);

   const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };
  
  return (
    <div className='main'>
      <div className='login'>
        <form className='form' action='/login' method='POST' encType='multipart/form-data'>
          <input
            type='text'
            placeholder='Username'
            value={username}
            id='username'
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            id='pass'
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          /><br></br>
           <button type='button' id='btn' style={{cursor: 'pointer'}} onClick={handleLogin}>
            Login
          </button>
          {loginError && <p id='errorCSS'>{loginError}</p>}<br></br>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;