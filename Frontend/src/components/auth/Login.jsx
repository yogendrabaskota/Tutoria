import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import { AuthContext } from '../../context/AuthContext'; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token); 
        navigate('/');    
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Something went wrong.');
    }
  };

  const fields = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  return <Form title="Login" fields={fields} onSubmit={handleLogin} />;
};

export default Login;
